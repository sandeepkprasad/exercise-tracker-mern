const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const exercisesRouter = require("./routes/exercises"); // Import exercises route.
const usersRouter = require("./routes/users"); // Import users route.

require("dotenv").config();

const app = express();

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json()); // body-parser not required in latest express, instead use this code.
app.use("/exercises", exercisesRouter); // Use exrecises route.
app.use("/users", usersRouter); // Use users route.

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});

const connection = mongoose.connection;
connection.once("open", () => {
    console.log("Mongoose Database connection established successfully.");  
});

app.listen(port, () => {
    console.log("Server is running on port : " + port);
    
});