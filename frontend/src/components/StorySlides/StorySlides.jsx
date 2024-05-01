import React, { useEffect, useRef, useState } from "react";
import Stories from "react-insta-stories";
import styles from "./StorySlides.module.css";
import { getStoryDetail } from "../../apis/story";
import redHeart from "../../assets/Icons/redHeart.svg";
import { addBookmark, checkBookmark } from "../../apis/bookmark";
import { getIsLiked, getLikeCount } from "../../apis/story";
import blueBookmark from "../../assets/Icons/blueBookmark.svg";
import { useStoryContextProvider } from "../../context/StoryContext";
import { useSnackbar } from "notistack";

export default function StorySlides({
  slides,
  storyId,
  likedArray,
  setStoryState,
  setLoginModal,
}) {
  const { enqueueSnackbar } = useSnackbar();
  const { isLoggedIn, setIsLoggedIn, bookmarkstories, setBookmarkStories } = useStoryContextProvider();

  // console.log(storyId);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  // console.log(currentStoryIndex);
  const [storyIndex, setStoryIndex] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [likeArray, setLikeArray] = useState(likedArray);
  const [isLiked, setIsLiked] = useState(null);
  // console.log(isBookmarked);

  const handleGetIsLiked = async () => {
    const response = await getIsLiked(storyId);
    // console.log(response);
    setIsLiked(response?.data?.isLiked);
    setLikeArray(response?.data?.newLikesCount);
  };

  const getlikedetails = async (storyId) => {
    const response = await getLikeCount(storyId);

    if (response?.status === 200) {
      setIsLiked(response?.data?.isLiked);
      setLikeArray(response?.data?.newLikesCount);
    }
  };

  const handleLike = () => {
    getlikedetails(storyId);
  };

  const handleCheckBookmark = async () => {
    const response = await checkBookmark(storyId);
    // console.log(response);
    if (response?.status === 200) {
      setIsBookmarked(response?.data?.isBookmarked);
    }
  };

  useEffect(() => {
    handleCheckBookmark();
  }, []);

  useEffect(() => {
    handleGetIsLiked();
  }, []);

  // Handle Add Bookmark
  const handleAddBookmark = async () => {
    const response = await addBookmark(storyId);
    // console.log(response);
    if (response?.status === 200) {
      setIsBookmarked(response?.data?.isBookmarked);
      setBookmarkStories(response?.data?.bookmarkStories);
      enqueueSnackbar(response?.data?.message, { variant: "success" });
    }
    else {
      enqueueSnackbar(response?.data?.message, { variant: "error" });
    }
  };

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

  function copyUrl() {
    const baseUrl = window.location.origin;

    navigator.clipboard.writeText(`${baseUrl}/shared/${storyId}`)
    .then(() => {
      enqueueSnackbar("Link Copied", { variant: "success" });
    })
    .catch(() => {
      enqueueSnackbar("Error", { variant: "error" });
    });
  }

  //handle Share Function
  const handleShare = () => {
    copyUrl();
    // setMenuToggle(false);
  };

  return (
    <>
      <div className={styles.modalWrapper}></div>
      <div className={styles.storyContainer}>
        <img
          src="/./assets/icons/leftArrow.svg"
          className={styles.storyArrow}
          onClick={handlePrevious}
        />
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
                onClick={() => setStoryState(false)}
              />
              <img
                src="/./assets/icons/share.svg"
                height={18}
                onClick={handleShare}
              />
            </div>
            <div className={styles.storyBottom}>
              <div className={styles.storyText}>
                <h2>{slides[currentStoryIndex]?.heading}</h2>
                <p>{slides[currentStoryIndex]?.description}</p>
              </div>
              <div className={styles.storyBottomIcon}>
                {/* bookmark button */}

                {isLoggedIn ? (
                  isBookmarked === true ? (
                    <img
                      src={blueBookmark}
                      height={25}
                      onClick={handleAddBookmark}
                    />
                  ) : (
                    <img
                      src="/./assets/icons/bookMark.svg"
                      height={25}
                      onClick={handleAddBookmark}
                    />
                  )
                ) : (
                  <img
                    src="/./assets/icons/bookMark.svg"
                    height={25}
                    onClick={() => {
                      setStoryState(false);
                      setLoginModal(true);
                    }}
                  />
                )}

                <div style={{ display: "flex", alignItems: "center" }}>
                  {isLoggedIn ? (
                    isLiked ? (
                      <img src={redHeart} height={25} onClick={handleLike} />
                    ) : (
                      <img
                        src="/./assets/icons/like.svg"
                        height={25}
                        onClick={handleLike}
                      />
                    )
                  ) : (
                    <img
                      src="/./assets/icons/like.svg"
                      height={25}
                      onClick={() => {
                        setStoryState(false);
                        setLoginModal(true);
                      }}
                    />
                  )}
                  <span className={styles.likeCount}>{likeArray?.length}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <img
          src="/./assets/icons/rightArrow.svg"
          className={styles.storyArrow}
          onClick={handleNext}
        />
      </div>
      
    </>
  );
}
