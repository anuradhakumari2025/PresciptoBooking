import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";

const DoctorsList = () => {
  const { adminToken, doctors, getAllDoctors,changeAvailability } = useContext(AdminContext);
  useEffect(() => {
    if (adminToken) {
      getAllDoctors();
    }
  }, [adminToken]);
  return (
    <div className="m-5 max-h-[90vh] overflow-y-scroll">
      <h1 className="font-medium">All Doctors</h1>
      <div className="flex w-full flex-wrap gap-y-6 gap-4 pt-5">
        {doctors.map((doctor, idx) => (
          
          <div className="border border-indigo-200 rounded-xl max-w-56 overflow-hidden cursor-pointer group" key={idx}>
            <img className="bg-indigo-50 group-hover:bg-primary transition-all duration-500" src={doctor.image} />
            <div className="p-4">
              <p className="text-neutral-800 text-lg font-medium">{doctor.name}</p>
              <p className="text-zinc-600 text-sm">{doctor.speciality}</p>
              <div className="flex mt-4 gap-1 text-sm items-center">
              <input onChange={()=>changeAvailability(doctor._id)} type="checkbox" checked={doctor.available} />
              <p>Available</p>
            </div>
            </div>
           
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorsList;
