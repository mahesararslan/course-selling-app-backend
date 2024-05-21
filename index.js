const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const adminRouter = require("./routes/admin");
const userRouter = require("./routes/user");

const { JWT_SECRET } = require("./config");

// Middlewares for parsing request bodies
app.use(bodyParser.json());
app.use("/admin", adminRouter);;
app.use("/user", userRouter);

const port = 3000;
app.listen(port, function() {
    console.log("Server is running on port " + port);
});

module.exports = JWT_SECRET;