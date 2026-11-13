# Student Management REST API

## Project Overview

The Student Management REST API is a backend application built with Node.js and Express.js. It allows users to manage student records through RESTful API endpoints.

The API supports creating, retrieving, updating, deleting, searching, and filtering student records. It also provides student statistics, input validation, custom middleware, and centralized error handling.

## Technologies Used

- Node.js
- Express.js
- JavaScript
- Postman (API testing)

## Project Structure

```text
student-management-api/
├── controllers/
│   └── studentController.js
├── data/
│   └── students.js
├── middleware/
│   ├── logger.js
│   ├── validateStudent.js
│   └── errorHandler.js
├── routes/
│   └── students.js
├── .gitignore
├── package.json
├── package-lock.json
├── README.md
└── server.js
```

## Installation and Setup

### 1. Clone the repository

```bash
git clone https://github.com/EleniGebremedhin/student-management-api.git
```

### 2. Navigate to the project folder

```bash
cd student-management-api
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the server

```bash
node server.js
```

The server runs at:

```text
http://localhost:3000
```

## API Endpoints

Base URL: `http://localhost:3000/api/students`

| Method | Endpoint | Description                 |
| ------ | -------- | --------------------------- |
| GET    | `/`      | Retrieve all students       |
| GET    | `/:id`   | Retrieve a student by ID    |
| POST   | `/`      | Create a new student        |
| PUT    | `/:id`   | Fully update a student      |
| PATCH  | `/:id`   | Partially update a student  |
| DELETE | `/:id`   | Delete a student            |
| GET    | `/stats` | Retrieve student statistics |

## Search and Filtering

The API supports searching and filtering using query parameters.

Examples:

```text
GET /api/students?name=Amina
GET /api/students?email=amina@example.com
GET /api/students?status=Active
GET /api/students?course=Computer Science
GET /api/students?gpa=3.7
```

Multiple filters can also be combined:

```text
GET /api/students?name=Amina&status=Active
```

## Student Statistics

The statistics endpoint provides:

```text
GET /api/students/stats
```

It returns:

- Total number of students
- Average GPA
- Number of students in each course

## Sample Student Data

Example JSON request body for creating a student:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "age": 22,
  "course": "Computer Science",
  "gpa": 3.8,
  "status": "Active"
}
```

## Middleware and Error Handling

The project includes custom middleware:

- **Logger Middleware:** Logs incoming HTTP requests, including their methods and URLs.
- **Validation Middleware:** Checks student input data and rejects invalid requests.
- **Error Handler Middleware:** Provides centralized error responses.

## HTTP Status Codes

| Status Code | Meaning                                |
| ----------- | -------------------------------------- |
| 200         | OK – Request successful                |
| 201         | Created – Student successfully created |
| 400         | Bad Request – Invalid input            |
| 404         | Not Found – Student or route not found |
| 500         | Internal Server Error                  |

## Data Storage

This project currently uses an in-memory JavaScript array to store student records. Data is reset to the initial sample records whenever the server restarts. No database is connected.

## API Testing

The endpoints were tested using Postman, including CRUD operations, search and filtering, statistics, and input validation.

## Author

**Eleni Gebremedhin**

GitHub: [EleniGebremedhin](https://github.com/EleniGebremedhin)
