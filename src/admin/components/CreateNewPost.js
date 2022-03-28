import React, { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Input from "../../shared/components/Input";
import MarkDown from "../../shared/components/MarkDown";
import GoBack from "../../shared/components/UIElements/GoBack";
import useForm from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import "./CreateNewPortfolio.css";
import nameCategoryHandler from "../../shared/functions/nameCategory";
import { AdminContext } from "../../shared/contexts/AdminContext";

const CreateNewPost = () => {
  const admin = useContext(AdminContext);
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname;
  const { name, category } = nameCategoryHandler(path);
  const { error, sendRequest } = useHttpClient();
  let formStructure;

  

  if (name === "portfolio") {
    formStructure = {
      title: {
        value: "",
        isValid: false,
      },
      repoURL: {
        value: "",
        isValid: false,
      },
      siteURL: {
        value: "",
        isValid: false,
      },
      pic: {
        value: "",
        isValid: false,
      },
      cardpic: {
        value: "",
        isValid: false,
      },
      shortDescription: {
        value: "",
        isValid: false,
      },
      markdown: {
        value: "",
        isValid: false,
      },
    };
  } else {
    formStructure = {
      title: {
        value: "",
        isValid: false,
      },
      cardpic: {
        value: "",
        isValid: false,
      },
      shortDescription: {
        value: "",
        isValid: false,
      },
      markdown: {
        value: "",
        isValid: false,
      },
    };
  }

  const [formState, inputHandler] = useForm(formStructure, false);

  const portfolioSubmitHandler = async (event) => {
    event.preventDefault();
    let body;
    if (name === "portfolio") {
      body = {
        category,
        title: formState.inputs.title.value,
        repoURL: formState.inputs.repoURL.value,
        siteURL: formState.inputs.siteURL.value,
        pic: formState.inputs.pic.value,
        cardpic: formState.inputs.cardpic.value,
        shortDescription: formState.inputs.shortDescription.value,
        markdown: formState.inputs.markdown.value,
      };
    } else {
      body = {
        category,
        title: formState.inputs.title.value,
        cardpic: formState.inputs.cardpic.value,
        shortDescription: formState.inputs.shortDescription.value,
        markdown: formState.inputs.markdown.value,
      };
    }
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/${name}`,
        "POST",
        JSON.stringify(body),{
          "Content-Type": "application/json",
          Authorization: "Bearer " + admin.token  
      });
      alert("Created Successfully!");
      navigate(`/admin/${name}/${category}`)
    } catch (err) {
      console.log(error);
    }
  };

  return (
    <React.Fragment>
      <div className = "go-back-container">
     <GoBack to = {`/admin/${name}/${category}`} />
      </div>
      <div className="create-new-container">
        <h2 className="create-new-title">
          Create a new {name} for {category}
        </h2>
        <form className="portfolio-form" onSubmit={portfolioSubmitHandler}>
          <div className="form-upper">
            <div className="form-portfolio-component p-title">
              <label
                htmlFor="title"
                style={{
                  color: formState.inputs.title.isValid ? "#039487" : "",
                }}
              >
                Title:{" "}
              </label>
              <Input
                tag="input"
                placeholderAndId="title"
                type="text"
                onInput={inputHandler}
              />
            </div>
            {name === "portfolio" && (
              <>
                <div className="form-portfolio-component p-repourl">
                  <label
                    htmlFor="repoURL"
                    style={{
                      color: formState.inputs.repoURL.isValid ? "#039487" : "",
                    }}
                  >
                    Repository URL:{" "}
                    {!formState.inputs.repoURL.isValid &&
                      formState.inputs.repoURL.value.length !== 0 && (
                        <span className="invalid">Invalid URL</span>
                      )}
                  </label>
                  <Input
                    tag="input"
                    placeholderAndId="repoURL"
                    type="text"
                    onInput={inputHandler}
                  />
                </div>
                <div className="form-portfolio-component p-siteurl">
                  <label
                    htmlFor="siteURL"
                    style={{
                      color: formState.inputs.siteURL.isValid ? "#039487" : "",
                    }}
                  >
                    Site URL:{" "}
                    {!formState.inputs.siteURL.isValid &&
                      formState.inputs.siteURL.value.length !== 0 && (
                        <span className="invalid">Invalid URL</span>
                      )}
                  </label>
                  <Input
                    tag="input"
                    placeholderAndId="siteURL"
                    type="text"
                    onInput={inputHandler}
                  />
                </div>
                <div className="form-portfolio-component p-pic">
                  <label
                    htmlFor="pic"
                    style={{
                      color: formState.inputs.pic.isValid ? "#039487" : "",
                    }}
                  >
                    Picture:{" "}
                    {!formState.inputs.pic.isValid &&
                      formState.inputs.pic.value.length !== 0 && (
                        <span className="invalid">Invalid URL</span>
                      )}
                  </label>
                  <Input
                    tag="input"
                    placeholderAndId="pic"
                    type="text"
                    onInput={inputHandler}
                  />
                </div>
              </>
            )}
            <div className="form-portfolio-component p-cardpic">
              <label
                htmlFor="cardpic"
                style={{
                  color: formState.inputs.cardpic.isValid ? "#039487" : "",
                }}
              >
                Picture for card:{" "}
                {!formState.inputs.cardpic.isValid &&
                  formState.inputs.cardpic.value.length !== 0 && (
                    <span className="invalid">Invalid URL</span>
                  )}
              </label>
              <Input
                tag="input"
                placeholderAndId="cardpic"
                type="text"
                onInput={inputHandler}
              />
            </div>
            <div className="form-portfolio-component p-short-description">
              <label
                htmlFor="shortDescription"
                style={{
                  color: formState.inputs.shortDescription.isValid
                    ? "#039487"
                    : "",
                }}
              >
                Short Description
              </label>
              <Input
                tag="textarea"
                placeholderAndId="shortDescription"
                type="text"
                cName="textarea-for-short"
                onInput={inputHandler}
              />
              <p className="limit-for-short-description">
                Limit: {170 - formState.inputs.shortDescription.value.length}
              </p>
            </div>
          </div>
          <div className="form-lower">
            <h2
              className="form-lower-title"
              style={{
                color: formState.inputs.markdown.isValid ? "#039487" : "",
              }}
            >
              Markdown
            </h2>
            <div className="create-markdown">
              <Input
                tag="textarea"
                placeholderAndId="markdown"
                type="text"
                cName="textarea-for-markdown"
                onInput={inputHandler}
              />
              <MarkDown
                cName="display-for-create-markdown"
                markdown={formState.inputs.markdown.value}
              />
            </div>
          </div>
          <button
            type="submit"
            className="submit-new-portfolio"
            disabled={!formState.isValid}
          >
            Create a new {name}
          </button>
        </form>
      </div>
    </React.Fragment>
  );
};

export default CreateNewPost;
