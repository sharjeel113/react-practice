import axios from "axios";
import { useEffect } from "react";
import API from "../core/apis";

const movies = () => {
  const response = API();
  console.log(response.body);

  return <h1>movie</h1>;
};

export default movies;
