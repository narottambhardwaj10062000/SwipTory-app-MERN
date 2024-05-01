import React from "react";
import styles from "./AddStoryModal.module.css";
import roundedCrossIcon from "../../assets/Icons/roundedCrossIcon.svg";
import { useState } from "react";
import AddStoryForm from "../../components/AddStoryForm/AddStoryForm";
import { postStory } from "../../apis/story";
import { useSnackbar } from "notistack";

const AddStoryModal = ({ setAddStoryModal, setAllStories }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("");
  console.log(selectedCategory);

  const [slideArray, setSlideArray] = useState([
    { heading: "", description: "", imgUrl: "", category: "" },
    { heading: "", description: "", imgUrl: "", category: "" },
    { heading: "", description: "", imgUrl: "", category: "" },
  ]);

  
  // handling add
  const handleAdd = () => {
    slideArray.length <= 5
      ? setSlideArray([
          ...slideArray,
          {
            heading: "",
            description: "",
            imgUrl: "",
            category: slideArray[0].category,
          },
        ])
      : null;
  };

  const handlePrev = () => {
    if (selectedIndex >= 1) {
      setSelectedIndex(selectedIndex - 1);
    }
  };

  const handleNext = () => {
    if (selectedIndex < slideArray.length - 1 && selectedIndex < 6) {
      setSelectedIndex(selectedIndex + 1);
    }
  };

  // console.log(slide);

  const handleCancel = () => {
    setAddStoryModal(false);
  };

  const handleCross = (index) => {
    const newArray = slideArray.filter((item, idx) => {
      return idx !== index;
    });

    setSlideArray(newArray);
  };

  // handling post story API
  const handlePostStory = async () => {
    const validationArray = slideArray?.filter((story) => !story.imgUrl || !story.category || !story.description || !story.heading);

    // console.log(validationArray);

    if(validationArray?.length === 0) {
      const response = await postStory(slideArray);
      // console.log(response);
      if(response?.status === 200){
        setAllStories(response?.data);
        setAddStoryModal(false);
        enqueueSnackbar(response?.data?.message, { variant: "success" });
      }
      else{
        enqueueSnackbar(response?.data?.message, { variant: "error" });
      }
    }
    else {
      enqueueSnackbar("Fill all the fields", { variant: "error" });
    }
  };

  // console.log(data);

  return (
    <>
      <div className={styles.addStoryModalWrapper}></div>

      <div className={styles.addStoryContainer}>
        <div className={styles.cancelContainer}>
          <img src={roundedCrossIcon} onClick={handleCancel} />
        </div>

        <h1 className={styles.mobileTitle}>Add story to feed</h1>

        {/* ----------------------------------------- */}
        <div className={styles.mainContainer}>
        
          <div className={styles.slidesContainer}>
            {slideArray.map((slide, index) => {
              return (
                <div className={styles.slides} onClick={() => setSelectedIndex(index)}>
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
                slideArray.length >= 6
                  ? { display: "none" }
                  : { display: "flex" }
              }
            >
              <p>Add +</p>
            </div>
          </div>

          {/* Add Story Form */}
          <AddStoryForm
            selectedIndex={selectedIndex}
            slideArray={slideArray}
            setSlideArray={setSlideArray}
            setSelectedCategory={setSelectedCategory}
            selectedCategory={selectedCategory}
          />
        </div>
        {/* -------------------------------------------- */}

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
              onClick={handlePostStory}
            >
              Post
            </button>
          </div>

        </div>
      </div>
    </>
  );
};

export default AddStoryModal;
