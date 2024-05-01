import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getStoryDetail } from "../../apis/story";
import styles from "./ShareStory.module.css";
import Stories from "react-insta-stories";
import { getLikeCount } from "../../apis/story";
import { useNavigate } from "react-router-dom";

const ShareStory = () => {
  const { storyId } = useParams();
  const navigate = useNavigate();
  //   console.log(storyId);
  const [slides, setSlides] = useState([]);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [storyIndex, setStoryIndex] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [likeArray, setLikeArray] = useState([]);
  const [isLiked, setIsLiked] = useState(null);
  console.log(slides);

  const handleGetStoryDetail = async () => {
    const response = await getStoryDetail(storyId);
    console.log(response);
    setSlides(response?.data?.storyDetail?.slides);
    setLikeArray(response?.data?.storyDetail?.likedArray);
  };

  useEffect(() => {
    handleGetStoryDetail();
  }, []);

  const storiesData = slides?.map((slide) => {
    return { url: slide?.imgUrl };
  });
  console.log(storiesData);

  const handleNext = () => {
    if (currentStoryIndex !== storiesData.length - 1) {
      setStoryIndex(currentStoryIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStoryIndex !== 0) {
      setStoryIndex(currentStoryIndex - 1);
    }
  };

  function onStart(index) {
    setCurrentStoryIndex(index);
  }

  return (
    <>
      <div className={styles.modalWrapper}></div>
      <div className={styles.storyContainer}>
        <img
          src="/./assets/icons/leftArrow.svg"
          className={styles.storyArrow}
          onClick={handlePrevious}
        />
        {slides?.length === 0 ? (
          <h1>Loading...</h1>
        ) : (
          <div className={styles.story}>
            <Stories
              stories={storiesData}
              defaultInterval={5000}
              width={340}
              height={600}
              onStoryStart={onStart}
              currentIndex={storyIndex}
              storyStyles={{
                width: "340px",
                height: "600px",
                objectFit: "cover",
              }}
              progressStyles={{
                height: "4px",
              }}
              progressWrapperStyles={{
                height: "4px",
                marginTop: "2.2rem",
              }}
              progressContainerStyles={{
                padding: "0 0.8rem",
              }}
            />
            <div className={styles.storyContent}>
              <div className={styles.storyHeaderIcon}>
                <img
                  src="/./assets/icons/cross.svg"
                  height={15}
                  onClick={() => navigate("/")}
                />
                <img
                  src="/./assets/icons/share.svg"
                  height={18}
                  // onClick={handleShare}
                />
              </div>
              <div className={styles.storyBottom}>
                <div className={styles.storyText}>
                  <h2>{slides[currentStoryIndex]?.heading}</h2>
                  <p>
                    {slides[currentStoryIndex]?.description}
                  </p>
                </div>
                <div className={styles.storyBottomIcon}>
                  {/* bookmark button */}

                  <img
                    src="/./assets/icons/bookMark.svg"
                    height={25}
                    // onClick={handleAddBookmark}
                  />

                  <div style={{ display: "flex", alignItems: "center" }}>
                    <img
                      src="/./assets/icons/like.svg"
                      height={25}
                      //   onClick={handleLike}
                    />

                    <span className={styles.likeCount}>
                      {likeArray?.length}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <img
          src="/./assets/icons/rightArrow.svg"
          className={styles.storyArrow}
          onClick={handleNext}
        />
      </div>
    </>
  );
};

export default ShareStory;
