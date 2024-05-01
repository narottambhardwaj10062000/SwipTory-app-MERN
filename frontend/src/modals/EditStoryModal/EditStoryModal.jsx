import styles from "./EditStoryModal.module.css";
import React from "react";
import roundedCrossIcon from "../../assets/Icons/roundedCrossIcon.svg";
import { useState, useEffect } from "react";
// import AddStoryForm from "../../components/AddStoryForm/AddStoryForm";
import { getStoryDetail, editStory } from "../../apis/story";
import EditStoryForm from "../../components/EditStoryForm/EditStoryForm";
import { useStoryContextProvider } from "../../context/StoryContext";
import { useSnackbar } from "notistack";

const EditStoryModal = ({ setEditStoryModal, storyId }) => {
  //   console.log(storyId);
  const { enqueueSnackbar } = useSnackbar();
  const { allStories, setAllStories } = useStoryContextProvider();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [story, setStory] = useState({});
  const [slides, setSlides] = useState([]);
  console.log(slides);
  //   console.log(story);
  // console.log(selectedIndex);

  const handleCancel = () => {
    setEditStoryModal(false);
  };

  // handling add
  const handleAdd = () => {
    slides.length <= 5
      ? setSlides([
          ...slides,
          {
            heading: "",
            description: "",
            imgUrl: "",
            category: slides[0].category,
          },
        ])
      : null;
  };

  const handleCross = (index) => {
    const newArray = slides.filter((item, idx) => {
      return idx !== index;
    });

    setSlides(newArray);
  };

  const handlePrev = () => {
    if (selectedIndex >= 1) {
      setSelectedIndex(selectedIndex - 1);
    }
  };

  const handleNext = () => {
    if (selectedIndex < slides.length - 1 && selectedIndex < 6) {
      setSelectedIndex(selectedIndex + 1);
    }
  };

  //   ----------------------------------have to work on it
  const handleEditStory = async () => {
    const validationArray = slideArray?.filter(
      (story) =>
        !story.imgUrl || !story.category || !story.description || !story.heading
    );

    if (validationArray?.length === 0) {
      const response = await editStory(storyId, slides);
      // console.log(response);
      if (response?.status === 200) {
        setAllStories(response?.data);
        setEditStoryModal(false);
        enqueueSnackbar(response?.data?.message, { variant: "success" });
        // Here we will uodate all stories
      } else {
        enqueueSnackbar(response?.data?.message, { variant: "error" });
      }
    }
    else{
      enqueueSnackbar(response?.data?.message, { variant: "error" });
    }
  };
  //   ----------------------------------------------------

  const handleGetStoryDetails = async () => {
    const response = await getStoryDetail(storyId);
    // console.log(response);
    if (response?.status === 200) {
      setStory(response?.data?.storyDetail);
      setSlides(response?.data?.storyDetail?.slides);
    }
  };

  useEffect(() => {
    handleGetStoryDetails();
  }, []);

  return (
    <>
      <div className={styles.addStoryModalWrapper}></div>
      {/* <h1>This is Edit</h1> */}
      <div className={styles.addStoryContainer}>
        {/* cancel button */}
        <div className={styles.cancelContainer}>
          <img src={roundedCrossIcon} onClick={handleCancel} />
        </div>

        <h1 className={styles.mobileTitle}>Add story to feed</h1>

        {/* ------------------------------------------------------------ */}
        <div className={styles.mainContainer}>
          <div className={styles.slidesContainer}>
            {slides.map((slide, index) => {
              return (
                <div
                  className={styles.slides}
                  onClick={() => setSelectedIndex(index)}
                >
                  <p>Slide {index + 1}</p>
                  {/* {slideArray.length > 3 ? ( */}
                  <div
                    className={styles.cross}
                    style={
                      index <= 2 ? { display: "none" } : { display: "flex" }
                    }
                  >
                    <img
                      className={styles.crossImg}
                      src={roundedCrossIcon}
                      onClick={() => handleCross(index)}
                    />
                  </div>
                  {/* ) : null} */}
                </div>
              );
            })}

            <div
              className={styles.slides}
              onClick={handleAdd}
              style={
                slides.length >= 6 ? { display: "none" } : { display: "flex" }
              }
            >
              <p>Add +</p>
            </div>
          </div>

          {/* Add Story Form */}
          <EditStoryForm
            selectedIndex={selectedIndex}
            slides={slides}
            setSlides={setSlides}
          />
        </div>

        <div className={styles.btnContainer}>
          <div className={styles.leftBtn}>
            <button
              className={styles.btn}
              style={{ backgroundColor: " #7EFF73" }}
              onClick={handlePrev}
            >
              Previous
            </button>
            <button
              className={styles.btn}
              style={{ backgroundColor: " #73ABFF" }}
              onClick={handleNext}
            >
              Next
            </button>
          </div>

          <div className={styles.rightBtn}>
            <button
              className={styles.btn}
              style={{ backgroundColor: "#FF7373 " }}
              onClick={handleEditStory}
            >
              Post
            </button>
          </div>
        </div>

        {/* ------------------------------------------------------------ */}
      </div>
    </>
  );
};

export default EditStoryModal;
