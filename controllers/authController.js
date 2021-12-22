const bcrypt = require("bcrypt");
const User = require("../models/User");
const Category = require("../models/Category");
const Course = require("../models/Course");
const { validationResult } = require("express-validator");

exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).redirect("/login");
  } catch (error) {
    const errors = validationResult(req);
    console.log(errors.array()[0].msg);

    for (let i = 0; i < errors.array().length; i++) {
      req.flash("error", `${errors.array()[i].msg}`);
    }

    res.status(400).redirect("/register");
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log(password);

  await User.findOne({ email }, (err, user) => {
    if (user) {
      bcrypt.compare(password, user.password, (err, same) => {
        console.log(same);
        if (same) {
          req.session.userID = user._id;
          res.status(200).redirect("/users/dashboard");
        } else {
          req.flash("error", "Your password is incorrect!");
          res.status(400).redirect("/login");
        }
        
      });
    } else {
      req.flash("error", "User is not found");
      res.status(400).redirect("/login");
    }
  })
    .clone()
    .catch(function (err) {
      console.log(err);
    });
};

exports.logoutUser = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
};

exports.getDashboardPage = async (req, res) => {
  const user = await User.findOne({ _id: req.session.userID }).populate(
    "courses"
  );
  const categories = await Category.find();
  const courses = await Course.find({ user: req.session.userID });
  const users=await User.find();
  res.status(200).render("dashboard", {
    page_name: "dashboard",
    user,
    categories,
    courses,
    users
  });
};
