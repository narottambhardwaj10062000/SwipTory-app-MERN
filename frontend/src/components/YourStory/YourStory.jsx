import React, { useEffect, useState } from 'react';
import styles from "../../pages/Homepage/HomePage.module.css";
import { useStoryContextProvider } from "../../context/StoryContext";
import StoryCard from '../StoryCard/StoryCard';

export default function YourStory({ selectedCategory, myStories }) {
    const { isLoggedIn, screenWidth } = useStoryContextProvider();

    const [myStorie, setMyStory] = useState([]);
    const [showAllStories, setShowAllStories] = useState(false);

    useEffect(()=>{
        if(myStories?.length > 4 && showAllStories === false)
            setMyStory(myStories?.slice(0, 4));
        else
            setMyStory(myStories);
    },[showAllStories, myStories])

    return (
        <div
            className={styles.yourStoryContainer}
            style={
                isLoggedIn && screenWidth >= "600" && selectedCategory === "all"
                    ? { display: "block" }
                    : { display: "none" }
            }
        >
            <h2>Your Stories</h2>

            <div className={styles.cardsContainer}>
                {myStories?.map((story) => {
                    {
                        /* console.log(story); */
                    }
                    return <StoryCard key={story?._id} {...story} type="yourStory" />;
                })}
            </div>

            <h3
                className={styles.noStoriesAvailable}
                style={
                    myStories?.length === 0
                        ? { display: "flex" }
                        : { display: "none" }
                }
            >
                No Stories Available
            </h3>

            {myStories?.length > 4 && <button onClick={()=>setShowAllStories(!showAllStories)}>{showAllStories ? 'See less' : 'See more'}</button>}
        </div>
    )
}
