"use client";
import React, { useState } from "react";
import { useBlogFormContext } from "../../../components/blog-form-context";
import { useContext } from "react";
import { BlogPost } from "../../../components/blogtypes";
import axios from "axios";
import router from "next/router";
import toast from "react-hot-toast";

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
        setTitle("");
        setContent("");
        setImageUrl("");
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
    <form onSubmit={handleSubmit}>
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
    </form>
  );
};

export default BlogForm;
