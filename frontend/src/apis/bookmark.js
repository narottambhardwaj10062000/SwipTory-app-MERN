import axios from "axios";
const backendURL = "http://localhost:7000/api/v1/bookmark";

export const addBookmark = async (storyId) => {
  try {
    const reqUrl = `${backendURL}/create/${storyId}`;

    //setting header
    const token = JSON.parse(localStorage.getItem("token"));
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const response = await axios.post(reqUrl);
    return response;
  } catch (error) {
    return error?.response;
  }
};

// checking whether bookmarked or not API

export const checkBookmark = async (storyId) => {
    try{
        const reqUrl = `${backendURL}/check/${storyId}`;

         //setting header
        const token = JSON.parse(localStorage.getItem("token"));
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        const response = await axios.get(reqUrl);
        return response;
    } catch ( error ) {
      return error?.response;
    }
}

// handle get all bookmarked stories API
export const getBookmarkedStories = async () => {
  try {
    const reqUrl = `${backendURL}/get/all`;

    //setting header
    const token = JSON.parse(localStorage.getItem("token"));
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const response = await axios.get(reqUrl);
    return response;    

  } catch ( error ) {
    return error?.response;
  }
}
