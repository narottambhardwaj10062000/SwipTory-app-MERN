import React, { useEffect, useState } from 'react';
import styles from "../../pages/Homepage/HomePage.module.css";
import StoryCard from '../StoryCard/StoryCard';

export default function EducationStory({ selectedCategory, allStories }) {
    const [educationStory, setEducationStory] = useState([]);
    const [showAllStories, setShowAllStories] = useState(false);

    useEffect(() => {
        if (allStories?.educationStory?.length > 4 && showAllStories === false)
            setEducationStory(allStories?.educationStory?.slice(0, 4));
        else
            setEducationStory(allStories?.educationStory);
    }, [showAllStories, allStories])

    return (
        <div
            className={styles.foodStoryContainer}
            style={
                selectedCategory === "all" || selectedCategory === "education"
                    ? { display: "block" }
                    : { display: "none" }
            }
        >
            <h2>Top Stories About Education</h2>
            <div className={styles.cardsContainer}>
                {educationStory?.map((story) => {
                    {
                        /* console.log(story); */
                    }
                    return <StoryCard key={story._id} {...story} />;
                })}
            </div>
            <h3
                className={styles.noStoriesAvailable}
                style={
                    allStories?.educationStory?.length === 0
                        ? { display: "flex" }
                        : { display: "none" }
                }
            >
                No Stories Available
            </h3>

            {allStories?.educationStory?.length > 4 && <button onClick={()=>setShowAllStories(!showAllStories)}>{showAllStories ? 'See less' : 'See more'}</button>}
        </div>
    )
}
