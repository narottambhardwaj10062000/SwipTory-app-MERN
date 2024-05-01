import React, { useEffect, useState } from 'react';
import styles from "../../pages/Homepage/HomePage.module.css";
import StoryCard from '../StoryCard/StoryCard';

export default function FoodStory({selectedCategory, allStories}) {
    const [foodStory, setFoodStory] = useState([]);
    const [showAllStories, setShowAllStories] = useState(false);

    useEffect(()=>{
        if(allStories?.foodStory?.length > 4 && showAllStories === false)
            setFoodStory(allStories?.foodStory?.slice(0, 4));
        else
            setFoodStory(allStories?.foodStory);
    },[showAllStories, allStories])

    return (
        <div
            className={styles.foodStoryContainer}
            style={
                selectedCategory === "all" || selectedCategory === "food"
                    ? { display: "block" }
                    : { display: "none" }
            }
        >
            <h2>Top Stories About food</h2>
            <div className={styles.cardsContainer}>
                {foodStory?.map((story) => {
                    {
                        /* console.log(story); */
                    }
                    return <StoryCard key={story?._id} {...story} />;
                })}
            </div>

            <div className={styles.noStoriesAvailable}>
                <h3
                    style={
                        allStories?.foodStory?.length === 0
                            ? { display: "flex" }
                            : { display: "none" }
                    }
                >
                    No Stories Available
                </h3>
            </div>

            {allStories?.foodStory?.length > 4 && <button onClick={()=>setShowAllStories(!showAllStories)}>{showAllStories ? 'See less' : 'See more'}</button>}
        </div>
    )
}
