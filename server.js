const express = require("express");
const bodyParser = require('body-parser');
const connectDB = require("./db/db");
require("dotenv").config();
const roomRoutes = require('./route/RoomRoute');
const userRoutes = require('./route/UserRoute');
// Importing express module
const app = express();

// Defining port number
const PORT = process.env.PORT || 8000;

// Middleware to parse incoming requests with JSON payloads
app.use(express.json());

app.use(bodyParser.json());
app.use('/api/room', roomRoutes);
app.use('/api/user', userRoutes);
// Connecting to the database
connectDB();

// Start the server and listen on the 8000 port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
