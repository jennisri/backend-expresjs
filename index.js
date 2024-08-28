// mengimport express
const express = require("express");

// import cors
const cors = require("cors");

// import bodyParser
const bodyParser = require("body-parser");

//import router
const router = require("./routes");

const app = express();

// use cors
app.use(cors());

// use body parser
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

const port = 3000;

// route
app.get("/", (req, res) => {
  res.send("hello world");
});

// define routes
app.use("/api", router);

// start server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
