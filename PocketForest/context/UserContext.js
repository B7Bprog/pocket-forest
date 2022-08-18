import axios from "axios";
const pocketForestApi = axios.create({
  baseURL: "https://pocket-forest-api.herokuapp.com/api",
});

let user;

pocketForestApi.get("/all-users").then((result) => {
  user = result.data;
});

exports.getCurrentUser = () => {
  return user;
};

exports.setCurrentUser = (newUser = {}) => {
  user = newUser;
  return user;
};
