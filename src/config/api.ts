import axios, { AxiosInstance } from 'axios';

export const apiURL = "http://localhost:3000/api";
// const nextURL = "https://laboras-api.vercel.app/api";

export const api: AxiosInstance = axios.create({
  baseURL: apiURL,
  headers: {
    "Content-type": "application/json",
  },
});
