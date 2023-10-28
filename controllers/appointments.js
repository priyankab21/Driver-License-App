const Appointments = require("../models/Appointments");
const User = require("../models/PersonalInfo");

const AppointmentsPage = async (req,res) => {
  // const allAppointmentstime = [{time: "9:00", disabled: false}, {time: "9:30", disabled: false},{time: "10:00", disabled: false},{time: "10:30", disabled: false},{time: "11:00", disabled: false},{time: "11:30", disabled: false},{time: "12:00", disabled: false},{time: "12:30", disabled: false},{time: "1:00", disabled: false},{time: "1:30", disabled: false},{time: "2:00", disabled: false}]
  const allAppointmentstime = [];
  const appointments = [];
  const allAppointments = await Appointments.find({});
  const stringData = JSON.stringify(allAppointments);
  res.render("appointments", {allAppointmentstime, stringData, appointments});
}

const createAppointment = (req, res) => {
  Appointments.create(req.body)
  res.redirect("/");
};

const getDataByTestResult = async (req, res) => {
  const appointments = await User.find({
    testStatus: { $eq: req.body.testStatus },
  }).populate("appointmentID");
  const allAppointmentstime = [];
  const allAppointments = await Appointments.find({});
  const stringData = JSON.stringify(allAppointments);
  res.render("appointments", { appointments, stringData, allAppointmentstime });
};

module.exports = { AppointmentsPage, createAppointment,getDataByTestResult };
