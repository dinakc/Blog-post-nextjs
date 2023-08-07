"use client";
import { Elsie } from "next/font/google";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BsPerson } from "react-icons/bs";
// import DropMenu from "./drop-catgory";

function Navbar() {
  const router = useRouter();
  const token = localStorage.getItem("session-token");
  function checkBlog() {
    if (!token) {
      router.push("/register");
    } else {
      router.push("/blogs");
    }
  }
  function checkLogin() {
    if (!token) {
      router.push("/register");
    } else {
      router.push("/blog-form");
    }
  }

  return (
    <div className="relative  ">
      <div className="flex flex-row justify-around items-center bg-slate-900 py-2 text-white h-20">
        <Link href="/home">Home</Link>
        <div onClick={checkBlog}>Blogs</div>
        {/* <Link href="/blogs">Blogs</Link> */}
        <Link href="/about">About Us</Link>

        <BsPerson onClick={checkLogin} />
      </div>
    </div>
  );
}

export default Navbar;
