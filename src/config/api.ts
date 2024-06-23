import axios, { AxiosInstance } from 'axios';

const nextURL = "http://localhost:3000/api";
// const nextURL = "https://laboras-api.vercel.app/api";

export const api: AxiosInstance = axios.create({
  baseURL: nextURL,
  headers: {
    "Content-type": "application/json",
  },
});
