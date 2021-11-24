const User = require("../models/User");

module.exports = (req, res, next) => {
  User.findById(req.session.userID, (err, user) => {
    if(req.session.userID){
        return res.redirect("/");
    }
    next();
  });
};
