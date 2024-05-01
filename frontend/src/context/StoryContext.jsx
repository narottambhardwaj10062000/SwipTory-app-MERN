import { createContext, useState, useContext, useEffect } from "react";
import { checklogin } from "../apis/auth";

const StoryContext = createContext();

export const StoryContextProvider = ({ children }) => {
  const [bookmarkstories, setBookmarkStories] = useState([]);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [allStories, setAllStories] = useState([])

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [name, setName] = useState("");

  const handleCheckLogin = async () => {
    const response = await checklogin();

    if (response?.status === 200) {
      setIsLoggedIn(true);
      setName(response?.data?.name);
    } else {
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    handleCheckLogin();
  }, []);

  //   console.log(screenWidth);
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <StoryContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        name,
        setName,
        screenWidth,
        bookmarkstories,
        setBookmarkStories,
        allStories, 
        setAllStories
      }}
    >
      {children}
    </StoryContext.Provider>
  );
};

export const useStoryContextProvider = () => {
  return useContext(StoryContext);
};
