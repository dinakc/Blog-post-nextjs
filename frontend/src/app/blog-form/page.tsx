"use client";
import React, { useState } from "react";
import { useBlogFormContext } from "../../../components/blog-form-context";
import { useContext } from "react";
import { BlogPost } from "../../../components/blogtypes";
import axios from "axios";
import router from "next/router";
import toast from "react-hot-toast";
import { MdLogout } from "react-icons/md";

const BlogForm: React.FC = () => {
  // const [blogPost, setBlogPost] = useContext();
  const { blogPost, setBlogPost } = useBlogFormContext();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBlogPost({ title, content, imageUrl });

    axios
      .post("http://localhost:4000/blogs", blogPost)
      .then((response) => {
        // setBlogData(response.data);
        toast.success("Logged in successfully");
        console.log(response.data);

        // router.push("/postpage");
      })
      .catch((error) => {
        // Display an error toast if the login attempt fails
        toast.error(error.response.data.message);
      })
      .finally(() => {
        // setIsLoggingIn(false); // Finish the login process
      });
    console.log("Blog post submitted:", blogPost);
  };
  console.log(blogPost);

  return (
    <div>
      <div className="bg-gray-100 flex justify-end p-4 text-xl">
        <MdLogout
          className="cursor-pointer"
          onClick={() => {
            localStorage.removeItem("session-token");
          }}
        />
      </div>
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-2xl font-semibold mb-4">Write Your Blog</h1>
          <form>
            <label className="block mb-2 font-medium">Title</label>
            <input
              type="text"
              className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-yellow-500"
              placeholder="Enter blog title"
            />

            <label className="block mb-2 font-medium">Content</label>
            <textarea
              className="w-full p-2 mb-4 border border-gray-300 rounded-md h-40 resize-none focus:outline-none focus:border-yellow-500"
              placeholder="Write your blog content here"></textarea>
            <label className="block mb-2 font-medium">Title</label>
            <input
              type="text"
              className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-yellow-500"
              placeholder="Enter image Url"
            />

            <button
              type="submit"
              className="w-full bg-yellow-600 text-white py-2 px-4 rounded-md hover:bg-yellow-800 focus:outline-none focus:ring focus:ring-yellow-300">
              Publish
            </button>
          </form>
        </div>
      </div>

      {/* <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <br />

        <label htmlFor="content">Content:</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={4}
          cols={50}
          required
        />
        <br />

        <label htmlFor="imageUrl">Image URL:</label>
        <input
          type="url"
          id="imageUrl"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
        <br />
        <button type="submit">Post Blog</button>
      </form> */}
    </div>
  );
};

export default BlogForm;
