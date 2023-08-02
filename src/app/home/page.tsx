import React from "react";

function Homeblogs() {
  return (
    <div className=" h-96 bg-yellow-300 flex flex-col align-center justify-around">
      <h1 className="text-7xl "> Happy Blogging</h1>
      <h3 className=" text-2xl">
        A safe create space for our beloved bloggers for creating unique blogs
        <h3 className=" text-2xl">
          {" "}
          by sharing your own thoughts, imagination and ideas.
        </h3>
      </h3>
      <button className="box-border text-white bg-slate-900 w-60 h-14 rounded-lg">
        {" "}
        Create your own Blogs!
      </button>
    </div>
  );
}

export default Homeblogs;
