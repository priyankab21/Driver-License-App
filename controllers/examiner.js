const User = require("../models/PersonalInfo");

const redirectToEmployer = async (req, res) => {
  if (req.session.userType === "driver") {
    res.redirect("/");
  } else {
    const showPopup = false;
    const appointments = await User.find({
      appointmentID: { $ne: null },
    }).populate("appointmentID");
    // console.log(appointments, 'appointments');
    res.render("examiner", { appointments, showPopup });
  }
};

const getUserDetails = async (req, res) => {
  const showPopup = true;
  const appointments = await User.find({
    appointmentID: { $ne: null },
  }).populate("appointmentID");
  const userDetails = await User.findOne({
    _id: req.query.id,
  });
  console.log(appointments, userDetails, "params");
  res.render("examiner", { appointments, userDetails, showPopup });
};

const closePopup = async (req, res) => {
  const showPopup = false;
  const updateComment = await User.findByIdAndUpdate(
    { _id: req.body.id },
    { $set: { comments: req.body.comment, testStatus: req.body.testStatus } }
  );
  const appointments = await User.find({
    appointmentID: { $ne: null },
  }).populate("appointmentID");
  res.render("examiner", { appointments, showPopup });
};

const getDataByTestType = async (req, res) => {
  const showPopup = false;
  console.log(req.body, 'body')
  const appointments = await User.find({ testType: req.body.type }).populate(
    "appointmentID"
  );
  console.log(appointments)
  res.render("examiner", { appointments, showPopup });
};

module.exports = {
  redirectToEmployer,
  getUserDetails,
  closePopup,
  getDataByTestType,
};
