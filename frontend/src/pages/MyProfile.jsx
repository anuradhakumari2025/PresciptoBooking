import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets.js"; // Make sure this path is correct
import axios from "axios";
import { toast } from "react-toastify";

const MyProfile = () => {
  const { userData, setUserData, backendUrl, token, loadUserProfileData } = useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(false);
  const [loading, setLoading] = useState(false);

  const updateUserProfileData = async () => {
    try {
      setLoading(true); // Start loader
      const formData = new FormData();
      formData.append("name", userData.name);
      formData.append("phone", userData.phone);
      formData.append("address", JSON.stringify(userData.address));
      formData.append("gender", userData.gender);
      formData.append("dob", userData.dob);
      if (image) formData.append("image", image);

      const { data } = await axios.post(backendUrl + "/api/user/update-profile", formData, { headers: { token } });

      if (data.success) {
        toast.success(data.message);
        await loadUserProfileData();
        setImage(false);
        setIsEdit(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false); // Stop loader
    }
  };

  return (
    userData && (
      <div className="max-w-lg flex flex-col gap-2 text-sm">
        {loading && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
            <div className="w-12 h-12 border-4 border-t-blue-500 border-gray-300 rounded-full animate-spin"></div>
          </div>
        )}

        {isEdit ? (
          <label htmlFor="image">
            <div className="inline-block relative cursor-pointer">
              <img
                className="w-36 rounded opacity-75"
                src={image ? URL.createObjectURL(image) : userData.image}
                alt=""
              />
              <img
                className="w-10 absolute bottom-20 right-12"
                src={image ? "" : assets.upload_icon}
                alt=""
              />
            </div>
            <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden />
          </label>
        ) : (
          <img className="w-36 rounded" src={userData.image} alt="" />
        )}

        {isEdit ? (
          <input
            className="bg-gray-200 text-2xl px-2 py-1 mb-2 outline-none font-medium max-w-60 mt-4 rounded"
            type="text"
            value={userData.name}
            onChange={(e) =>
              setUserData((prev) => ({ ...prev, name: e.target.value }))
            }
          />
        ) : (
          <p className="font-medium text-2xl text-neutral-800 rounded mt-4">{userData.name}</p>
        )}

        <hr className="bg-zinc-400 h-[1px] border-none w-[60%]" />
        <div>
          <p className="text-neutral-500 underline my-4 font-semibold text-lg">Contact Information</p>
          <div className="grid grid-cols-[1fr_3fr] gap-y-4 mt-3 text-neutral-700">
            <p className="font-medium">Email Id:</p>
            <p className="text-blue-500">{userData.email}</p>
            <p className="font-medium">Phone:</p>
            {isEdit ? (
              <input
                className="bg-gray-200 max-w-52 px-2 py-1 rounded outline-none"
                type="text"
                value={userData.phone}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, phone: e.target.value }))
                }
              />
            ) : (
              <p className="text-blue-400">{userData.phone}</p>
            )}
            <p className="font-medium">Address:</p>
            {isEdit ? (
              <p>
                <input
                  className="bg-gray-200 px-2 py-1 mb-2 rounded outline-none"
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      address: { ...prev.address, line1: e.target.value },
                    }))
                  }
                  value={userData.address.line1}
                  type="text"
                />
                <br />
                <input
                  className="bg-gray-200 px-2 py-1 rounded outline-none"
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      address: { ...prev.address, line2: e.target.value },
                    }))
                  }
                  value={userData.address.line2}
                  type="text"
                />
              </p>
            ) : (
              <p className="text-gray-500">
                {userData.address.line1}
                <br />
                {userData.address.line2}
              </p>
            )}
          </div>
        </div>

        <div>
          <p className="text-neutral-500 underline font-semibold text-lg my-4">Basic Information</p>
          <div className="grid grid-cols-[1fr_3fr] gap-y-4 mt-3 text-neutral-700">
            <p className="font-medium">Gender:</p>
            {isEdit ? (
              <select
                className="max-w-32 rounded bg-gray-200 px-2 py-1 outline-none"
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, gender: e.target.value }))
                }
                value={userData.gender}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            ) : (
              <p className="text-gray-400">{userData.gender}</p>
            )}
            <p className="font-medium">Birthday:</p>
            {isEdit ? (
              <input
                className="max-w-32 rounded bg-gray-200 px-2 py-1 outline-none"
                type="date"
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, dob: e.target.value }))
                }
                value={userData.dob}
              />
            ) : (
              <p className="text-gray-400">{userData.dob}</p>
            )}
          </div>
        </div>

        <div className="mt-10">
          {isEdit ? (
            <button
              className="border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all "
              onClick={updateUserProfileData}
            >
              Save Information
            </button>
          ) : (
            <button
              className="border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all"
              onClick={() => setIsEdit(true)}
            >
              Edit
            </button>
          )}
        </div>
      </div>
    )
  );
};

export default MyProfile;