const mongoose = require("mongoose");
mongoose.connect(
  "mongodb://localhost:27017/course_selling_app", // to specify the name of the database, you can add "mongodb://localhost:27017/databaseName"
); // otherwise by default db name is test

const AdminSchema = new mongoose.Schema({
  username: String,
  password: String
});

const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  purchasedCourses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course" // refers to the course table
  }]
});

const CourseSchema = new mongoose.Schema({
  title: String,
  description: String,
  imageLink: String,
  price: Number
});

const Admin = mongoose.model("Admin", AdminSchema);
const User = mongoose.model("User", UserSchema);
const Course = mongoose.model("Course", CourseSchema);

module.exports = {
    Admin,
    User,
    Course
}