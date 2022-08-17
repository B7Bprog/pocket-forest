import axios from "axios";

export const pocketForestApi = axios.create({
  baseURL: `https://pocket-forest.herokuapp.com/api`,
});

export const getUsers = () => {
  return pocketForestApi.get(`/all-users`).then(({ data }) => {
    return data;
  });
};

export const getTrees = () => {
  return pocketForestApi.get(`all-trees`).then(({ data }) => {
    return data;
  });
};
