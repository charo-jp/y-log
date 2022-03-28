import React from "react";

import MainBlog from "../components/MainBlog";

import "./Blog.css";
const Blog = () => {
  return (
  <React.Fragment>
    <h2 className="blog-title">Blog</h2>
    <MainBlog />
  </React.Fragment>
  );
}

export default Blog;