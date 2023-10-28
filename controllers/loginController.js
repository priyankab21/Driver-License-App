const PersonalInfo = require("../models/PersonalInfo");
const bcrypt = require("bcrypt");

const login = (req, res) => {
  const showErrorMsg = false;
  res.render("login", { showErrorMsg });
};

const validateUser = (req, res) => {
  console.log(req.body, 'req.body')
  const { uname, psw } = req.body;
  PersonalInfo.findOne({ username: uname }, (err, user) => {
    console.log(user, 'user')
    if (user) {
      bcrypt.compare(psw, user.password, (error, same) => {
        if (same) {
          req.session.userId = user._id;
          req.session.userType = user.userType;
          global.loggedIn = true;
          if (user.userType === "driver") {
            showAuthenticatedRoutes = true;
          } else {
            showAuthenticatedRoutes = false;
          }
          console.log(user, "user");
          if (user.userType === "admin") {
            console.log("Hi");
            showAdminAuthenticatedRoutes = true;
          } else {
            console.log("Hello");
            showAdminAuthenticatedRoutes = false;
          }
          if (user.userType === "examiner") {
            showExaminerAuthenticatedRoutes = true;
          } else {
            showExaminerAuthenticatedRoutes = false;
          }

          res.render("index");
        } else {
          const showErrorMsg = true;
          global.loggedIn = false;
          res.render("login", { showErrorMsg });
        }
      });
    } else {
      const showErrorMsg = true;
      res.render("login", { showErrorMsg });
    }
  });
};

module.exports = { login, validateUser };
