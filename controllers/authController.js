const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const router = require("../route/api/userApi");

/* 
    @route      POST /api/auth/signin
    @desc       Register new user
    @access     Private
*/
exports.signin = (req, res) => {
  const { email, password } = req.body;

  //   Validation
  if (!email || !password) {
    return res.status(400).json({
      message: "Please enter all fields",
    });
  }

  //   check for the existing user
  User.findOne({ email }).then((user) => {
    if (!user) return res.status(400).json({ message: "User does not exist" });

    //   Validate password
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (!isMatch)
        return res.status(400).json({ message: "Invalid Password" });

      jwt.sign(
        { id: user.id },
        config.get("jwtSecret"),
        {
          expiresIn: "1h",
        },
        (err, token) => {
          if (err) throw err;
          res.json({
            token,
            user: {
              id: user.id,
              name: user.name,
              email: user.email,
            },
          });
        }
      );
    });
  });
};

/* 
    @route      GET /api/auth/user
    @desc       GET user data
    @access     Private
*/
exports.getUserData = (req, res) => {
  User.findById(req.user.id)
    .select("-password")
    .then((user) => res.json(user));
};
