import axios from "axios";

const API = "https://api.freeapi.app/api/v1/public/randomusers?page=1&limit=10";

export const getMovieData = async () => {
  try {
    const res = await axios.get(API);
    console.log(res);
    return res;
  } catch (error) {
    console.log(error);
  }
};
