import React, { useEffect, useState } from "react";
import styles from "./HomePage.module.css";
import Header from "../../components/Header/Header";
import AllImg from "../../assets/Images/AllImg.png";
import EducationImg from "../../assets/Images/EducationImg.jpeg";
import FoodImg from "../../assets/Images/FoodImg.png";
import HealthImg from "../../assets/Images/HealthImg.png";
import MoviesImg from "../../assets/Images/MoviesImg.jpeg";
import TravelImg from "../../assets/Images/TravelImg.png";
import StoryCard from "../../components/StoryCard/StoryCard";
import { getAllStories, getMyStories } from "../../apis/story";
import { useStoryContextProvider } from "../../context/StoryContext";
import YourStory from "../../components/YourStory/YourStory";
import FoodStory from "../../components/FoodStory/FoodStory";
import HealthStory from "../../components/HealthStory/HealthStory";
import TravelStory from "../../components/TravelStory/TravelStory";
import MovieStory from "../../components/MovieStory/MovieStory";
import EducationStory from "../../components/EducationStory/EducationStory";

const HomePage = () => {
  const { isLoggedIn, setIsLoggedIn, screenWidth, allStories, setAllStories } = useStoryContextProvider();
  // const [allStories, setAllStories] = useState([]);

  const [myStories, setMyStories] = useState([]);

  // const [seeMoreState, setSeeMoreState] = ({
  //   food: false,
  //   travel: false,
  // })

  // console.log(seeMoreState.food);
  // console.log(myStories);
  const [selectedCategory, setSelectedCategory] = useState("all");
  // console.log(selectedCategory);
  // console.log(allStories);

  // Handle Get My Stories
  const handleGetMyStories = async () => {
    const response = await getMyStories();
    // console.log(response);
    if (response?.status === 200) {
      setMyStories(response?.data?.myStories);
    }
  };

  // Handle Get All Stories
  const handleGetAllStories = async (category) => {
    // console.log(category);
    setSelectedCategory(category);

    const response = await getAllStories(category);
    // console.log(response);
    setAllStories(response?.data);
  };

  useEffect(() => {
    handleGetAllStories("all");
    handleGetMyStories();
  }, [isLoggedIn]);

  return (
    <>
      {/* header component */}
      <Header setAllStories={setAllStories} />

      {/* categories carousel */}
      <div className={styles.imagesContent}>
        {/* all image */}
        <div
          className={styles.singleImageCard}
          onClick={() => handleGetAllStories("all")}
        >
          <img className={styles.singleImage} src={AllImg} alt="allImages" />
          <p className={styles.imgText}>All</p>
        </div>

        {/* health image */}
        <div
          className={styles.singleImageCard}
          onClick={() => handleGetAllStories("health")}
        >
          <img
            className={styles.singleImage}
            src={HealthImg}
            alt="healthImages"
          />
          <p className={styles.imgText}>Medicine</p>
        </div>
        {/* food image */}
        <div
          className={styles.singleImageCard}
          onClick={() => handleGetAllStories("food")}
        >
          <img className={styles.singleImage} src={FoodImg} alt="foodImages" />
          <p className={styles.imgText}>Food</p>
        </div>
        {/* travel image */}
        <div
          className={styles.singleImageCard}
          onClick={() => handleGetAllStories("travel")}
        >
          <img
            className={styles.singleImage}
            src={TravelImg}
            alt="travelImages"
          />
          <p className={styles.imgText}>Travel</p>
        </div>
        {/* education image */}
        <div
          className={styles.singleImageCard}
          onClick={() => handleGetAllStories("education")}
        >
          <img
            className={styles.singleImage}
            src={EducationImg}
            alt="educationImages"
          />
          <p className={styles.imgText}>Education</p>
        </div>
        {/* movie image */}
        <div
          className={styles.singleImageCard}
          onClick={() => handleGetAllStories("movies")}
        >
          <img
            className={styles.singleImage}
            src={MoviesImg}
            alt="movieImages"
          />
          <p className={styles.imgText}>Movie</p>
        </div>
      </div>

      {/* container */}
      <div className={styles.container}>
        {/* ----------------------------------------------- */}
        {/* Your Stories Section */}
        <YourStory selectedCategory={selectedCategory} myStories={myStories} />

        {/* ------------------------------------------------------ */}

        {/* food stories container */}
        <FoodStory selectedCategory={selectedCategory} allStories={allStories} />

        {/* Top Stories About Health */}
        <HealthStory selectedCategory={selectedCategory} allStories={allStories} />

        {/* Top Stories About Travel */}
        <TravelStory selectedCategory={selectedCategory} allStories={allStories} />

        {/* Top Stories About Movies */}
        <MovieStory selectedCategory={selectedCategory} allStories={allStories} />

        {/* Top Stories About Education */}
        <EducationStory selectedCategory={selectedCategory} allStories={allStories} />
      </div>
    </>
  );
};

export default HomePage;
