# Feedback Board

A MERN stack feedback management system developed for the IEDC Technical Selection.

## Features

- Responsive feedback submission page
- MongoDB database (Compass)
- Admin login
- Password hashing with bcrypt
- Admin dashboard
- View submitted feedback
- Delete feedback
- Loading states
- Toast notifications
- Responsive UI

## Tech Stack

Frontend:
- React
- Bootstrap
- Axios
- React Hot Toast

Backend:
- Node.js
- Express.js
- MongoDB
- Mongoose
- bcrypt

## How to Run

### Frontend

cd client
npm install
npm run dev

### Backend

cd server
npm install
node server.js

### Create Admin

cd server
node createAdmin.js

Admin credentials:

## Admin Access

The admin login page is intentionally not exposed through the public interface.
The admin route is accessible only to authorized personnel who are provided
with the access URL.

Admin authentication is protected through backend username/password
verification using bcrypt password hashing.
