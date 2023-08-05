"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface IUserData {
  email: string;
  password: string;
  id: number;
}

function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [blogData, setBlogData] = useState<IUserData[]>([]);

  function loginUser(e) {
    e.preventDefault();

    if (!email) {
      toast.error("Please Enter Email");
      return;
    }
    if (!password) {
      toast.error("Please Enter Password");
      return;
    }

    axios
      .post("http://localhost:4000/login", { email, password })
      .then((response) => {
        // setBlogData(response.data);
        toast.success("Logged in successfully");
        setEmail("");
        setPassword("");
        console.log(response.data);

        // Saving the token in localstorage
        localStorage.setItem("session-token", response.data.accessToken);

        // Redirect to addblog after successful login
        router.push("/postpage");
      })
      .catch((error) => {
        // Display an error toast if the login attempt fails
        toast.error(error.response.data.message);
      })
      .finally(() => {
        setIsLoggingIn(false); // Finish the login process
      });
  }

  return (
    <div
      className="w-full min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative"
      style={{
        background:
          "url('https://images.unsplash.com/photo-1512389098783-66b81f86e199?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=914&q=80')",
        backgroundSize: "100% 100%",
        backgroundPosition: "center",
      }}>
      <div className="bg-white bg-opacity-50 backdrop-blur-lg rounded-lg px-8 py-6 shadow-md max-w-md w-full">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            className="mt-1 p-2 border-b-2 border-yellow-800 bg-transparent w-full "
            type="text"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
          />
          {/* {emailError && <p>{emailError}</p>} */}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            className="mt-1 p-2 border-b-2 border-yellow-800 bg-transparent w-full focus:outline-none focus:ring focus:border-blue-300"
            type="password"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
          />
          {/* {passwordError && <p>{passwordError}</p>} */}
        </div>

        <button
          className="w-full mt-2 px-4 py-2 bg-yellow-700 text-white rounded hover:bg-yellow-800 focus:outline-none focus:ring focus:border-blue-300"
          onClick={loginUser}>
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;
