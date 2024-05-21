# course-selling-app-backend

A backend server for a course selling application built using Node.js and Express. This repository includes user and admin authentication, course management, and purchasing functionalities. MongoDB is used for data storage, with JWT for secure authentication.

# Features:

-User Authentication: Sign up and sign in functionalities for users and admins using JWT.<br>
-Admin Management: Admins can create and manage courses.<br>
-Course Catalog: Fetch available courses for users.<br>
-Purchase Courses: Users can purchase courses and view their purchased courses.<br>
-Middleware for Authorization: Middleware to handle user and admin authentication.<br>

# File Structure:

index.js: Main entry point of the server.<br>
config.js: Configuration file for storing environment variables.<br>
middlewares/: Contains middleware for user and admin authentication.<br>
user.js<br>
admin.js<br>
db/: Database connection and schema definitions using Mongoose.<br>
index.js<br>
routes/: Defines routes for user and admin functionalities.<br>
user.js<br>
admin.js<br>
