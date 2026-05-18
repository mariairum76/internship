# Week 1 - PERN 
Project Name: Task Manager

## Description
A simple Task Manager API built with Express and PostgreSQL. Supports full CRUD operations for managing tasks.

## Tech Stack
- **Backend**: Node.js, Express
- **Database**: PostgreSQL
- **Testing**: Postman

## Setup & Run Instructions
1. Open the `task manager` folder in VS Code/terminal
2. Run `npm install` to install dependencies
3. Create a `.env` file in the root of `task manager` folder:   DB_USER=postgres
   DB_PASSWORD=yourpassword
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=taskmanagerjavascript4. Make sure PostgreSQL is running. You can use Docker or local install
5. Run `npm run dev` to start the server
6. Test endpoints using Postman at `http://localhost:3000/tasks`

## API Endpoints
- `GET /tasks` - Get all tasks
- `POST /tasks` - Create a new task
- `PUT /tasks/:id` - Update a task
- `DELETE /tasks/:id` - Delete a task

## Folder Contents
- `task manager/`: Complete backend code
- `ss/`: Screenshots of Postman API tests
- `demo.mp4`: Video demonstration of the working project

## Notes
- Raw SQL queries are used with the `pg` package, no ORM
- Delete the `node_modules` folder before zipping to reduce file size