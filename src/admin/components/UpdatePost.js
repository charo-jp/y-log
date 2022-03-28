import React, {useContext, useEffect, useState} from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useForm from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";

import Input from "../../shared/components/Input";
import MarkDown from "../../shared/components/MarkDown";
import nameCategoryHandler from "../../shared/functions/nameCategory";
import GoBack from "../../shared/components/UIElements/GoBack";
import "./UpdatPost.css";
import { AdminContext } from "../../shared/contexts/AdminContext";

const UpdatePost = () => {
  const location = useLocation();
  const { error, sendRequest} = useHttpClient();
  const navigate = useNavigate();
  const admin = useContext(AdminContext);
  const [loadedPost, setLoadedPost] = useState();
  const {webId, blogId} = useParams();
  const id = webId || blogId;
  const path = location.pathname;
  const {name, category} = nameCategoryHandler(path)
  let formStructure ;

  if (name === "portfolio") {
    formStructure =  {
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
    }
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
      }
  }}
  const [formState, inputHandler, setFormData] = useForm(formStructure,
    true
  );

  useEffect(() => {
    const fetchRequest = async () => {

      try {
        const responseData = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/${name}/${id}`);
        if (name === "portfolio") {
          setLoadedPost(responseData.portfolio);
          setFormData({
            title: {
              value: formState.inputs.title.value,
              isValid: true,
            },
            repoURL: {
              value: formState.inputs.repoURL.value,
              isValid: true,
            },
            siteURL: {
              value: formState.inputs.siteURL.value,
              isValid: true,
            },
            pic: {
              value: formState.inputs.pic.value,
              isValid: true,
            },
            cardpic: {
              value: formState.inputs.cardpic.value,
              isValid: true,
            },
            shortDescription: {
              value: formState.inputs.shortDescription.value,
              isValid: true,
            },
            markdown: {
              value: formState.inputs.markdown.value,
              isValid: true,
            }
          },true)
        }
        if (name === "blog") {
          setLoadedPost(responseData.blog);
          console.log(responseData.blog);
          setFormData({
            title: {
              value: formState.inputs.title.value,
              isValid: true,
            },
            cardpic: {
              value: formState.inputs.cardpic.value,
              isValid: true,
            },
            shortDescription: {
              value: formState.inputs.shortDescription.value,
              isValid: true,
            },
            markdown: {
              value: formState.inputs.markdown.value,
              isValid: true,
            }
          },true)
        }

      }catch(err) {
        console.log(error);
      }
    };

    fetchRequest();
  },[sendRequest, name, id, setFormData]);

  const postSubmitHandler = async (event) => {
    event.preventDefault();
    try{
      await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/${name}/${id}`, "PATCH", 
      name === "portfolio" ? JSON.stringify({
        title: formState.inputs.title.value,
        repoURL: formState.inputs.repoURL.value,
        siteURL: formState.inputs.siteURL.value,
        pic: formState.inputs.pic.value,
        cardpic: formState.inputs.cardpic.value,
        shortDescription: formState.inputs.shortDescription.value,
        markdown: formState.inputs.markdown.value
      }) : JSON.stringify({
        title: formState.inputs.title.value,
        cardpic: formState.inputs.cardpic.value,
        shortDescription: formState.inputs.shortDescription.value,
        markdown: formState.inputs.markdown.value
      }),{
        "Content-Type": "application/json",
        Authorization: "Bearer " + admin.token
      }
      )
      alert("Successfully Updated!");
      navigate(`/admin/${name}/${category}`);
    }catch(err) {
      console.log(error);
    }
  };

  return (
    <React.Fragment>
    <GoBack to = {`/admin/${name}/${category}`} />
    <div className="create-new-container">
      <h2 className="create-new-title">
        Edit 
      </h2>
      <form className="portfolio-form" onSubmit={postSubmitHandler}>
        <div className="form-upper">
          <div className="form-portfolio-component p-title">
            <label htmlFor="title" style = {{color: formState.inputs.title.isValid ? "#039487": ""}}>Title: </label>
            {loadedPost && (

              <Input
              tag="input"
              placeholderAndId="title"
              type="text"
              onInput={inputHandler}
              initValue = {loadedPost.title}
              />
              )}
          </div>
          {name === "portfolio" && (<>
            <div className="form-portfolio-component p-repourl">
              <label htmlFor="repoURL"style = {{color: formState.inputs.repoURL.isValid ? "#039487": ""}} >
                Repository URL:{" "}
                {!formState.inputs.repoURL.isValid &&
                  formState.inputs.repoURL.value.length !== 0 && (
                    <span className="invalid">Invalid URL</span>
                    )}
              </label>
              {loadedPost && (
              <Input
                tag="input"
                placeholderAndId="repoURL"
                type="text"
                onInput={inputHandler}
                initValue = {loadedPost.repoURL}
                />
              )}
            </div>
            <div className="form-portfolio-component p-siteurl">
              <label htmlFor="siteURL" style = {{color: formState.inputs.siteURL.isValid ? "#039487": ""}}>
                Site URL:{" "}
                {!formState.inputs.siteURL.isValid &&
                  formState.inputs.siteURL.value.length !== 0 && (
                    <span className="invalid">Invalid URL</span>
                  )}
              </label>
              {loadedPost && (
              <Input
                tag="input"
                placeholderAndId="siteURL"
                type="text"
                onInput={inputHandler}
                initValue = {loadedPost.siteURL}
              />
              )}
            </div>
            <div className="form-portfolio-component p-pic">
              <label htmlFor="pic" style = {{color: formState.inputs.pic.isValid ? "#039487": ""}}>
                Picture:{" "}
                {!formState.inputs.pic.isValid &&
                  formState.inputs.pic.value.length !== 0 && (
                    <span className="invalid">Invalid URL</span>
                  )}
              </label>
              {loadedPost && (
              <Input
                tag="input"
                placeholderAndId="pic"
                type="text"
                onInput={inputHandler}
                initValue = {loadedPost.pic}
              />
              )}
            </div>
          </>
            )}
          <div className="form-portfolio-component p-cardpic">
            <label htmlFor="cardpic" style = {{color: formState.inputs.cardpic.isValid ? "#039487": ""}}>
              Picture for card:{" "}
              {!formState.inputs.cardpic.isValid &&
                formState.inputs.cardpic.value.length !== 0 && (
                  <span className="invalid">Invalid URL</span>
                )}
            </label>
            {loadedPost && (
            <Input
              tag="input"
              placeholderAndId="cardpic"
              type="text"
              onInput={inputHandler}
              initValue = {loadedPost.cardpic}
            />
            )}
          </div>
          <div className="form-portfolio-component p-short-description">
            <label htmlFor="shortDescription" style = {{color: formState.inputs.shortDescription.isValid ? "#039487": ""}}>Short Description</label>
            {loadedPost && (
            <Input
              tag="textarea"
              placeholderAndId="shortDescription"
              type="text"
              cName="textarea-for-short"
              onInput={inputHandler}
              initValue = {loadedPost.shortDescription}
            />
            )}
            <p className="limit-for-short-description">
              Limit: {170 - formState.inputs.shortDescription.value.length}
            </p>
          </div>
        </div>
        <div className="form-lower">
          <h2 className="form-lower-title" style = {{color: formState.inputs.markdown.isValid ? "#039487": ""}}>Markdown</h2>
          <div className="create-markdown">
          {loadedPost && (
            <Input
              tag="textarea"
              placeholderAndId="markdown"
              type="text"
              cName="textarea-for-markdown"
              onInput={inputHandler}
              initValue = {loadedPost.markdown}
            />
          )}
            <MarkDown
              cName="display-for-create-markdown"
              markdown={formState.inputs.markdown.value}
            />
          </div>
        </div>
        <button type="submit" className="submit-new-portfolio" disabled = {!formState.isValid} >
          Complete Editing
        </button>
      </form>
    </div>
    </React.Fragment>
  )
}

export default UpdatePost;