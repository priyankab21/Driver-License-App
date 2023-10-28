const PersonalInfo = require("../models/PersonalInfo");

const signUp = (req, res) => {
  let obj = {
    showErrorMsg: false,
    showUserNameError: false,
  };
  res.render("signup", { obj });
};

const createUser = async (req, res) => {
  try {
    let obj = {
      showErrorMsg: false,
      showUserNameError: false,
    };
    const userName = await PersonalInfo.findOne({
      username: req.body.uname,
    });
    console.log(userName, 'userName')
    if (userName) {
      obj.showUserNameError = true;
      res.render("signup", { obj });
    } else if (req.body.psw === req.body.Rpsd) {
      const obj = {
        username: req.body.uname,
        password: req.body.psw,
        userType: req.body.type,
      };
      PersonalInfo.create(obj);
      res.redirect("/login");
    } else {
      obj.showErrorMsg = true;
      res.render("signup", { obj });
    }
  } catch (e) {
    console.log(e);
  }
};

module.exports = { signUp, createUser };
