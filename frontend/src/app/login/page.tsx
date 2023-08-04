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
    <form onSubmit={loginUser}>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          className="mt-1 p-1 rounded bg-gray-100 w-full"
          type="text"
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
          // onBlur={validateEmail}
        />
        {/* {emailError && <p>{emailError}</p>} */}
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          className="mt-1 p-1 rounded bg-gray-100 w-full"
          type="password"
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
          // onBlur={validatePassword}
        />
        {/* {passwordError && <p>{passwordError}</p>} */}
      </div>

      <button
        className="w-full mt-2 px-4 py-2 bg-green-700 text-white rounded hover:bg-green-800"
        type="submit">
        Login
      </button>
    </form>
  );
}

export default Login;
