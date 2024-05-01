import React from "react";
import styles from "./StoryCard.module.css";
import FoodImg from "../../assets/Images/FoodImg.png";
import { useState, useEffect } from "react";
import { TbEdit } from "react-icons/tb";
import editImage from "../../assets/Images/editImage.png";
import EditStoryModal from "../../modals/EditStoryModal/EditStoryModal";
import StorySlides from "../StorySlides/StorySlides";
import { getStoryDetail } from "../../apis/story";
import Authentication from "../../modals/Authentication/Authentication";

const StoryCard = ({ _id, type }) => {
  const [storyState, setStoryState] = useState(false);
  const [editStoryModal, setEditStoryModal] = useState(false);
  const [story, setStory] = useState({});
  const [loginModal, setLoginModal] = useState(false);
  console.log(story);

  const handleGetStoryDetail = async () => {
    const response = await getStoryDetail(_id);
    setStory(response?.data?.storyDetail);
  };

  useEffect(() => {
    handleGetStoryDetail();
  }, []);

  return (
    <div className={styles.mainContainer}>
      <div className={styles.singleCard} onClick={() => setStoryState(true)}>
        <img src={story?.slides?.[0].imgUrl} className={styles.Images} />

        <div className={styles.upper}></div>
        <div className={styles.lower}>
          <div className={styles.imgTextContainer}>
            <h3>{story?.slides?.[0].heading}</h3>
            <p>{story?.slides?.[0].description}</p>
          </div>
        </div>

        
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* edit button */}
      <div
        className={styles.editContainer}
        style={type === "yourStory" ? { display: "flex" } : { display: "none" }}
      >
        
        <img
          src={editImage}
          alt="edit-image"
          onClick={() => setEditStoryModal(true)}
        />
      </div>
      {/* ----------------------------------------------------------------- */}

      {/* Edit story Modal */}
      {editStoryModal === true ? (
        <EditStoryModal setEditStoryModal={setEditStoryModal} storyId={_id} />
      ) : null}

      {/* StorySlide Modal */}
      {storyState === true ? (
        <StorySlides
          slides={story?.slides}
          storyId={_id}
          likedArray={story?.likedArray}
          setStoryState={setStoryState}
          setLoginModal={setLoginModal}
        />
      ) : null}

      {/* Auth Modal */}
      {loginModal === true ? (
        <Authentication setLoginModal={setLoginModal} authType="Login" />
      ) : null}
    </div>
  );
};

export default StoryCard;


