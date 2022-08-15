const app = require("../../PocketForestApi/app");

import axios from "axios";
let user;

axios.get("/api/all-users").then((result) => {
  console.log(result, "<<< Result here");
  user = result;
});

exports.getCurrentUser = () => {
  return user;
};

exports.setCurrentUser = (newUser = {}) => {
  user = newUser;
  return user;
};
