import axios from "axios";
import { apiHost } from "@/utils/host";
import { indexedStorageDB } from "@/utils/local-forage";

const signup = (
  firstName: string,
  lastName: string,
  username: string,
  email: string,
  password: string
) => {
  return axios
    .post("/auth/signup", {
      firstName,
      lastName,
      username,
      email,
      password,
    })
    .then((response) => {
      return response.data;
    });
};

const login = (email: string, password: string) => {
  return axios
    .post("/auth/signin", {
      email,
      password,
    })
    .then((response) => {
      return response.data;
    });
};

const logout = () => {
  indexedStorageDB.clear();
};

const authService = {
  signup,
  login,
  logout,
};

export default authService;
