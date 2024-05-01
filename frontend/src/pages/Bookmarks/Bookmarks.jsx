import styles from "./Bookmarks.module.css";
import Header from "../../components/Header/Header";
import { getBookmarkedStories } from "../../apis/bookmark";
import React, { useEffect, useState } from "react";
import StoryCard from "../../components/StoryCard/StoryCard";
import { useStoryContextProvider } from "../../context/StoryContext";


const Bookmarks = () => {
  const { isLoggedIn, setIsLoggedIn, bookmarkstories, setBookmarkStories } = useStoryContextProvider();
  // const [bookmarkstories, setBookmarkStories] = useState([]);

  // console.log(stories);

  const handleGetBookmarkedStories = async () => {
    const response = await getBookmarkedStories();
    // console.log(response);
    if(response?.status === 200) {
      setBookmarkStories(response?.data?.bookmarkedStories);
    }
  };

  useEffect(() => {
    handleGetBookmarkedStories();
  }, [isLoggedIn]);

  return (
    <div className={styles.container}>
      <Header />
      <h1>Your Bookmarks</h1>
      <div className={styles.cardsContainer}>
      {
        bookmarkstories?.map((story, index) => {
          return <StoryCard key={story?._id} _id={story?.refStoryId} />
        })
      }
      </div>
    </div>
  );
};

export default Bookmarks;
