const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const config = require("config");

const app = express();

/* 
    @Middleware
    @express.json()
*/
app.use(express.json());

/* 
    @Database Configuration
*/
const database = config.get("mongoUrl");
mongoose
  .connect(database, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("Mongodb Connected"))
  .catch((err) => console.log("Errors occured while connecting to Mongodb"));

/* 
    Set up APIs
*/
app.use("/api/item", require("./route/api/crudApi"));
app.use("/api/user", require("./route/api/userApi"));
app.use("/api/auth", require("./route/api/authApi"));

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
