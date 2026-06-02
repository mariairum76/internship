const bcrypt = require('bcrypt');
const pool = require('../config/db');
const jwt = require('jsonwebtoken');
const jwtUtil = require('../utils/jwt');

/* =========================
   REGISTER USER
========================= */
const registerUser = async ({ name, email, password }) => {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    const existingUser = await client.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );

    if (existingUser.rows.length > 0) {
      throw new Error('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const role = await client.query(
      "SELECT id FROM roles WHERE name = 'user'"
    );

    const roleId = role.rows[0].id;

    const newUser = await client.query(
      `
      INSERT INTO users (name, email, password, role_id)
      VALUES ($1, $2, $3, $4)
      RETURNING id, name, email
      `,
      [name, email, hashedPassword, roleId]
    );

    await client.query('COMMIT');

    return newUser.rows[0];

  } catch (error) {
    await client.query('ROLLBACK');
    throw error;

  } finally {
    client.release();
  }
};


/* =========================
   LOGIN USER
========================= */
const loginUser = async ({ email, password }) => {
  const userResult = await pool.query(
    `
    SELECT users.*, roles.name AS role
    FROM users
    JOIN roles ON users.role_id = roles.id
    WHERE email = $1
    `,
    [email]
  );

  if (userResult.rows.length === 0) {
    throw new Error('Invalid credentials');
  }

  const user = userResult.rows[0];

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw new Error('Invalid credentials');
  }

  const accessToken = jwtUtil.generateAccessToken(user);
  const refreshToken = jwtUtil.generateRefreshToken(user);

  await pool.query(
    `
    INSERT INTO refresh_tokens
    (user_id, token, expires_at)
    VALUES
    ($1, $2, NOW() + INTERVAL '7 days')
    `,
    [user.id, refreshToken]
  );

  return {
    accessToken,
    refreshToken
  };
};


/* =========================
   REFRESH TOKEN (ROTATION FIXED)
========================= */
const refreshAccessToken = async (refreshToken) => {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    const tokenResult = await client.query(
      `
      SELECT * FROM refresh_tokens
      WHERE token = $1
      AND is_revoked = FALSE
      `,
      [refreshToken]
    );

    if (tokenResult.rows.length === 0) {
      throw new Error('Refresh token invalid');
    }

    const decoded = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET
    );

    const userResult = await client.query(
      `
      SELECT users.*, roles.name AS role
      FROM users
      JOIN roles ON users.role_id = roles.id
      WHERE users.id = $1
      `,
      [decoded.id]
    );

    const user = userResult.rows[0];

    // OLD TOKEN REVOKE (ROTATION)
    await client.query(
      `
      UPDATE refresh_tokens
      SET is_revoked = TRUE
      WHERE token = $1
      `,
      [refreshToken]
    );

    // NEW TOKENS
    const newAccessToken =
      jwtUtil.generateAccessToken(user);

    const newRefreshToken =
      jwtUtil.generateRefreshToken(user);

    // SAVE NEW REFRESH TOKEN
    await client.query(
      `
      INSERT INTO refresh_tokens
      (user_id, token, expires_at)
      VALUES ($1, $2, NOW() + INTERVAL '7 days')
      `,
      [user.id, newRefreshToken]
    );

    await client.query('COMMIT');

    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken
    };

  } catch (error) {
    await client.query('ROLLBACK');
    throw error;

  } finally {
    client.release();
  }
};


/* =========================
   EXPORTS
========================= */
module.exports = {
  registerUser,
  loginUser,
  refreshAccessToken
};

const logoutUser = async (refreshToken) => {
  await pool.query(
    `
    UPDATE refresh_tokens
    SET is_revoked = TRUE
    WHERE token = $1
    `,
    [refreshToken]
  );

  return {
    message: 'Logged out successfully'
  };
};

module.exports = {
  registerUser,
  loginUser,
  refreshAccessToken,
  logoutUser
};