import axios from "axios";

const setAuthToken = token => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = token;


    console.log(token, "hhhh")
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

export default setAuthToken;
