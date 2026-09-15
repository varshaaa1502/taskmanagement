# Task Management Application

Full-stack task manager built with React, Vite, Node.js, Express, MongoDB Atlas, JWT and bcrypt.

## Features
- User registration and login
- JWT authentication and protected routes
- Create, read, update and delete tasks
- Task status: To Do, In Progress, Completed
- Priority and due date
- Search and status filtering
- Responsive UI
- MongoDB Atlas support

## Requirements
- Node.js 18+
- MongoDB Atlas account

## 1. Configure MongoDB
Create a MongoDB Atlas cluster and database user. In Atlas, allow your development IP address under Network Access.

## 2. Backend
Open a terminal:

    cd server
    npm install

Copy `.env.example` to `.env` and update:

    MONGO_URI=mongodb+srv://USERNAME:PASSWORD@CLUSTER.mongodb.net/taskmanager
    JWT_SECRET=replace_with_a_long_random_secret
    PORT=5000

Start:

    npm run dev

## 3. Frontend
Open another terminal:

    cd client
    npm install

Copy `.env.example` to `.env`:

    VITE_API_URL=http://localhost:5000/api

Start:

    npm run dev

Open the URL shown by Vite, normally http://localhost:5173.

## Production
Build the frontend with `npm run build`. Deploy the server and frontend separately or configure Express to serve the `client/dist` folder.

Never commit `.env` files.
