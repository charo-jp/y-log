import React, { useState, useContext, useEffect } from "react";
import Input from "../../shared/components/Input";
import { useLocation } from "react-router-dom";
import useForm from "../../shared/hooks/form-hook";
import GoBack from "../../shared/components/UIElements/GoBack";
import { AdminContext } from "../../shared/contexts/AdminContext";
import { useHttpClient } from "../../shared/hooks/http-hook";
import "./Login.css";
import Loading from "../../shared/components/Loading";
import Button from "../../shared/components/UIElements/Button";

const Login = props => {
  const auth = useContext(AdminContext);
  const location = useLocation();
  const [isFocused, setIsFocued] = useState(false);
  const [isShown, setIsShown] = useState(false);
  const [isValidPassword, setisValidPassword] = useState(false);
  const {isLoading, sendRequest} = useHttpClient();
  const showHideHandler = () => {
    setIsShown(!isShown);
  };

  const passwordValidator = (val) => {
    if (val >= 10) {
      setisValidPassword(true);
    } else {
      setisValidPassword(false);
    }
  };

  const [formState, inputHandler] = useForm(
    {
      username: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const handleFocus = (boolean) => {
    setIsFocued(boolean);
  }
  
  useEffect(() => {
    props.setAdmin(location.pathname);
    return (() => {
      props.setAdmin("")
    })
  }, [location, props.setAdmin])

  const loginHandler = async (event) => {
    event.preventDefault();
    try {
      const responseData = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/admin`, "POST", JSON.stringify({
        username: formState.inputs.username.value,
        password: formState.inputs.password.value,
      }),{
        "Content-Type": "application/json"
      });
      auth.login(responseData.token);
    }catch(err) {
      console.log(err);
    }
  };

  return (
    <div className="admin">
      <div className="main-admin-display">
        <GoBack to="/" />
        <div className="login-contaienr">
          {isLoading && <Loading />}
          {!isLoading && (
            <>
            <h2>Admin</h2>
          <form  className="form" onSubmit={loginHandler}>
            <div className="username form-component">
              <label htmlFor="username">Username</label>
              <Input
                tag="input"
                placeholderAndId="username"
                type="text"
                onInput={inputHandler}
              />
            </div>
            <div className="password form-component login-form-component">
              <label htmlFor="password">Password</label>
              <Input
                tag="input"
                placeholderAndId="password"
                type={isShown ? "text" : "password"}
                func={passwordValidator}
                onInput={inputHandler}
                onFocus = {handleFocus}
              />
              {isFocused && !isValidPassword ? (
                <p className="invalid-password">
                  *password should be longer than 10 characters*
                </p>
              ) : null}
              <button
                type = "button"
                className="showAndHide"
                onClick={() => {
                  showHideHandler();
                }}
              >
                {isShown ? "Hide" : "Show"}
              </button>
            </div>
            <div className="button-container">
              <Button type="login" />
            </div>
          </form>
          </>
        )}
        </div>
        </div>
    </div>
  );
};

export default Login;
