import React, {useState, useEffect} from "react";
import { useLocation } from "react-router-dom";

import Card from "./Card";
import Loading from "../Loading";
import { useHttpClient } from "../../hooks/http-hook";
import { Pagination } from "@mui/material";

import "./SomethingRelated.css";

const SomethingRelated = props => {
  const articlesPerPage = 5;
  const {name, category} = props;
  const location = useLocation();
  const [loadedArticles, setloadedArticles] = useState();
  const {isLoading, sendRequest, error} = useHttpClient();
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(1);
  const [max, setMax] = useState(0);

  const pageHandler = async (event, value) => {
    setPage(value);
    if (value > max) {
      try {
        const responseData = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/${name}/${category}?page=${value}`);
        if (name === "portfolio"){
          setloadedArticles(responseData.portfolios);
        } else {
          setloadedArticles(responseData.blogs);
        }
      }catch(err) { 
        console.log(error);
      }
      setMax(value);
    }
    window.scrollTo(0, 0);
  }

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setloadedArticles(null);
        setMax(1);
        const responseData = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/${name}/${category}?page=${page}`);
        if (name === "portfolio"){
          setloadedArticles(responseData.portfolios);
          setCount(Math.ceil(Number(responseData.numOfDocuments) / articlesPerPage ))
        } else {
          setloadedArticles(responseData.blogs);
          setCount(Math.ceil(Number(responseData.numOfDocuments) / articlesPerPage ));
        }
      }catch(err) {
        setCount(1);
        console.log(error);
      }
    }
    window.scrollTo(0, 0)
    fetchBlogs();
  },[name, category])

  return (
    <>
      {isLoading && (
        <div className = "center">
          <Loading />
        </div>
      )}
       {!isLoading && loadedArticles && loadedArticles.map((article, index) => {
        if(Math.floor(index / articlesPerPage) === page - 1) {
         return(
           <Card 
           cardpic = {article.cardpic}
           alt = ""
           title = {article.title}
           shortDescription = {article.shortDescription}
           to = {location.pathname + "/" + article.id}
           key = {article.id}
           createdAt = {article.createdAt}
           />
           )}
      })} 
      {!isLoading && !loadedArticles && <h2 className = "no-articles">Nothing to see yet.</h2>} 
      {count !== 1 && (
       <Pagination className = "pagination" count={count} page = {page} onChange = {pageHandler} variant="outlined" color="primary" />
      )}
    </>
  )
} 

export default SomethingRelated;