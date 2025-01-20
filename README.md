# Project Management System

A REST API for managing projects, tasks, and teams with Node.js and MongoDB.

---

## Features

### User Management
- Login & Signup
- Role-based Access
- Profile Updates

### Project Management
- Create, Edit, Delete Projects
- Add Team Members
- Track Progress & Priorities

### Task Management
- Add & Assign Tasks
- Update Status
- Track Progress

---

## Tech Stack
- **Node.js** + **Express.js**
- **MongoDB**
- **JWT Authentication**
- **Zod Validation**

---

## API Endpoints

### **Auth**
- `POST /sign-up` - Register
- `POST /sign-in` - Login
- `POST /sign-out` - Logout

### **Projects**
- `POST /projects` - Create
- `GET /projects` - List All
- `GET /projects/:id` - View
- `PUT /projects/:id` - Update
- `DELETE /projects/:id` - Delete
- `POST /projects/:id/users/:userId` - Add User
- `DELETE /projects/:id/users/:userId` - Remove User

### **Tasks**
- `POST /tasks` - Create
- `GET /projects/:projectId/tasks` - List
- `GET /tasks/:id` - View
- `PUT /tasks/:id` - Update
- `DELETE /tasks/:id` - Delete

---

## Installation

1. Clone the repo:
   ```bash
   git clone https://github.com/username/project-management-system.git
   cd project-management-system
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set environment variables in `.env`:
   ```plaintext
   PORT=5000
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   NODE_ENV=development
   ```
4. Run the server:
   ```bash
   npm start
   ```

---

## Data Models

### User
- `name`, `email`, `password`, `role`, `createdAt`, `updatedAt`

### Project
- `name`, `description`, `startDate`, `endDate`, `status`, `priority`, `type`, `users`, `tasks`, `createdBy`, `createdAt`, `updatedAt`

### Task
- `name`, `description`, `status`, `priority`, `assignedTo`, `project`, `createdBy`, `createdAt`, `updatedAt`

---

## Validation
- **Zod** for inputs: User, Project, Task

---

## Error Handling
- Validation, Authentication, Database, Logic Errors

---

## Security
- JWT Auth, Password Hashing, Input Sanitization

---

## Deployment
Deployed on Render : https://pms-backend-nodejs.onrender.com/

---

## License
MIT License

---

## Author
**Avantika**
