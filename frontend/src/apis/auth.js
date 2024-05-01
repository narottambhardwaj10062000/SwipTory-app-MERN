import axios from "axios";

const backendURL = "http://localhost:7000/api/v1/auth";

export const authLogin = async ({ userName, password }) => {
  try {
    const reqURL = `${backendURL}/login`;
    const reqPayload = { userName, password };
    const response = await axios.post(reqURL, reqPayload);
    return response;
  } catch (error) {
    return error?.response;
  }
};

export const authRegister = async ({ userName, password }) => {
  try {
    const reqURL = `${backendURL}/register`;
    const reqPayload = { userName, password };
    const response = await axios.post(reqURL, reqPayload);
    return response;
  } catch (error) {
    return error?.response;
  }
};

export const checklogin = async () => {
  try {
    const reqURL = `${backendURL}/protected`;

    const token = JSON.parse(localStorage.getItem("token"));
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const response = await axios.get(reqURL);
    return response;
  } catch (error) {
    return error?.response;
  }
};