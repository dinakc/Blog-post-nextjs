"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";

interface Iblogs {
  id: number;
  title: string;
  description: string;
  img_url: string;
  author: string;
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
      <h1 className="text-2xl text-center underline underline-offset-8">
        Our Popular Blogs
      </h1>

      <div className="grid grid-cols-3 gap-4">
        {blogData.map((blog) => (
          <Link
            href={`/home/${blog.id}`}
            as={`/home/${blog.id}`}
            key={`div_${blog.id}`}
          >
            <div className="border-double border-2 border-indigo-600 w-80 h-80 bg-blue-600">
              <h2>{blog.title}</h2>
              <p>{blog.id}</p>
              <div>
                {" "}
                <img src={blog.img_url} />
              </div>

              <p>{blog.description}</p>

              <p>{blog.author}</p>

              <p>{blog.date}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Popularhomeblogs;
