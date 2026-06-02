# Auth RBAC API

A production-ready backend authentication and authorization system built with Node.js, Express, and PostgreSQL. This project demonstrates secure user authentication using JWT, refresh token rotation, role-based access control (RBAC), request validation with Zod, and API documentation using Swagger.

The goal of this project is to implement modern backend security practices while following REST API design principles and PostgreSQL best practices. It serves as a practical example of how authentication and authorization systems are implemented in real-world applications.

---

##Project Highlights

This project includes:

- Secure user registration and login
- JWT-based authentication
- Access and refresh token strategy
- Refresh token rotation and revocation
- Role-Based Access Control (RBAC)
- PostgreSQL transactions
- Request validation using Zod
- Swagger API documentation
- Security middleware (Helmet, CORS, Rate Limiting)

---

## Technologies Used

| Technology | Purpose |
|------------|----------|
| Node.js | Runtime Environment |
| Express.js | Backend Framework |
| PostgreSQL | Relational Database |
| JWT | Authentication |
| bcrypt | Password Hashing |
| Zod | Request Validation |
| Swagger | API Documentation |
| Helmet | Security Headers |
| express-rate-limit | API Protection |
| CORS | Cross-Origin Requests |

---

## Authentication Flow

The authentication system follows a token-based approach.

1. A user registers with a name, email, and password.
2. Passwords are securely hashed using bcrypt before being stored.
3. During login, the server validates credentials and generates:
   - Access Token (short-lived)
   - Refresh Token (long-lived)
4. The refresh token is stored in the database.
5. When the access token expires, a new one can be generated using the refresh token.
6. Refresh token rotation is implemented to improve security by revoking old refresh tokens and issuing new ones.

This approach helps reduce the impact of token theft and follows modern authentication best practices.

---

## Role-Based Access Control (RBAC)

The application supports multiple user roles:

### Admin
- Full access to administrative routes
- Can manage protected resources

### Manager
- Limited administrative privileges
- Can access manager-specific functionality

### User
- Access to personal resources only
- Cannot access administrative endpoints

Authorization is enforced through middleware, ensuring that only users with the required role can access protected routes.

---

## Database Design

The project uses PostgreSQL as the primary database.

### Main Tables

#### Users
Stores user information and credentials.

#### Roles
Defines system roles such as Admin, Manager, and User.

#### Refresh Tokens
Stores refresh tokens and their status for token rotation and revocation.

The database layer also demonstrates transaction management using:

- BEGIN
- COMMIT
- ROLLBACK

to maintain data consistency and integrity.

---

## Security Features

Several security mechanisms have been implemented:

- Password hashing using bcrypt
- JWT authentication
- Refresh token rotation
- Token revocation on logout
- Helmet security headers
- API rate limiting
- CORS protection
- Input validation using Zod

These features help protect the application against common security vulnerabilities.

---

## API Documentation

Swagger has been integrated to provide interactive API documentation.

After running the application, open:

```text
http://localhost:5000/api-docs
```

The Swagger UI allows developers to explore and test API endpoints directly from the browser.

---

## Project Structure

```text
src/
│
├── config/
├── controllers/
├── services/
├── routes/
├── middleware/
├── schemas/
├── utils/
│
├── app.js
└── server.js
```

The project follows a layered architecture that separates routing, business logic, validation, middleware, and database operations.

---

## Installation

### Clone the Repository

```bash
git clone <repository-url>
cd auth-rbac-api
```

### Install Dependencies

```bash
npm install
```

### Configure Environment Variables

Create a `.env` file in the root directory:

```env
PORT=5000

DB_USER=postgres
DB_HOST=localhost
DB_NAME=auth_rbac_db
DB_PASSWORD=your_password
DB_PORT=5432

JWT_ACCESS_SECRET=your_access_secret
JWT_REFRESH_SECRET=your_refresh_secret
```

### Start the Development Server

```bash
npm run dev
```

---

## Available Endpoints

### Authentication

```http
POST /api/v1/auth/register
POST /api/v1/auth/login
POST /api/v1/auth/refresh
POST /api/v1/auth/logout
```

### User

```http
GET /api/v1/users/profile
```

### Admin

```http
GET /api/v1/admin
```

---

## Learning Outcomes

This project helped demonstrate:

- Secure authentication implementation
- JWT token management
- Refresh token rotation
- PostgreSQL transaction handling
- REST API design principles
- Request validation techniques
- API documentation practices
- Role-based access control implementation
