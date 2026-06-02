const authService = require('../services/auth.service');

const register = async (req, res) => {
  try {
    const user = await authService.registerUser(req.body);

    res.status(201).json({
      message: 'User registered',
      user
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const login = async (req, res) => {
  try {
    const tokens = await authService.loginUser(req.body);

    res.json(tokens);
  } catch (error) {
    res.status(401).json({
      message: error.message
    });
  }
};

const refresh = async (req, res) => {
  try {
    const result = await authService.refreshAccessToken(
      req.body.refreshToken
    );

    res.json(result);
  } catch (error) {
    res.status(401).json({
      message: error.message
    });
  }
};

const logout = async (req, res) => {
  try {
    const result = await authService.logoutUser(
      req.body.refreshToken
    );

    res.json(result);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

module.exports = {
  register,
  login,
  refresh,
  logout
};