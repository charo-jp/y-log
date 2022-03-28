import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import GoBack from "../../../shared/components/UIElements/GoBack";
import MarkDown from "../../../shared/components/MarkDown";
import Loading from "../../../shared/components/Loading";
import { BsFillAlarmFill } from "react-icons/bs";

import "./BlogArticle.css";
import "github-markdown-css";
const BlogArticle = () => {
  const id = useParams().blogId;
  const [loadedArticle, setLoadedArticle] = useState();
  const [isLoading, setIsLoading] = useState();

  useEffect(() => {
    const sendRequest = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/blog/${id}`);

        const responseData = await response.json();

        if (!response.ok) {
          throw new Error(responseData.message);
        }

        setLoadedArticle(responseData.blog);
      setIsLoading(false);
      } catch(err) {
        console.log(err);
      }
      setIsLoading(false);
    }
    window.scrollTo(0, 0)
    sendRequest();
  }, []);

  return (
    <div className = "blog-article">
      {isLoading && (
        <div className = "center">
          <Loading />
        </div>
      )}
      {!isLoading && loadedArticle && (
      <>
      <GoBack to = {`/blog/${loadedArticle.category}`} />
        <div className = "article-detail-header">
          <div className = "inner-header">
            <h2 className = "article-detail-title">{loadedArticle.title}</h2>
            <p className = "createdAt"> {loadedArticle.createdAt} | <BsFillAlarmFill className = "clock"/>{loadedArticle.minRead} min read</p>
          </div>
        </div>
        <div className = "markdown-container">
          <MarkDown markdown = {loadedArticle.markdown} cName = "markdown-display"/>
        </div>
      </>
      )}
    </div>
  )
};

export default BlogArticle;