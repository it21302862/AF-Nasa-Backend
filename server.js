const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./db/db");
require("dotenv").config();
const classRoomRoutes = require("./route/ClassRoomRoute");
const userRoutes = require("./route/UserRoute");
const courseRoutes = require("./route/CourseRoute");
const sessionRoute = require("./route/sessionRoute");
const timetableRoute = require("./route/timetableRoute");
const studentEnrollmentRoute = require("./route/studentEnrollmentRoute");
const notificationRoute = require("./route/notificationRoute");
// Importing express module
const app = express();

// Defining port number
const PORT = process.env.PORT || 8000;

// Middleware to parse incoming requests with JSON payloads
app.use(express.json());

app.use(bodyParser.json());
app.use("/api/classrooms", classRoomRoutes);
app.use("/api/users", userRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/sessions", sessionRoute);
app.use("/api/timetables", timetableRoute);
app.use("/api/enrollments", studentEnrollmentRoute);
app.use("/api/notifications", notificationRoute);
// Connecting to the database
connectDB();

// Start the server and listen on the 8000 port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
