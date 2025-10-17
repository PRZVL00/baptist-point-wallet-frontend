// api/teacherStats.js
import api from './axiosConfig';

/**
 * Fetch teacher dashboard statistics
 * @returns {Promise} Statistics data including students, points, etc.
 */
export const fetchTeacherStats = async () => {
  try {
    const response = await api.get('teacher/stats/');
    return response.data;
  } catch (error) {
    console.error('Error fetching teacher stats:', error);
    throw error;
  }
};

/**
 * Fetch recent transactions for the dashboard
 * @param {number} limit - Number of transactions to fetch
 * @returns {Promise} Recent transactions data
 */
export const fetchRecentTransactions = async (limit = 10) => {
  try {
    const response = await api.get(`teacher/recent-transactions/?limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching recent transactions:', error);
    throw error;
  }
};