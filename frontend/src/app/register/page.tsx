"use client";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [registrationError, setRegistrationError] = useState("");

  const router = useRouter();
  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError("");
    }
  };

  const validatePassword = () => {
    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters long.");
    } else {
      setPasswordError("");
    }
  };

  function registerUser(e) {
    e.preventDefault();

    axios
      .post("http://localhost:4000/users", {
        email,
        password,
      })
      .then((response) => {
        console.log(response);
        localStorage.setItem("token", response.data.accessToken);
        console.log(response.data.accessToken);

        router.push("/login");
      })
      .catch((e) => {
        toast.error(e.response.data);
      });
  }

  return (
    // <div>
    //   <form onSubmit={registerUser}>
    //     <div className="mb-4">
    //       <label className="block text-sm font-medium text-gray-700">
    //         Email
    //       </label>
    //       <input
    //         className="mt-1 p-1 rounded bg-gray-100 w-full"
    //         type="text"
    //         placeholder="Enter your email"
    //         onChange={(e) => setEmail(e.target.value)}
    //         onBlur={validateEmail}
    //       />
    //       {emailError && <p>{emailError}</p>}
    //     </div>
    //     <div className="mb-4">
    //       <label className="block text-sm font-medium text-gray-700">
    //         Password
    //       </label>
    //       <input
    //         className="mt-1 p-1 rounded bg-gray-100 w-full"
    //         type="password"
    //         placeholder="Enter your password"
    //         onChange={(e) => setPassword(e.target.value)}
    //         onBlur={validatePassword}
    //       />
    //       {passwordError && <p>{passwordError}</p>}
    //     </div>
    //     <div className="mb-4">
    //       <label className="block text-sm font-medium text-gray-700">
    //         Password
    //       </label>
    //       <input
    //         className="mt-1 p-1 rounded bg-gray-100 w-full"
    //         type="password"
    //         placeholder="Enter your password"
    //         onChange={(e) => setConfirmPassword(e.target.value)}
    //       />
    //     </div>
    //     <button
    //       className="w-full mt-2 px-4 py-2 bg-green-700 text-white rounded hover:bg-green-800"
    //       type="submit">
    //       Register
    //     </button>
    //   </form>
    // </div>
    <div
      className="w-full min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative"
      style={{
        background:
          "url('https://images.unsplash.com/photo-1512389098783-66b81f86e199?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=914&q=80')",
        backgroundSize: "100% 100%",
        backgroundPosition: "center",
      }}>
      <div className="bg-white bg-opacity-50 backdrop-blur-lg rounded-lg px-8 py-6 shadow-md max-w-md w-full">
        <form onSubmit={registerUser}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              className="mt-1 p-2 border-b-2 border-yellow-800 bg-transparent w-full"
              type="text"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              onBlur={validateEmail}
            />
            {emailError && <p className="text-red-500">{emailError}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              className="mt-1 p-2 border-b-2 border-yellow-800 bg-transparent w-full"
              type="password"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              onBlur={validatePassword}
            />
            {passwordError && <p className="text-red-500">{passwordError}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              className="mt-1 p-2 border-b-2 border-yellow-800 bg-transparent w-full"
              type="password"
              placeholder="Confirm your password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button
            className="w-full mt-2 px-4 py-2 bg-yellow-700 text-white rounded hover:bg-yellow-800 focus:outline-none focus:ring focus:border-blue-300"
            type="submit">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
