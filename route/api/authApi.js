const express = require("express");
const auth = require("../../middleware/auth");
const router = express.Router();

/* 
    User sign in, with bcrypt authentication
    and jwt token
*/
router.post("/signin", require("../../controllers/authController").signin);
router.get(
  "/user",
  auth,
  require("../../controllers/authController").getUserData
);

module.exports = router;
