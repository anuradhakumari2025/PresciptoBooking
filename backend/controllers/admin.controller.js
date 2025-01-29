const validator = require("validator");
const bcrypt = require("bcrypt");
const { v2: cloudinary } = require("cloudinary");
const doctorModel = require("../models/doctor.model");
const jwt = require("jsonwebtoken");
const appointmentModel = require("../models/appointment.model");
const userModel = require("../models/user.model");

//api for adding doctor
module.exports.addDoctor = async (req, res, next) => {
  try {
    const {
      name,
      email,
      password,
      experience,
      about,
      fees,
      speciality,
      degree,
      address,
    } = req.body;
    const imageFile = req.file;
    // console.log({name,email,password,experience,about,fees,speciality,degree,address},imageFile)
    if (
      !name ||
      !email ||
      !password ||
      !experience ||
      !about ||
      !speciality ||
      !degree ||
      !fees ||
      !address
    ) {
      return res.json({ success: false, message: "Missing some credentials" });
    }
    //validating email
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Invalid email" });
    }
    //vlaidating password
    if (password.length < 6) {
      return res.json({
        success: false,
        message:
          "Please enter strong password and length must be atleast 6 character",
      });
    }
    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //upload image to cloudinary
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });
    const imageUrl = await imageUpload.secure_url;

    const doctorData = {
      name,
      password: hashedPassword,
      email,
      experience,
      image: imageUrl,
      about,
      fees,
      speciality,
      degree,
      address: JSON.parse(address),
      date: Date.now(),
    };

    const newDoctor = new doctorModel(doctorData);
    await newDoctor.save();
    res.json({ success: true, message: "Doctor added" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

module.exports.adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//api to get all doctor list for admin panel
module.exports.allDoctors = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select("-password");
    res.json({ success: true, doctors });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//api to get all appointment list
module.exports.appointmentsAdmin = async(req,res) =>{
  try {
    const appointments = await appointmentModel.find({}).populate("userId")
    .populate("doctorId");
    res.json({success:true,appointments})
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}

//api for appointment cancelled
module.exports.appointmentCancelled = async(req,res) =>{
  try {
    const {appointmentId} = req.body;
    const appointmentData = await appointmentModel.findById(appointmentId)
    
    await appointmentModel.findByIdAndUpdate(appointmentId,{cancelled:true})
    //releasing doctor slot
    const {doctorId,slotDate,slotTime} = appointmentData;
    const doctorData = await doctorModel.findById(doctorId)
    let slots_booked = doctorData.slots_booked
    slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime)
    await doctorModel.findByIdAndUpdate(doctorId,{slots_booked})
    return res.json({success:true,message:"Appointment Cancelled"})
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}

//api to get dashboardPanel for admin
module.exports.adminDashboard = async(req,res)=>{
  try {
    const doctors = await doctorModel.find({})
    const users = await userModel.find({})
    const appointments = await appointmentModel.find({})
    const dashData = {
      doctors:doctors.length,
      appointments:appointments.length,
      patients:users.length,
      latestAppointment:appointments.reverse().slice(0,5)
    }
    res.json({success:true,dashData})
  } catch (error) {
    console.log(error)
    res.json({success:false,message:error.message})
  }
}