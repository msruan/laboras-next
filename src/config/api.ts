import axios, { AxiosInstance } from 'axios';

export const apiURL = ()=>(process.env.SERVER_URL + "/api");
// const nextURL = "https://laboras-api.vercel.app/api";

export const api: AxiosInstance = axios.create({
  baseURL: apiURL(),
  headers: {
    "Content-type": "application/json",
  },
});
