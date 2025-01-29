import React, { createContext } from "react";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const DoctorContext = createContext();

const DoctorContextProvider = ({ children }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [doctorToken, setDoctorToken] = useState(
    localStorage.getItem("doctorToken")
      ? localStorage.getItem("doctorToken")
      : ""
  );
  const [appointments, setAppointments] = useState([]);
  const [dashData, setDashData] = useState(false);
  const [profileData, setProfileData] = useState(false);
  const getAppointments = async () => {
    try {
      const { data } = await axios.get(
        backendUrl + "/api/doctor/appointments",
        {
          headers: { doctorToken },
        }
      );
      // console.log(data);
      if (data.success) {
        const appointments = Array.isArray(data.message) ? data.message : [];
        setAppointments(appointments.reverse());
        // console.log(appointments.reverse());
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  const completeAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/doctor/complete-appointment",
        { appointmentId },
        { headers: { doctorToken } }
      );
      if (data.success) {
        toast.success(data.message);
        getAppointments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };
  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/doctor/cancel-appointment",
        { appointmentId },
        { headers: { doctorToken } }
      );
      if (data.success) {
        toast.success(data.message);
        getAppointments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };
  const getDashData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/doctor/dashboard", {
        headers: { doctorToken },
      });
      if (data.success) {
        setDashData(data.dashData);
        // console.log(data.dashData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const getProfile = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/doctor/profile", {
        headers: { doctorToken },
      });
      if (data.success) {
        setProfileData(data.profileData);
        // console.log(data.profileData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  
  const value = {
    backendUrl,
    doctorToken,
    setDoctorToken,
    setAppointments,
    appointments,
    getAppointments,
    cancelAppointment,
    completeAppointment,
    getDashData,
    dashData,
    setDashData,
    setProfileData,
    profileData,
    getProfile,
  };

  return (
    <DoctorContext.Provider value={value}>{children}</DoctorContext.Provider>
  );
};

export default DoctorContextProvider;
