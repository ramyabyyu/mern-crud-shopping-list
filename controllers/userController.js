const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");

/* 
    @route      POST /api/user/signup
    @desc       Register new user
    @access     Private
*/
exports.signup = (req, res) => {
  const { name, email, password } = req.body;

  //   Validation
  if (!name || !email || !password) {
    return res.status(400).json({
      message: "Please enter all fields",
    });
  }

  //   check for the existing user
  User.findOne({ email }).then((user) => {
    if (user)
      return res.status(400).json({ message: "This email already registered" });

    const newUser = new User({
      name,
      email,
      password,
    });

    // Create salt & hash Password
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser.save().then((user) => {
          // verify with jwt
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
    });
  });
};
