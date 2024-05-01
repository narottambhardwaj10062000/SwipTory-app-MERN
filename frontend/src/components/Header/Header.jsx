import React, { useState, useEffect } from "react";
import styles from "./Header.module.css";
import { RxBookmarkFilled } from "react-icons/rx";
import Authentication from "../../modals/Authentication/Authentication";
import AddStoryModal from "../../modals/AddStoryModal/AddStoryModal";
import { useStoryContextProvider } from "../../context/StoryContext";
import { useNavigate } from "react-router-dom";
import { checklogin } from "../../apis/auth";

const Header = ({ setAllStories }) => {
  const navigate = useNavigate();
  const [logoutMenu, setLogoutMenu] = useState(false);
  const { isLoggedIn, setIsLoggedIn, name, setName } = useStoryContextProvider();
  const [mobileHeaderMenu, setMobileHeaderMenu] = useState(false);
  const [loginModal, setLoginModal] = useState(false);
  const [registerModal, setRegisterModal] = useState(false);
  const [addStoryModal, setAddStoryModal] = useState(false);
 

  // Logout functionality
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setLogoutMenu(false);
    setMobileHeaderMenu(false);
    navigate("/");
    setName("");
  }

  const handleCheckLogin = async () => {
    const response = await checklogin();

    if(response?.status === 200) {
      setIsLoggedIn(true);
      setName(response?.data?.name);
    }
    else {
      setIsLoggedIn(false);
    }
  }

  useEffect(() => {
    handleCheckLogin();
  },[isLoggedIn])

  return (
    <div className={styles.headerContainer}>
      <h2 onClick={() => navigate("/")}>SwipTory</h2>

      <div className={styles.rightSide}>
        {/* login and signUp Container */}
        <div
          className={styles.btnContainer}
          style={
            isLoggedIn === false ? { display: "flex" } : { display: "none" }
          }
        >
          <button
            style={{ backgroundColor: "#FF7373" }}
            onClick={() => setRegisterModal(true)}
          >
            Register Now
          </button>

          <button
            style={{ backgroundColor: "#73ABFF" }}
            onClick={() => setLoginModal(true)}
          >
            Sign In
          </button>

        </div>

        {/* loggedIn header menu Items */}
        <div
          className={styles.navBar}
          style={
            isLoggedIn === true ? { display: "flex" } : { display: "none" }
          }
        >
          <button onClick={() => navigate("/bookmarks")}>
            <span>
              <RxBookmarkFilled />
            </span>
            Bookmarks
          </button>

          {/* add story button */}
          <button onClick={() => setAddStoryModal(true)}>Add story</button>

          <img
            src="https://cdn.vectorstock.com/i/1000v/51/05/male-profile-avatar-with-brown-hair-vector-12055105.jpg"
            alt="profile-image"
          />

          {/* logout menu button */}
          <div
            className={styles.menuIcon}
            onClick={() => setLogoutMenu(!logoutMenu)}
          >
            &#9776;
          </div>

          {/* logout menu */}
          <div
            className={styles.logoutMenu}
            style={logoutMenu ? { display: "flex" } : { display: "none" }}
          >
            <div>
              <p>{name}</p>
              <button onClick={handleLogout}>Logout</button>
            </div>
          </div>

        </div>
      </div>
      {/* --------------------------------WebView RightSide Ends Here--------------------------------- */}

      {/* ------------------------------------mobile rightside starts here--------------------------------- */}
      <div className={styles.mobileRightSide}>
        {/* hamburger menu icon */}
        <div
          className={styles.mobileMenuIcon}
          onClick={() => setMobileHeaderMenu(true)}
        >
          &#9776;
        </div>
      </div>

      {/* mobile header menu */}
      <div
        className={styles.mobileMenuContainer}
        style={mobileHeaderMenu ? { display: "flex" } : { display: "none" }}
      >
        <div
          className={styles.crossIcon}
          onClick={() => setMobileHeaderMenu(false)}
        >
          &#x274C;
        </div>

        {/* when user is logged out */}
        <div
          className={styles.loggedOutStateMenu}
          style={
            isLoggedIn === false ? { display: "flex" } : { display: "none" }
          }
        >
          <button
            style={{ backgroundColor: "#FF7373" }}
            onClick={() => {
              setLoginModal(true);
              setMobileHeaderMenu(false);
            }}
          >
            Sign In
          </button>
          <button
            style={{ backgroundColor: "#FF7373" }}
            onClick={() => {
              setRegisterModal(true);
              setMobileHeaderMenu(false);
            }}
          >
            Register Now
          </button>
        </div>

        {/* when user is logged in  */}
        <div
          className={styles.loggedInStateMenu}
          style={
            isLoggedIn === true ? { display: "flex" } : { display: "none" }
          }
        >
          <div className={styles.namePic}>
            <img
              src="https://cdn.vectorstock.com/i/1000v/51/05/male-profile-avatar-with-brown-hair-vector-12055105.jpg"
              alt="profile-image"
            />
            <p>{name}</p>
          </div>
          <div className={styles.menuBtnContainer}>
            <button onClick={ () => navigate("/yourStories")}>Your Story</button>
            <button
              onClick={() => {
                setAddStoryModal(true);
                setMobileHeaderMenu(false);
              }}
            >
              Add Story
            </button>
            <button onClick={() => navigate("/bookmarks")}>
              <span>
                <RxBookmarkFilled />
              </span>
              Bookmarks
            </button>
            <button onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </div>
      {/* -----------------------------------------Mobile RightSide ends here------------------------  */}

      {/* modals */}
      {loginModal === true ? (
        <Authentication setLoginModal={setLoginModal} authType="Login" />
      ) : null}

      {registerModal === true ? (
        <Authentication
          setRegisterModal={setRegisterModal}
          authType="Register"
        />
      ) : null}

      {addStoryModal === true ? (
        <AddStoryModal setAddStoryModal={setAddStoryModal} setAllStories={setAllStories} />
      ) : null}
    </div>
  );
};

export default Header;
