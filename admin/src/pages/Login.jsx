import React from "react";
import { useState } from "react";
import { AdminContext } from "../context/AdminContext";
import { useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate} from 'react-router-dom'
import { DoctorContext } from "../context/DoctorContext.jsx";

function Login() {
  const [state, setState] = useState("Admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setAdminToken, backendUrl } = useContext(AdminContext);
  const { doctorToken,setDoctorToken } = useContext(DoctorContext);
const navigate = useNavigate()
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (state === "Admin") {
        const { data } = await axios.post(backendUrl + "/api/admin/login", {
          email,
          password,
        });
        // console.log(data)
        if (data.success) {
          // console.log(data.token)
          localStorage.setItem("adminToken", data.token);
          setAdminToken(data.token);
          navigate("/admin-dashboard")
          toast.success("Login Successfully!🙂", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(backendUrl + "/api/doctor/login", {
          email,
          password,
        });
        if (data.success) {
          toast.success("Login Successfully");
          localStorage.setItem("doctorToken", data.token);
          setDoctorToken(data.token);
          navigate('/doctor-dashboard')
          // console.log(data.token)
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {}
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="min-h-[80vh] flex items-center"
      action=""
    >
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5e5e5e] text-sm shadow-lg">
        <p className="text-2xl font-semibold m-auto">
          <span className="text-primary"> {state} </span> Login
        </p>
        <div className="w-full">
          <p>Email</p>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="border border-[#DADADA] rounded w-full p-2 mt-1"
            type="email"
            required
          />
        </div>
        <div className="w-full">
          <p>Password</p>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="border border-[#DADADA] rounded w-full p-2 mt-1"
            type="password"
            required
          />
        </div>
        <button className="bg-primary text-white w-full py-2 rounded-md text-base">
          Login
        </button>
        {state === "Admin" ? (
          <p>
            Doctor Login ?
            <span
              className="text-primary underline cursor-pointer"
              onClick={() => setState("Doctor")}
            >
              Click Here
            </span>
          </p>
        ) : (
          <p>
            Admin Login ?
            <span
              className="text-primary underline cursor-pointer"
              onClick={() => setState("Admin")}
            >
              Click Here
            </span>
          </p>
        )}
      </div>
    </form>
  );
}

export default Login;
