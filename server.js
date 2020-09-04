const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const crudApi = require("./route/api/crudApi");
const path = require("path");

const app = express();

/* 
    @Middleware
    @body-parser
*/
app.use(bodyParser.json());

/* 
    @Database Configuration
*/
const database = require("./config/database").mongoUrl;
mongoose
  .connect(database, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Mongodb Connected"))
  .catch((err) => console.log("Errors occured while connecting to Mongodb"));

/* 
    Set up APIs
*/
app.use("/api/item", crudApi);

/* 
    Server static assets if in production
*/
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

/* 
    Listen to the Server
*/
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log("Server Connected"));
