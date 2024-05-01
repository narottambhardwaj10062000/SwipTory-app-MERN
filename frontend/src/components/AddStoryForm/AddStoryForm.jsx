import React from "react";
import { useState } from "react";
import styles from "./AddStoryForm.module.css";


const AddStoryForm = ({ selectedIndex, slideArray, setSlideArray, setSelectedCategory, selectedCategory }) => {

//handle heading change
const handleChange = (e) => {

    if(e.target.name === "category") {
        const newArray = slideArray.map((item, index) => {
            return {...item, category: e.target.value};
        })

        setSlideArray(newArray);
    }
    else {
        const newArray = slideArray.map((item, index) => {
            // console.log(index);
            return index === selectedIndex ? {...item, [e.target.name]: e.target.value} : item;
        })
    
        setSlideArray(newArray);
    }
    
}

  return (
    <div>
      <div className={styles.content}>
        <div className={styles.smallContent}>
          <label>Heading :</label>
          <input
            className={styles.inputField}
            type="text"
            name="heading"
            placeholder="Your heading"
            value={slideArray[selectedIndex].heading}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.smallContent}>
          <label>Description :</label>
          <textarea
            className={styles.textField}
            type="text"
            name="description"
            placeholder="Story Description"
            value={slideArray[selectedIndex].description}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.smallContent}>
          <label>Image :</label>
          <input
            className={styles.inputField}
            type="text"
            name="imgUrl"
            placeholder="Add Image url"
            value={slideArray[selectedIndex].imgUrl}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.smallContent}>
          <label>Category :</label>
          <select
            name="category"
            value={slideArray[selectedIndex].category}
            // value={selectedCategory}
            onChange={handleChange}
            className={styles.selectTag}
            required
          >
            <option value="" disabled selected hidden>
              Select category
            </option>
            <option value="food">food</option>
            <option value="health">health</option>
            <option value="travel">travel</option>
            <option value="movies">movies</option>
            <option vlaue="education">education</option>
          </select>
        </div>

        
      </div>
    </div>
  );
};

export default AddStoryForm;