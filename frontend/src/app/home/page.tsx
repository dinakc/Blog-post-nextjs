"use client";
import React from "react";
import Popularhomeblogs from "../../../components/popularhomeblogs";
import { useRouter } from "next/navigation";
function Homeblogs() {
  const router = useRouter();
  function goBlog() {
    router.push("/blog-form");
  }
  return (
    <>
      <div className=" h-full bg-yellow-300 flex flex-col align-center justify-around p-5 h-96">
        <h1 className="text-7xl "> Happy Blogging</h1>
        <h3 className=" text-2xl">
          A safe create space for our beloved bloggers for creating unique blogs
          <h3 className=" text-2xl">
            {" "}
            by sharing your own thoughts, imagination and ideas.
          </h3>
        </h3>
        <button
          onClick={goBlog}
          className="box-border text-white bg-slate-900 w-60 h-14 rounded-lg">
          Create your own Blogs!
        </button>
      </div>
      <Popularhomeblogs />
    </>
  );
}

export default Homeblogs;
