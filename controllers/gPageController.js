const PersonalInfo = require("../models/PersonalInfo");
const { fetchPersonalInfo } = require("./g2PageController");
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const Appointments = require("../models/Appointments");

const gPage = async (req, res) => {
  if(req.session.userType === 'admin') {
    res.redirect('/')
  } else {
    const allAppointments = await Appointments.find({ isTimeSlotAvailable: { $in: true } });
    const stringData = JSON.stringify(allAppointments);
    req.body.stringData = stringData;
    let showStatusPopup = false;
    const result = {};
    req.body.showStatusPopup = showStatusPopup;
    req.body.result = result;
    fetchPersonalInfo(req, res);
  }
};

const updatePersonalInfo = async (req, res) => {
  console.log(disablePersonalInfoFields, req.body, 'disablePersonalInfoFields');
  let licenseNumber = req.body.license;
  let obj = {
    appointmentID: req.body.hiddenG2Time ? req.body.hiddenG2Time : null,
    carInfo: {
      make: req.body.make,
      model: req.body.model,
      year: req.body.year,
      plateNumber: req.body.plateNumber,
    },
  };
  if(!disablePersonalInfoFields) {
    licenseNumber = await bcrypt.hash(req.body.license, 10);
    obj = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      licenseNumber: licenseNumber,
      age: req.body.age,
      appointmentID: req.body.hiddenG2Time ? req.body.hiddenG2Time : null,
      carInfo: {
        make: req.body.make,
        model: req.body.model,
        year: req.body.year,
        plateNumber: req.body.plateNumber,
      },
    };
  }
  const objId = req.body.hiddenG2Time ? new mongoose.Types.ObjectId.createFromHexString(req.body.hiddenG2Time.replace("'", '')) : '';
  const updatedInfo = await PersonalInfo.findByIdAndUpdate(req.body.id, obj);
  if(objId) {
  const updateApointments = await Appointments.updateOne({ _id: objId }, {$set: { isTimeSlotAvailable: false }});
  }
  if (req.url === "/g") {
    res.redirect("/g");
  } else {
    res.redirect("/g");
  }
};

module.exports = { gPage, updatePersonalInfo };
