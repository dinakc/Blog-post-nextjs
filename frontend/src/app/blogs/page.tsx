"use client";
import React, { useEffect, useState } from "react";
import { BlogPost } from "../../../components/blogtypes";
import axios from "axios";
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import SearchBar from "../../../components/searchbar";

function Blogs() {
  const [blogData, setBlogData] = useState<BlogPost[]>([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentBlog, setCurrentBlog] = useState(null);
  const [filteredBlogs, setFilteredBlogs] = useState([]);

  const searchBlogs = async (query) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/blogs?q=${query}`
      );
      setFilteredBlogs(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const editBlog = (blog) => {
    setCurrentBlog(blog);
    setIsEditModalOpen(true);
  };

  function deleteBlog(id) {
    axios
      .delete(`http://localhost:4000/blogs/${id}`)
      .then((response) => {
        setBlogData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }
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
      <SearchBar onSearch={searchBlogs} />
      <div className="mt-6 ml-2">
        {filteredBlogs.map((blog, index) => (
          <div className="flex mb-4" key={index}>
            <div className="w-1/3">
              <img src={blog.imageUrl} alt={blog.title} className="w-full" />
            </div>
            <div className="flex flex-col w-2/3 p-4">
              <div className="flex items-center justify-between mb-2">
                <h1 className="text-xl font-bold">{blog.title}</h1>
              </div>
              <p className="text-gray-700 mb-4 line-clamp-8">{blog.content}</p>
              <div className="text-right text-gray-500">{blog.author}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 ml-2">
        {blogData.map((blog, index) => (
          <div className="flex mb-4" key={index}>
            <div className="w-1/3">
              <img src={blog.imageUrl} alt={blog.title} className="w-full" />
            </div>
            <div className="flex flex-col w-2/3 p-4">
              <div className="flex items-center justify-between mb-2">
                <h1 className="text-xl font-bold">{blog.title}</h1>
                <div className="flex space-x-2">
                  <FaEdit
                    onClick={editBlog}
                    className="text-blue-500 cursor-pointer"
                  />
                  <FaTrash
                    onClick={() => deleteBlog(blog.id)}
                    className="text-red-500 cursor-pointer"
                  />
                </div>
              </div>
              <p className="text-gray-700 mb-4 line-clamp-8">{blog.content}</p>
              <div className="text-right text-gray-500">{blog.author}</div>
            </div>
          </div>
        ))}
      </div>
      {isEditModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Edit Blog</h2>
            {currentBlog && (
              <form>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Title
                  </label>
                  <input
                    className="mt-1 p-2 border-b-2 border-yellow-800 bg-transparent w-full"
                    type="text"
                    value={currentBlog.title}
                    onChange={(e) =>
                      setCurrentBlog({ ...currentBlog, title: e.target.value })
                    }
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Content
                  </label>
                  <textarea
                    className="mt-1 p-2 border-b-2 border-yellow-800 bg-transparent w-full"
                    rows="4"
                    value={currentBlog.content}
                    onChange={(e) =>
                      setCurrentBlog({
                        ...currentBlog,
                        content: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="mt-4 flex justify-end">
                  <button
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    onClick={() => {
                      // Update the blog on the server
                      axios
                        .put(
                          `http://localhost:4000/blogs/${currentBlog.id}`,
                          currentBlog
                        )
                        .then((response) => {
                          // Update local state with edited blog
                          const updatedBlogs = blogData.map((blog) =>
                            blog.id === currentBlog.id ? currentBlog : blog
                          );
                          setBlogData(updatedBlogs); // This line should update the local state
                          setIsEditModalOpen(false);
                        })
                        .catch((error) => {
                          console.log("error", error);
                        });
                    }}>
                    Save
                  </button>
                  <button
                    className="ml-2 px-4 py-2 border border-gray-300 rounded hover:border-gray-400"
                    onClick={() => setIsEditModalOpen(false)}>
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Blogs;
