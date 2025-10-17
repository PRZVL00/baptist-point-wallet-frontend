import api from "./axiosConfig"; // use your axios instance with JWT interceptor

export const getRecentActivity = async () => {
  try {
    const response = await api.get("recent-activity/"); // baseURL already set
    return response.data;
  } catch (error) {
    console.error("Error fetching recent activity:", error);
    return [];
  }
};
