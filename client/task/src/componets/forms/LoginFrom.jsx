import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginData } from "../../api/api";
import toast, { Toaster } from "react-hot-toast";
import lganime from "../../assets/login.mp4";

function LoginForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmedEmail = formData.email.trim();
    const trimmedPassword = formData.password.trim();
    if (!trimmedEmail || !trimmedPassword) {
      toast.error("All fields are required");
      return;
    }
    if (!validateEmail(trimmedEmail)) {
      toast.error("Invalid email address");
      return;
    }
    try {
      const userData = await LoginData({
        formData,
      });
      toast(userData.alert);
      localStorage.setItem("token", userData.token);
      if (userData.status && userData.token) {
        navigate("/");
      }
    } catch (error) {
      console.error("Error during login:", error);
      toast.error("Login failed. Please try again.");
    }
  };

  return (
    <div className="w-full h-screen flex flex-row items-start justify-start">
      <h1 className="absolute font-extrabold p-6 text-4xl text-white">
        Connections
      </h1>
      <video
        src={lganime}
        loop
        autoPlay
        muted
        className="w-[35%] h-full object-cover hidden md:block"
      ></video>
      <div className="w-full mt-[4rem]">
        <div className="flex flex-col gap-6">
          <h1 className="text-black text-2xl font-bold ml-[10rem]">
            Sign in to Connections
          </h1>

          <span className="flex flex-row items-center ml-[10rem]">
            <div className="w-24 border-b-2 border-gray-200"></div>
            <span className="px-4 text-gray-500">or sign in with email</span>
            <div className="w-24 border-b-2 border-gray-200"></div>
          </span>
          <div className="flex flex-col ml-[10rem] gap-2 ">
            <label htmlFor="email" className="font-semibold">
              Email
            </label>
            <input
              id="email"
              value={formData.email}
              onChange={handleChange}
              type="text"
              className="border-2 border-gray-200 w-[22rem] justify-center p-3 rounded-xl"
            />
            <label htmlFor="password" className="font-semibold">
              Password
            </label>
            <input
              id="password"
              value={formData.password}
              onChange={handleChange}
              type="password"
              className="border-2 border-gray-200 w-[22rem] justify-center p-3 rounded-xl"
            />
          </div>
          <div className="flex items-center gap-2 ml-[10rem] bg-[#82c0cc] border-2 hover:border-gray-500 w-[22rem] justify-center p-2 rounded-full">
            <button
              className="w-[22rem] justify-center p-3 rounded-xl text-white font-bold"
              onClick={handleSubmit}
            >
              Sign Up
            </button>
          </div>
          <span className="ml-[14rem]">
            Don't have an account?{" "}
            <button className="underline" onClick={() => navigate("/register")}>
              Sign Up
            </button>
          </span>
        </div>
      </div>
      <Toaster />
    </div>
  );
}

export default LoginForm;
