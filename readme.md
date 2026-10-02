# Node.js + MongoDB Backend Setup Guide

This guide contains all the terminal commands and steps required to set up, run, and manage your Node.js backend.

## 1. Project Initialization
Commands to create a new directory and initialize the Node.js project.
```bash
# Create a new directory and move into it
mkdir backend
cd backend

# Initialize a new Node.js project (creates package.json)
npm init -y
```

## 2. Dependency Installation
Install the necessary packages for the backend server.
```bash
# Install core dependencies (Express, Mongoose, dotenv, cors)
npm install express mongoose dotenv cors

# Install Nodemon for development (restarts server automatically on file changes)
npm install --save-dev nodemon
```

## 3. Running the Server
Once the code and `.env` files are set up, use these commands to start the server.

```bash
# Standard way to run the server
node index.js

# Running the server with Nodemon (for development)
npx nodemon index.js
```

## 4. Setting up NPM Scripts (Optional but Recommended)
You can add scripts to your `package.json` file for easier command execution:
```json
"scripts": {
  "start": "node index.js",
  "dev": "nodemon index.js"
}
```
After adding these scripts, you can simply run:
```bash
# Starts the server normally
npm start

# Starts the server in development mode (with auto-reload)
npm run dev
```

## 5. Standard MVC Folder Structure
To keep your backend organized and scalable, we use the following directory structure inside the `backend` folder:

```text
backend/
│
├── config/         # Environment variables and configuration files (e.g., db.js)
├── controllers/    # Route handler functions (logic for your endpoints)
├── middlewares/    # Custom middleware (e.g., authentication, error handling)
├── models/         # Mongoose schemas and models (database structure)
├── routes/         # Express routes (maps endpoints to controllers)
│
├── .env            # Secret environment variables
├── index.js        # Entry point of the application
└── package.json    # Project dependencies and scripts
```