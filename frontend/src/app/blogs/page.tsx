"use client";
import React, { useEffect, useState } from "react";
import { BlogPost } from "../../../components/blogtypes";
import axios from "axios";

function Blogs() {
  const [blogData, setBlogData] = useState<BlogPost[]>([]);
  useEffect(() => {
    // Fetching data from json server
    axios
      .get("http://localhost:4000/blogs")
      .then((response) => {
        setBlogData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, []);
  return (
    <>
      <div className="mt-6">
        {blogData.map((blog, index) => (
          <div className="flex" key={index}>
            <div className="w-1/3">
              <img src={blog.imageUrl} alt={blog.title} className="w-full" />
            </div>
            <div className="flex flex-col w-2/3 p-4">
              <h1 className="text-xl font-bold mb-2">{blog.title}</h1>
              <p className="text-gray-700 mb-4">{blog.content}</p>
              <div className="text-right text-gray-500">{blog.author}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Blogs;
