const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const ActivityRouter = require("./routes/activity.route");

const app = express();

require("dotenv").config();

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/todoapiDB";

/* Allowing the frontend to access the backend. */
app.use(cors());

/* Telling the application to use the express.json() middleware. This middleware will parse the body of
any request that has a Content-Type of application/json. */
app.use(express.json());

// Production script
app.use(express.static("../client/build"));
app.get("*",(req, res) => {
  res.sendFile(path.resolve(__dirname, "..", "client", "build", "index.html"));
});

/* This is a route handler. It is listening for a GET request to the root route of the application.
When it receives a request, it will send back a response with the string "Hello World!". */
app.get("/", (req, res) => {
  res.send("Hello World!");
});

/* Telling the application to use the ActivityRouter for any requests that start with "/api". */
app.use("/api", ActivityRouter);


/* Connecting to the database and then starting the server. */
mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    app.listen(PORT, console.log("Server stated on port 5000"));
  })
  .catch((err) => {
    console.log(err);
  });