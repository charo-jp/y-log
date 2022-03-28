import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import GoBack from "../../../shared/components/UIElements/GoBack";
import Loading from "../../../shared/components/Loading";
import MarkDown from "../../../shared/components/MarkDown";

import "./PortfolioArticle.css";
import "github-markdown-css";


const PortfolioArticle = () => {
  const id = useParams().webId;
  const [loadedPortfolio, setLoadedPortfolio] = useState();
  const [isLoading, setIsLoading] = useState();

  useEffect(() => {
    const sendRequest = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/portfolio/${id}`);

        const responseData = await response.json();

        if (!response.ok) {
          throw new Error(responseData.message);
        }

        setLoadedPortfolio(responseData.portfolio);
      setIsLoading(false);
      } catch(err) {
        console.log(err);
      }
      setIsLoading(false);
    }
    window.scrollTo(0, 0);
    sendRequest();
  }, []);



  return (
  <div className = "article-detail-container">
    {isLoading && (
      <div className = "center">
          <Loading />
        </div>
      )}
    {!isLoading && loadedPortfolio && (
      <>
        <GoBack to = {`/portfolio/${loadedPortfolio.category}`}/>
        <div className = "article-detail-header">
          <div className = "inner-header article-detail-left">
            <h2 className = "article-detail-title">{loadedPortfolio.title}</h2>
            <p className = "createdAt"> {loadedPortfolio.createdAt}</p>
          </div>
          <div className = "inner-header article-detail-right">
            <p className = "short-description">{loadedPortfolio.shortDescription}</p>
            <div className = "external-buttons">
              <a className = "external-link" href = {loadedPortfolio.siteURL} target = "_blank">Visit Site</a>
              <a className = "external-link" href = {loadedPortfolio.repoURL} target = "_blank">View Code</a>
            </div>
          </div>
        </div>
        <img src = {loadedPortfolio.pic} alt = "pic" className = "portfolio-detail-picture" />
        <div className = "markdown-container">
          {/* In the future markdown will be in the post -> DUMMUY_POST_WEB.markdown */}
          <MarkDown markdown = {loadedPortfolio.markdown} cName = "markdown-display" />
        </div>
      </>
      )}
  </div>)
}

export default PortfolioArticle;
