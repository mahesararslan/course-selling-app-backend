const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin } = require("../db/index");
const { Course } = require("../db/index");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const router = Router();

router.post("/signup", async function(req,res) {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;

    await Admin.create({
        username: username,
        password: password
    })
    
    res.json({
        msg: "Admin created successfully"
    })

});

router.post("/signin", async function(req, res) {

    const username = req.body.username;
    const password = req.body.password;

    const user = await Admin.find({
        username: username,
        password: password
    })

    if(user)
 {
    const token = jwt.sign({
        username
    }, JWT_SECRET);

    res.json({
        token
    })
 } else {
    res.status(403).json({
        msg: "Incorret Email or Password"
    })
 }
    
})

router.post("/courses", adminMiddleware, async function(req, res) {

    // In real world/projects use zod for input validation, as user can send anything.
    const title = req.body.title;
    const description = req.body.description;
    const imageLink = req.body.imageLink;
    const price = req.body.price;

    const newCourse = await Course.create({
        title: title,
        description: description,
        imageLink: imageLink,
        price: price
    })

    res.json({
        msg: "Course created successfully",
        courseId: newCourse._id // mongoDB assigns a unique id with name ._id to each value.
    })
});

router.get("/courses", adminMiddleware, async function(req,res) {
    // Implements fetching all courses logic.

    const allCourses = await Course.find({}); // finds all courses
    res.json({
        courses: allCourses
    })
})

module.exports = router;