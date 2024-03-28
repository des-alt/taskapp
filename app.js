const http = require("http");
const mongoose = require("mongoose");
const Tasks = require("./models/task.module.js");
const express = require("express");
const taskRoutes = require("./routes/task.route.js");
require("dotenv").config();

const app = express();

//middleware for json
app.use(express.json());
//middleware for urlencoded
app.use(express.urlencoded({ extended: false }));

//routes
app.use("/api/tasks", taskRoutes);

//home
app.get("/", function (request, response) {
  response.send("<h1>Чо ты тут забыл?<h1>");
});

app.listen(3000);

//connect to MongoDB
mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@taskmanagerapp.bywnyh2.mongodb.net/tasks?retryWrites=true&w=majority&appName=TaskManagerApp`
  )
  .then(() => console.log("Connection Success"))
  .catch((err) => console.log(`Error connection to DB: ${err}`));
