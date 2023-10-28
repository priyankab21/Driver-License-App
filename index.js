const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");
const expressSession = require("express-session");
const PersonalInfo = require("./models/PersonalInfo");
const bcrypt = require("bcrypt");
const { signUp, createUser } = require("./controllers/signUpController");
const { g2Page, fetchPersonalInfo, getResult, closeStatusPopup } = require("./controllers/g2PageController");
const { gPage, updatePersonalInfo } = require("./controllers/gPageController");
const { login, validateUser } = require("./controllers/loginController");
const {
  AppointmentsPage,
  createAppointment,
  getDataByTestResult
} = require("./controllers/appointments");
const {
  redirectToEmployer,
  getUserDetails,
  closePopup,
  getDataByTestType,
} = require("./controllers/examiner");

const app = new express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  expressSession({
    secret: "bhosle396",
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: true, // Use secure cookies in production (requires HTTPS)
      sameSite: 'none', // Appropriate for cross-origin cookies
      httpOnly: false
    },
  })
);
app.use(express.static("public"));
app.set("view engine", "ejs");

mongoose.connect(
  "mongodb+srv://Priyanka:Priya123@cluster0.lpxrfgj.mongodb.net/?retryWrites=true&w=majority"
);

const port = 4005;

global.showAdminAuthenticatedRoutes = false;
global.showAuthenticatedRoutes = false;
global.showExaminerAuthenticatedRoutes = false;
global.loggedIn = false;

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/g", gPage);

app.get("/g2", g2Page);

app.get("/login", login);

app.post("/fetchpersonalInfo", fetchPersonalInfo);

app.post("/storePersonalInfo", updatePersonalInfo);

app.get("/signup", signUp);

app.post("/createUser", createUser);

app.post("/checkUser", validateUser);

app.get("/appointments", AppointmentsPage);

app.post("/createAppointment", createAppointment);

app.get("/examiner", redirectToEmployer);

app.post("/searchByTestype", getDataByTestType);

app.get("/getUserDetails", getUserDetails);

app.post("/closePopup", closePopup);

app.post("/searchByTestResult", getDataByTestResult);

app.get("/getResult", getResult);

app.get("/getResultg2", getResult);

app.post("/closeStatusPopup", closeStatusPopup);

app.get("/signout", (req, res) => {
  global.loggedIn = false;
  const showErrorMsg = false;
  showAdminAuthenticatedRoutes = false;
  showExaminerAuthenticatedRoutes = false;
  req.session.userId = "";
  req.session.userType = "";
  res.render("login", { showErrorMsg });
});

app.listen(port, () => {
  console.log("App Listening on Port " + port);
});
