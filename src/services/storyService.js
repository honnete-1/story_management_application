import axios from "axios";

const API_URL = "https://sms-express-app-1-production-a843.up.railway.app/api/stories";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// CREATE
export const createStory = async (story) => {
  const response = await api.post("/", story);
  return response.data;
};

// READ ALL
export const getStories = async () => {
  const response = await api.get("/");
  return response.data;
};

// READ ONE
export const getStoryById = async (id) => {
  const response = await api.get(`/${id}`);
  return response.data;
};

// UPDATE
export const updateStory = async (id, story) => {
  const response = await api.put(`/${id}`, story);
  return response.data;
};

// DELETE
export const deleteStory = async (id) => {
  const response = await api.delete(`/${id}`);
  return response.data;
};
