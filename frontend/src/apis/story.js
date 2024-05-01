import axios from "axios";
const backendURL = "http://localhost:7000/api/v1/story";

export const postStory = async (slides) => {
  try {
    const reqUrl = `${backendURL}/create`;
    const reqPayload = { slides };

    //setting header
    const token = JSON.parse(localStorage.getItem("token"));
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const response = await axios.post(reqUrl, reqPayload);
    return response;
  } catch (error) {
    return error?.response;
  }
};

export const getAllStories = async (category) => {
  try {
    const reqUrl = `${backendURL}/all?category=${category}`;
  
    const response = await axios.get(reqUrl);
    return response;
  } catch (error) {
    return error?.response;
  }
};

export const getStoryDetail = async (_id) => {
  try {
    const reqUrl = `${backendURL}/${_id}`;

    const response = await axios.get(reqUrl);
    return response;
  } catch (error) {
    return error?.response;
  }
};

// Get All My Stories
export const getMyStories = async () => {
  try {
    const reqUrl = `${backendURL}/mystories`;

    //setting header
    const token = JSON.parse(localStorage.getItem("token"));
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const response = await axios.get(reqUrl);
    return response;
  } catch (error) {
    return error?.response;
  }
};

export const editStory = async (_id, slides) => {
  try {
    const reqUrl = `${backendURL}/edit/${_id}`
    const reqPayload = {slides};

    const response = await axios.put(reqUrl, reqPayload);
    return response;
  } catch ( error ) {
    return error?.response;
  }
}

export const getLikeCount = async (_id) => {
  try {
    const reqUrl = `${backendURL}/like/${_id}`;

    //setting header
    const token = JSON.parse(localStorage.getItem("token"));
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const response = await axios.put(reqUrl);
    return response;
  } catch (error) {
    return error?.response;
  }
};

export const getIsLiked = async (_id) => {
  try {
    const reqUrl = `${backendURL}/likedornot/${_id}`;

    //setting header
    const token = JSON.parse(localStorage.getItem("token"));
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const response = await axios.get(reqUrl);
    return response;
    } catch (error) {
      return error?.response;
   }
};
