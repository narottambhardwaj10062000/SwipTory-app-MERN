import React, { useEffect, useState } from 'react';
import styles from "../../pages/Homepage/HomePage.module.css";
import StoryCard from '../StoryCard/StoryCard';

export default function MovieStory({selectedCategory, allStories}) {
    const [movieStory, setMovieStory] = useState([]);
    const [showAllStories, setShowAllStories] = useState(false);

    useEffect(()=>{
        if(allStories?.moviesStory?.length > 4 && showAllStories === false)
            setMovieStory(allStories?.moviesStory?.slice(0, 4));
        else
            setMovieStory(allStories?.moviesStory);
    },[showAllStories, allStories])

    return (
        <div
            className={styles.foodStoryContainer}
            style={
                selectedCategory === "all" || selectedCategory === "movies"
                    ? { display: "block" }
                    : { display: "none" }
            }
        >
            <h2>Top Stories About Movies</h2>
            <div className={styles.cardsContainer}>
                {movieStory?.map((story) => {
                    {
                        /* console.log(story); */
                    }
                    return <StoryCard key={story._id} {...story} />;
                })}
            </div>
            <h3
                className={styles.noStoriesAvailable}
                style={
                    allStories?.moviesStory?.length === 0
                        ? { display: "flex" }
                        : { display: "none" }
                }
            >
                No Stories Available
            </h3>

            {allStories?.moviesStory?.length > 4 && <button onClick={()=>setShowAllStories(!showAllStories)}>{showAllStories ? 'See less' : 'See more'}</button>}
        </div>
    )
}
