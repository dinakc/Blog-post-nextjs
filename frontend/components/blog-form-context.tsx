"use client";
import React, {
  createContext,
  useContext,
  SetStateAction,
  Dispatch,
  useState,
} from "react";
import { BlogFormContextValue, BlogPost } from "./blogtypes";

const BlogFormContext = createContext<BlogFormContextValue | undefined>(
  undefined
);

export const BlogFormProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [blogPost, setBlogPost] = useState<BlogPost>({
    author: "",
    title: "",
    content: "",
    imageUrl: "",
    date: "",
  });

  return (
    <BlogFormContext.Provider value={{ blogPost, setBlogPost }}>
      {children}
    </BlogFormContext.Provider>
  );
};

export const useBlogFormContext = () => useContext(BlogFormContext);
