const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./db/db");
require("dotenv").config();
const classRoomRoutes = require("./route/ClassRoomRoute");
const userRoutes = require("./route/UserRoute");
const courseRoutes = require("./route/CourseRoute");
const sessionRoute = require("./route/sessionRoute");
// Importing express module
const app = express();

// Defining port number
const PORT = process.env.PORT || 8000;

// Middleware to parse incoming requests with JSON payloads
app.use(express.json());

app.use(bodyParser.json());
app.use("/api/classroom", classRoomRoutes);
app.use("/api/user", userRoutes);
app.use("/api/course", courseRoutes);
app.use("/api/session", sessionRoute);
// Connecting to the database
connectDB();

// Start the server and listen on the 8000 port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
