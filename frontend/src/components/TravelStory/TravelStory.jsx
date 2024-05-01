import React, { useEffect, useState } from 'react';
import styles from "../../pages/Homepage/HomePage.module.css";
import StoryCard from '../StoryCard/StoryCard';

export default function TravelStory({selectedCategory, allStories}) {
    const [travelStory, setTravelStory] = useState([]);
    const [showAllStories, setShowAllStories] = useState(false);

    useEffect(()=>{
        if(allStories?.travelStory?.length > 4 && showAllStories === false)
            setTravelStory(allStories?.travelStory?.slice(0, 4));
        else
            setTravelStory(allStories?.travelStory);
    },[showAllStories, allStories])

    return (
        <div
            className={styles.foodStoryContainer}
            style={
                selectedCategory === "all" || selectedCategory === "travel"
                    ? { display: "block" }
                    : { display: "none" }
            }
        >
            <h2>Top Stories About Travel</h2>
            <div className={styles.cardsContainer}>
                {travelStory?.map((story) => {
                    {
                        /* console.log(story); */
                    }
                    return <StoryCard key={story._id} {...story} />;
                })}
            </div>
            <h3
                className={styles.noStoriesAvailable}
                style={
                    allStories?.travelStory?.length === 0
                        ? { display: "flex" }
                        : { display: "none" }
                }
            >
                No Stories Available
            </h3>

            {allStories?.travelStory?.length > 4 && <button onClick={()=>setShowAllStories(!showAllStories)}>{showAllStories ? 'See less' : 'See more'}</button>}
        </div>
    )
}
