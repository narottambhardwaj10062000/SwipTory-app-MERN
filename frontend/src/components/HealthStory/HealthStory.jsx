import React, { useEffect, useState } from 'react';
import styles from "../../pages/Homepage/HomePage.module.css";
import StoryCard from '../StoryCard/StoryCard';

export default function HealthStory({selectedCategory, allStories}) {
    const [healthStory, setHealthStory] = useState([]);
    const [showAllStories, setShowAllStories] = useState(false);

    useEffect(()=>{
        if(allStories?.healthStory?.length > 4 && showAllStories === false)
            setHealthStory(allStories?.healthStory?.slice(0, 4));
        else
            setHealthStory(allStories?.healthStory);
    },[showAllStories, allStories])

    return (
        <div
            className={styles.foodStoryContainer}
            style={
                selectedCategory === "all" || selectedCategory === "health"
                    ? { display: "block" }
                    : { display: "none" }
            }
        >
            <h2>Top Stories About Health</h2>
            <div className={styles.cardsContainer}>
                {healthStory?.map((story) => {
                    {
                        /* console.log(story); */
                    }
                    return <StoryCard key={story._id} {...story} />;
                })}
            </div>
            <h3
                className={styles.noStoriesAvailable}
                style={
                    allStories?.healthStory?.length === 0
                        ? { display: "flex" }
                        : { display: "none" }
                }
            >
                No Stories Available
            </h3>

            {allStories?.healthStory?.length > 4 && <button onClick={()=>setShowAllStories(!showAllStories)}>{showAllStories ? 'See less' : 'See more'}</button>}
        </div>
    )
}
