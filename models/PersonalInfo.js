const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const PersonalInfoSchema = new Schema({
  firstName: { type: String, default: "demo" },
  lastName: { type: String, default: "demo" },
  licenseNumber: { type: String, default: "Default" },
  age: { type: Number, default: 0 },
  username: { type: String, default: "demo" },
  password: { type: String, default: "demo" }, //Encrypted Value
  userType: { type: String, default: "Driver" },
  testType: { type: String, default: "G2" },
  comments: { type: String, default: null },
  testStatus: { type: String, default: "" },
  appointmentID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Appointments",
    default: null,
  },

  carInfo: {
    make: { type: String, deafult: "demo" },
    model: { type: String, deafult: "demo" },
    year: { type: Number, deafult: 0 },
    plateNumber: { type: String, deafult: "demo" },
  },
  createdDate: { type: Date, default: new Date() },
});

PersonalInfoSchema.pre("save", function (next) {
  const personalInfoDetails = this;
  bcrypt.hash(personalInfoDetails.password, 10, (err, hashPassword) => {
    personalInfoDetails.password = hashPassword;
    next(); //takes to next fuction
  });
});

PersonalInfoSchema.pre("save", function (next) {
  const personalInfoDetails = this;
  bcrypt.hash(personalInfoDetails.licenseNumber, 10, (err, hashlicense) => {
    personalInfoDetails.licenseNumber = hashlicense;
    next(); //takes to next fuction
  });
});

const PersonalInfo = mongoose.model("PersonalInfo", PersonalInfoSchema);

module.exports = PersonalInfo;
