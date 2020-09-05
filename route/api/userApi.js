const express = require("express");
const router = express.Router();

/* 
    User sign up, with hashed password
    and jwt token
*/
router.post("/signup", require("../../controllers/userController").signup);

module.exports = router;
