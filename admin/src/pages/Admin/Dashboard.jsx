import React from "react";
import { useContext } from "react";
import { AdminContext } from "../../context/AdminContext";
import { useEffect } from "react";
import { assets } from "../../assets/assets";
import { AppContext } from "../../context/AppContext";

const Dashboard = () => {
  const { adminToken, dashData, getDashData, cancelAppointment } =
    useContext(AdminContext);
  const { slotDateFormat } = useContext(AppContext);
  useEffect(() => {
    if (adminToken) {
      getDashData();
    }
  }, [adminToken]);
  return (
    dashData && (
      <div className="m-5">
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center min-w-52 bg-white gap-2 rounded border-2 border-gray-200 cursor-pointer hover:scale-105 transition-all ">
            <img className="w-14" src={assets.doctor_icon} alt="" />
            <div>
              <p className="text-xl font-semibold text-gray-600">
                {dashData.doctors}
              </p>
              <p className="text-gray-400">Doctors</p>
            </div>
          </div>
          <div className="flex items-center min-w-52 bg-white gap-2 rounded border-2 border-gray-200 cursor-pointer hover:scale-105 transition-all ">
            <img className="w-14" src={assets.appointments_icon} alt="" />
            <div>
              <p className="text-xl font-semibold text-gray-600">
                {dashData.appointments}
              </p>
              <p className="text-gray-400">Appointments</p>
            </div>
          </div>
          <div className="flex items-center min-w-52 bg-white gap-2 rounded border-2 border-gray-200 cursor-pointer hover:scale-105 transition-all ">
            <img className="w-14" src={assets.patients_icon} alt="" />
            <div>
              <p className="text-xl font-semibold text-gray-600">
                {dashData.patients}
              </p>
              <p className="text-gray-400">Patients</p>
            </div>
          </div>
        </div>
        <div className="bg-white">
          <div className="flex items-center gap-2.5 p-4  mt-10 rounded-t border">
            <img src={assets.list_icon} alt="" />
            <p className="font-semibold">Latest Booking</p>
          </div>
          <div className="border border-t-0 pt-4">
            {dashData.latestAppointment.map((latest, index) => (
              <div
                className="flex items-center px-6 py-3 gap-3 hover:bg-gray-100"
                key={index}
              >
                <img
                  className="w-10 rounded-full"
                  src={latest.doctorData.image}
                  alt=""
                />
                <div className="flex-1 text-sm">
                  <p className="text-gray-800 font-medium">
                    {latest.doctorData.name}
                  </p>
                  <p className="text-gray-600">
                    {slotDateFormat(latest.slotDate)}
                  </p>
                </div>
                {latest.cancelled ? (
                  <p className="font-medium text-xs text-red-500">Cancelled</p>
                ) : latest.isCompleted ? (
                  <p className="font-medium text-xs text-green-500">
                    Completed
                  </p>
                ) : (
                  <img
                    onClick={() => cancelAppointment(latest._id)}
                    className="w-10 cursor-pointer"
                    src={assets.cancel_icon}
                    alt=""
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  );
};

export default Dashboard;
