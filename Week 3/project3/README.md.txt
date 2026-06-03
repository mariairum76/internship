# React Auth Project

## Introduction

This project is a React-based frontend application developed to consume the Week 2 AUTH-RBAC API. The application demonstrates a complete authentication workflow, including user login, token management, protected routes, and logout functionality. It also incorporates modern React development practices such as React Query for server state management, Zustand for global state handling, custom hooks, lazy loading, and error boundaries.

The primary objective of this project is to provide a secure and efficient user experience while applying advanced React concepts learned during the internship. The frontend communicates with the backend API to authenticate users and retrieve protected user information.

---

## Project Overview

The application allows users to log in using valid credentials and access a protected dashboard. Once authenticated, users can view profile information retrieved from the backend API. Authentication tokens are securely managed, and token refresh functionality ensures uninterrupted access when the access token expires.

To improve user experience, the project also implements optimistic updates with rollback functionality. This allows the interface to update immediately while waiting for a server response and automatically restores the previous state if an error occurs.

---

## Features

The project includes the following functionalities:

- User Authentication (Login)
- Access Token and Refresh Token Management
- Logout Functionality
- Protected Routes
- User Profile Fetching
- React Query for Server State Management
- Zustand for Global State Management
- Custom React Hooks
- Optimistic Updates with Rollback
- React Lazy Loading
- Suspense for Loading States
- Error Boundary for Error Handling

---

## Technologies Used

The following technologies and libraries were used during the development of this project:

- React
- Vite
- React Router DOM
- Axios
- TanStack React Query
- Zustand
- Node.js
- Express.js
- PostgreSQL
- JWT Authentication

---

## Project Structure

```text
src
│
├── api
│   └── axios.js
│
├── components
│   ├── Navbar.jsx
│   └── ErrorBoundary.jsx
│
├── hooks
│   ├── useLogin.js
│   ├── useProfile.js
│   └── useAddNote.js
│
├── pages
│   ├── Login.jsx
│   └── Dashboard.jsx
│
├── routes
│   └── ProtectedRoute.jsx
│
├── store
│   └── authStore.js
│
├── App.jsx
└── main.jsx
```

---

## Installation and Setup

To run the project locally, follow these steps:

### Install Dependencies

```bash
npm install
```

### Start Development Server

```bash
npm run dev
```

The application will run on:

```text
http://localhost:5173
```

---

## Backend Requirements

This frontend application is connected to the Week 2 AUTH-RBAC API. Before running the frontend, ensure that the backend server is running successfully.

Backend URL:

```text
http://localhost:5000
```

API Base URL:

```text
http://localhost:5000/api/v1
```

---

## Authentication Flow

The authentication process begins when a user enters valid login credentials. After successful authentication, the backend returns an access token and a refresh token. These tokens are stored locally and used for accessing protected resources.

Protected routes prevent unauthorized users from accessing dashboard content. When an access token expires, the refresh token mechanism automatically requests a new access token without requiring the user to log in again. The logout functionality removes all stored authentication tokens and redirects the user to the login page.

---

## State Management

This project uses Zustand for managing authentication-related state across the application. Authentication data such as access tokens and refresh tokens can be accessed globally without the complexity of larger state management solutions.

Server state management is handled using TanStack React Query. React Query simplifies API communication by providing efficient data fetching, caching, synchronization, and mutation handling.

---

## Optimistic Updates

An optimistic update strategy has been implemented to improve user experience. When a user performs an action, the UI updates immediately before receiving confirmation from the server. If the server request succeeds, the change remains visible. If the request fails, the application automatically rolls back to the previous state, ensuring data consistency.

---

## Learning Outcomes

Through this project, the following concepts were applied and reinforced:

- React Authentication Flow
- Protected Routing
- JWT Token Management
- Refresh Token Handling
- React Query Queries and Mutations
- Optimistic Updates and Rollback
- Zustand State Management
- Custom Hooks
- Code Splitting with React Lazy
- Suspense
- Error Boundaries
- API Integration using Axios

---