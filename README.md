# Listfy Todo List

A full-stack MERN (MongoDB, Express, React, Node.js) Todo List application that supports user authentication and task management with a clean UI and modern development practices.

## 🚀 Tech Stack

### Frontend:
- React
- Vite
- Tailwind CSS
- Context API

### Backend:
- Node.js
- Express
- MongoDB + Mongoose
- JWT (jsonwebtoken)
- Bcryptjs
- Validator
- Dotenv
- CORS

---

## 📁 Project Structure

```
Listfy-Todo/
├── client/
│   ├── .env                     # Environment variables for frontend
│   ├── index.html               # Entry HTML file for Vite
│   ├── package.json             # Frontend dependencies and scripts
│   └── src/
│       ├── assets/              # Static images, icons, etc.
│       ├── components/          # Reusable UI components (e.g. buttons, inputs)
│       ├── containers/          # Page-level components (e.g. Profile, TodoPage)
│       ├── contexts/            # Global state management (e.g. AuthContext)
│       ├── App.jsx              # Main App component with routes
│       └── main.jsx             # App entry point for React/Vite
│
├── server/
│   ├── controllers/             # All controller logic (auth, todo, etc.)
│   ├── middleware/              # Middlewares (e.g. JWT authentication)
│   ├── models/                  # Mongoose models for User & Todo
│   ├── routes/                  # API routes for auth & todos
│   ├── .env                     # Environment variables for backend
│   ├── app.js                   # Main Express app configuration
│   └── server.js                # Backend entry point (starts the server)
│
├── README.md
└── package.json (if root managed shared config or scripts)

```

---

## ✅ Features

- [x] JWT Authentication: Register / Login / Logout
- [x] Protected Routes using middleware
- [x] CRUD operations for Todos
- [x] Search Todos by title
- [x] Filter by completed/pending status
- [x] Update user profile (name and phone)

---

## 📄 Functional Requirements Document (FRD)

### System Requirements:
- Node.js v18+
- MongoDB Atlas or local MongoDB

### User Stories:
- As a new user, I want to register so I can manage my tasks.
- As a user, I want to log in to access my to-dos.
- As a user, I want to add, edit, delete, and mark my tasks.

### Wireframes:
- Auth Pages: Login / Register
- Main Todo Page: List View with Add Task
- Profile Page: View and Edit user info

### API Specs:
#### Auth
- POST `/api/auth/register`
- POST `/api/auth/login`
- POST `/api/auth/logout`

#### Todos
- POST `/api/todo/addTodo`
- GET `/api/todo/getTodos`
- POST `/api/todo/updateTodo`
- POST `/api/todo/changeTodoStatus`
- DELETE `/api/todo/deleteTodo`

#### User
- GET `/api/user/getUserProfile`
- PUT `/api/user/updateUserProfile`

---

## 🛠️ Setup Instructions

1. Clone the repository:
```bash
git clone https://github.com/yourusername/Listfy-TodoList.git
```
2. Install dependencies:
```bash
cd server && npm install
cd ../client && npm install
```
3. Add `.env` file to `/server`:
```
PORT=5000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
```
4. Run the development servers:
```bash
# In /server
npm run server

# In /client
npm run dev
```

---

## ✨ Future Enhancements
- Add password reset
- Task categories
- Pagination
- Deploy on Vercel (frontend) and Render (backend)
- Testing with Jest


