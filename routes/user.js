const { Router } = require("express");
const userMiddleware = require("../middleware/user");
const { User } = require("../db/index"); 
const { Course } = require("../db/index");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const router = Router();

router.post("/signup", async function(req,res) {
    // Implement user signup logic
    const username = req.body.username;
    const password = req.body.password;

    await User.create({
        username: username,
        password: password
    })

    res.json({
        msg: "User Created Successfully"
    })


});

router.post("/signin", async function(req, res){

    const username = req.body.username;
    const password = req.body.password;

   const user = await User.find({
    username: username,
    password: password
   });
   
   if(user) {

    const token = jwt.sign({
        username
    }, JWT_SECRET);

    res.json({
        token
    })

   } else {
    res.status(403).json({
        msg: "Incorrect username or password"
    });
   }
});

router.get("/courses", async function(req,res) {
    
    const allCourses = await Course.find({});
    res.json({
        courses: allCourses
    })

});

router.post("/courses/:courseId", userMiddleware, async function(req, res) {
    // Implement Course purchase logic
    const courseId = req.params.courseId;
    const username = req.username;

    // example of how to use try catch.
    try {
        await User.updateOne({
            username: username // for this username, update the second object which is the id of purchased course.
        }, {
            "$push": {
                purchasedCourses: courseId
            }
        })
    } catch(e) {
        console.log(e);
    };

    res.json({
        msg: "Purchase Complete!"
    })
});

router.get("/purchasedCourses", userMiddleware, async function(req,res) {
    const user = await User.findOne({
        username: req.username
    });
    
    const courses = await Course.find({
        _id: {
            "$in": user.purchasedCourses
        }
    })
    res.json({
        courses: courses 
    })
});

module.exports = router;