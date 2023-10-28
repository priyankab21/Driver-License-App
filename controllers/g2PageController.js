const PersonalInfo = require("../models/PersonalInfo");
const bcrypt = require("bcrypt");
const Appointments = require("../models/Appointments");

const g2Page = async (req, res) => {
  if (req.session.userType === "admin") {
    res.redirect("/");
  } else {
    let showStatusPopup = false;
    const result = {};
    const allAppointments = await Appointments.find({isTimeSlotAvailable: { $in: true }});
    const stringData = JSON.stringify(allAppointments);
    req.body.stringData = stringData;
    req.body.showStatusPopup = showStatusPopup;
    req.body.result = result;
    fetchPersonalInfo(req, res);
  }
};

// const formatDate = (date) => {
//   return new Promise((resolve, reject) => {
//     resolve(moment(date).format("YYYY-MM-DD"));
//   });
// };

const fetchPersonalInfo = async (req, res) => {
  try {
    let showStatusPopup = req.body.showStatusPopup ? req.body.showStatusPopup : false;
    let personalInfo = await PersonalInfo.findById(req.session.userId).lean();
    if (personalInfo && personalInfo.firstName) {
      console.log(personalInfo, "personalInfo");
      bcrypt.compare("Default", personalInfo.licenseNumber, (err, same) => {
        console.log(same, "same");
        if (same) {
          personalInfo = {
            _id: personalInfo._id,
            firstName: null,
            lastName: null,
            licenseNumber: null,
            age: null,
            carInfo: {
              make: null,
              model: null,
              year: null,
              plateNumber: null,
            },
            disablePersonalInfoFields: false,
          };
          global.disablePersonalInfoFields = false;
        } else {
          personalInfo.disablePersonalInfoFields = true;
          global.disablePersonalInfoFields = true;
        }
        console.log(personalInfo, 'personalInfo')
        const stringData = req.body.stringData;
        const result = req.body.result ? req.body.result : {};
        showStatusPopup = req.body.showStatusPopup;
        if (req.url === "/g") {
          res.render("g", { personalInfo, stringData, showStatusPopup, result });
        } else {
          res.render("g2", { personalInfo, stringData, showStatusPopup, result });
        }
      });
    } else {
      personalInfo.disablePersonalInfoFields = true;
      global.disablePersonalInfoFields = true;
      console.log(personalInfo, 'personalInfo')
      const stringData = req.body.stringData;
      const result = req.body.result ? req.body.result : {};
      showStatusPopup = req.body.showStatusPopup;
      if (req.url === "/g") {
        res.render("g", { personalInfo, stringData, showStatusPopup, result });
      } else {
        res.render("g2", { personalInfo, stringData, showStatusPopup, result });
      }
    }
  } catch (e) {
    console.log(e);
  }
};

const getResult = async(req, res) => {
    const result = await PersonalInfo.findById(req.session.userId);
    const showStatusPopup = true;
    req.body.result = result;
    req.body.showStatusPopup = showStatusPopup;
    if(req.url === '/getResultg2?') {
        req.url = 'g2';
    } else if(req.url === '/getResult?') {
        req.url = 'g';
    }
    fetchPersonalInfo(req, res)
}

const closeStatusPopup = (req, res) => {
    const showStatusPopup = false;
    req.body.showStatusPopup = showStatusPopup;
    fetchPersonalInfo(req, res)
}

module.exports = { g2Page, fetchPersonalInfo, getResult, closeStatusPopup };
