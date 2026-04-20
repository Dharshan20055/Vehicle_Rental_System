import axios from "axios";
import authService from "./auth.service";

const API_URL = "http://localhost:8080/api/users/";

const createStaff = (username, email, password) => {
  const user = authService.getCurrentUser();
  return axios.post(
    API_URL + "staff",
    { username, email, password },
    {
      headers: {
        Authorization: "Bearer " + user.token,
      },
    }
  );
};

const userService = {
  createStaff,
};

export default userService;
