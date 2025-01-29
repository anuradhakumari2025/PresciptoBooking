const doctorModel = require("../models/doctor.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const appointmentModel = require("../models/appointment.model");
module.exports.changeAvailability = async (req, res) => {
  try {
    const { doctorId } = req.body;
    const doctorData = await doctorModel.findById(doctorId);
    await doctorModel.findByIdAndUpdate(doctorId, {
      available: !doctorData.available,
    });
    res.json({ success: true, message: "Availability Change" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

module.exports.doctorList = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select(["-password -email"]);
    // console.log(doctors)
    res.json({ success: true, doctors });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

module.exports.loginDoctor = async (req, res) => {
  try {
    const { email, password } = req.body;
    const doctor = await doctorModel.findOne({ email });
    if (!doctor) {
      return res.json({ success: false, message: "Invalid Credentials" });
    }
    const isMatch = await bcrypt.compare(password, doctor.password);
    if (!isMatch) {
      res.json({ success: false, message: "Invalid Credentials" });
    } else {
      const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET);
      res.json({ success: true, token });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

module.exports.appointmentsDoctor = async (req, res) => {
  try {
    const { doctorId } = req.body;
    const appointments = await appointmentModel.find({ doctorId });
    // console.log(appointments)
    res.json({ success: true, message: appointments });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//api to mark appointment completed for doctor panel
module.exports.appointmentComplete = async (req, res) => {
  try {
    const { doctorId, appointmentId } = req.body;
    const appointmentData = await appointmentModel.findById(appointmentId);
    if (appointmentData && appointmentData.doctorId.toString() === doctorId) {
      await appointmentModel.findByIdAndUpdate(appointmentId, {
        isCompleted: true,
      });
      return res.json({ success: true, message: "Appointment Completed" });
    } else {
      return res.json({ success: false, message: "Mark Failed" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

module.exports.appointmentCancel = async (req, res) => {
  try {
    const { doctorId, appointmentId } = req.body;
    const appointmentData = await appointmentModel.findById(appointmentId);
    if (appointmentData && appointmentData.doctorId.toString() === doctorId) {
      await appointmentModel.findByIdAndUpdate(appointmentId, {
        cancelled: true,
      });
      return res.json({ success: true, message: "Appointment Cancelled" });
    } else {
      return res.json({ success: false, message: "Cancellation Failed" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

module.exports.doctorDashboard = async (req, res) => {
  try {
    const { doctorId } = req.body;
    const appointments = await appointmentModel.find({ doctorId });
    let earnings = 0;
    appointments.map((item) => {
      if (item.isCompleted || item.payment) {
        earnings += item.amount;
      }
    });
    let patients = [];
    appointments.map((item) => {
      if (!patients.includes(item.userId)) {
        patients.push(item.userId);
      }
    });
    const dashData = {
      earnings,
      appointments: appointments.length,
      patients: patients.length,
      latestAppointments: appointments.reverse().slice(0, 5),
    };
    return res.json({ success: true, dashData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

module.exports.doctorProfile = async (req, res) => {
  try {
    const { doctorId } = req.body;
    const profileData = await doctorModel
      .findById(doctorId)
      .select("-password");
    res.json({ success: true, profileData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
module.exports.updateDoctorProfile = async (req, res) => {
  try {
    const { doctorId, fees, address, available } = req.body;
    await doctorModel.findByIdAndUpdate(doctorId, { fees, address, available });
    res.json({ success: true, message: "Profile Updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
