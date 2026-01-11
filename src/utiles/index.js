import axios from "axios";

const serverUrl = "http://https://altinity-server-1.onrender.com/";

export const api = axios.create({
  baseURL: `${serverUrl}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

export const setAuthToken = (token) => {
  // Check if token exists (handles null, undefined, or empty string)
  if (token) {
    // 1. Corrected 'common'
    api.defaults.headers.common["x-auth-token"] = token;
    localStorage.setItem("token", token);
  } else {
    // 2. Corrected 'common' and 3. Corrected 'removeItem'
    delete api.defaults.headers.common["x-auth-token"];
    localStorage.removeItem("token");
  }
};
export const getProfileImage = (userId) => `${serverUrl}/images/${userId}`;

export const getPostImage = (imagePath) => {
  if (!imagePath) return null;
  // If path already includes server URL, return as is
  if (imagePath.startsWith("http")) return imagePath;

  // Backend stores path as "public/Posts/filename.jpg"
  // Server serves static files from public folder, so we need to remove "public" prefix
  const cleanPath = imagePath.replace(/^public[\\/]/, "").replace(/\\/g, "/");
  return `${serverUrl}/${cleanPath}`;
};

export const formatDate = (date) => {
  return new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "long",
  }).format(new Date(date));
};
