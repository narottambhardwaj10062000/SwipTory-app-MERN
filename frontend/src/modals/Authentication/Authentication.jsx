import React, { useState } from "react";
import styles from "./Authentication.module.css";
import ReactDOM from "react-dom";
import roundedCrossIcon from "../../assets/Icons/roundedCrossIcon.svg";
import { authLogin, authRegister } from "../../apis/auth";
import { useStoryContextProvider } from "../../context/StoryContext";
import { useSnackbar } from "notistack";
import { LuEye } from "react-icons/lu";
import { LuEyeOff } from "react-icons/lu";

const Authentication = ({ setLoginModal, setRegisterModal, authType }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState(false);
  const { isLoggedIn, setIsLoggedIn } = useStoryContextProvider();

  // console.log(userName);
  // console.log(password);

  // close modal functionality
  const handleClose = () => {
    if (authType === "Login") {
      setLoginModal(false);
    } else if (authType === "Register") {
      setRegisterModal(false);
    }
  };

  // handling login and signUp
  const handleAuth = async () => {
    if (authType === "Login") {
      if (userName === "" || password === "") {
        setError(true);
        return;
      } else {
        setError(false);
        const response = await authLogin({ userName, password });
        if (response?.status === 200) {
          localStorage.setItem("token", JSON.stringify(response?.data?.token));
          // console.log(response);
          setIsLoggedIn(true);
          setLoginModal(false);
          enqueueSnackbar(response?.data?.message, { variant: "success" });
          // alert("login successful");
        } else if (response?.status === 400) {
          enqueueSnackbar(response?.data?.message, { variant: "error" });
        } else if (response?.status === 404) {
          enqueueSnackbar(response?.data?.message, { variant: "error" });
        } else if (response?.status === 401) {
          enqueueSnackbar(response?.data?.message, { variant: "error" });
        } else {
          enqueueSnackbar(response?.data?.message, { variant: "error" });
        }
      }
    } else if (authType === "Register") {
      if (userName === "" || password === "") {
        setError(true);
        return;
      } else {
        setError(false);
        const response = await authRegister({ userName, password });
        if (response?.status === 200) {
          localStorage.setItem("token", JSON.stringify(response?.data?.token));
          setIsLoggedIn(true);
          setRegisterModal(false);
          enqueueSnackbar(response?.data?.message, { variant: "success" });
          // alert("Registration successful");
        } else if (response?.status === 400) {
          enqueueSnackbar(response?.data?.message, { variant: "error" });
        } else if (response?.status === 409) {
          enqueueSnackbar(response?.data?.message, { variant: "error" });
        } else {
          enqueueSnackbar(response?.data?.message, { variant: "error" });
        }
      }
    }
  };

  return ReactDOM.createPortal(
    <>
      <div className={styles.modalWrapper}></div>
      <div className={styles.authContainer}>
        <img
          src={roundedCrossIcon}
          alt="rounded-cross-icon"
          className={styles.roundedCrossIcon}
          onClick={handleClose}
          // () => setLoginModal(false) && setRegisterModal(false)
        />
        <div>
          <h1>{authType} to SwipTory</h1>

          <div className={styles.inputContainer}>
            <div className={styles.input}>
              <label>Username</label>
              <input
                type="text"
                placeholder="Enter username"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>

            <div className={styles.input}>
              <label>Password</label>

              {/* <div className={styles.passwordInput}> */}
              <input
                type={visible ? "text" : "password"}
                placeholder="Enter password"
                style={{ marginLeft: "4px" }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <div
                className={styles.passwordToggleContainer}
                onClick={() => setVisible(!visible)}
              >
                {visible ? (
                  <LuEyeOff style={{ height: "25px", width: "25px" }} />
                ) : (
                  <LuEye style={{ height: "25px", width: "25px" }} />
                )}
              </div>
              {/* </div> */}
            </div>
            {error == true && userName === "" ? (
              <p style={{ color: "red", textAlign: "center" }}>
                Please enter valid username
              </p>
            ) : (
              ""
            )}

            {error == true && password === "" ? (
              <p style={{ color: "red", textAlign: "center" }}>
                Please enter valid password
              </p>
            ) : (
              ""
            )}
          </div>

          {/* Login Or Signup Button */}
          <button className={styles.btn} onClick={handleAuth}>
            {authType}
          </button>
        </div>
      </div>
    </>,
    document.querySelector(".myPortalModalDiv")
  );
};

export default Authentication;
