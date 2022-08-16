import axios from "axios";

export const pocketForestApi = axios.create({
    baseURL: `https://pocket-forest-api.herokuapp.com/api`
})

export const getUsers = () => {
    return pocketForestApi.get(`/all-users`)
    .then(({data}) => {
        return data
    })
}








