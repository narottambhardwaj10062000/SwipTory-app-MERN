import styles from "./YourStoryMobile.module.css";
import React, { useState, useEffect } from "react";
import { getMyStories } from "../../apis/story";
import { useStoryContextProvider } from "../../context/StoryContext";
import Header from "../Header/Header";
import StoryCard from "../StoryCard/StoryCard";

const YourStoryMobile = () => {
  const { isLoggedIn } = useStoryContextProvider();
  const [stories, setStories] = useState([]);
  console.log(stories);

  const handleGetMyStories = async () => {
    const response = await getMyStories();

    if (response?.status === 200) {
    //   console.log(response);
      setStories(response?.data?.myStories);
    }
  };

  useEffect(() => {
    handleGetMyStories();
  }, []);

  return (
    <div className={styles.container}>
      <Header />
      <h1>Your Stories</h1>
      <div className={styles.cardsContainer}>
        {stories?.map((story, index) => {
          return <StoryCard key={story?._id} _id={story?._id} type="yourStory" />;
        })}
      </div>
    </div>
  );
};

export default YourStoryMobile;
