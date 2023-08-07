"use client";
import axios from "axios";
import { useEffect, useState } from "react";

interface Iblogs {
  title: string;
  description: string;
  image: string;
  author_name: string;
  date: string;
}
function Popularhomeblogs() {
  const [blogData, setBlogData] = useState<Iblogs[]>([]);
  useEffect(() => {
    // Fetching data from json server
    axios
      .get("http://localhost:4000/popular_blogs")
      .then((response) => {
        setBlogData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, []);

  return (
    <div>
      {/* <div className="grid grid-cols-3 gap-4">
        {blogData.map((blog, index) => (
          <div
            key={index}
            className="border-double border-2 bg-red-100 border-indigo-600 w-80 h-80">
            <h2>{blog.title}</h2> <p>{blog.description}</p> <p>{blog.author}</p>
            <p>{blog.date}</p>
          </div>
        ))}
      </div> */}
      <div className="mt-6 ml-2">
        {blogData.map((blog, index) => (
          <div className="flex mb-4" key={index}>
            <div className="w-1/3">
              <img src={blog.image} alt={blog.title} className="w-full" />
            </div>
            <div className="flex flex-col w-2/3 p-4">
              <div className="flex items-center justify-between mb-2">
                <h1 className="text-xl font-bold">{blog.title}</h1>
              </div>
              <p className="text-gray-700 mb-4 line-clamp-8">
                {blog.description}
              </p>
              <div className="text-right text-gray-500">{blog.author_name}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Popularhomeblogs;
