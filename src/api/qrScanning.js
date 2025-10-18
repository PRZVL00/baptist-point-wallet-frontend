// api/qrScanning.js
import api from "./axiosConfig"; // use your axios instance with JWT interceptor

/**
 * Fetch student details by QR code value
 * POST /students/scan-qr/
 */
export const getStudentByQR = async (qrValue) => {
  try {
    const response = await api.post('/students/scan-qr/', { 
      qr_value: qrValue 
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching student by QR:', error);
    throw error;
  }
};

/**
 * Award points to a student
 * POST /students/award-points/
 */
export const awardPointsToStudent = async (studentId, points, reason, isDeduction = false) => {
  try {
    const response = await api.post('/students/award-points/', {
      student_id: studentId,
      points: points,
      reason: reason,
      is_deduction: isDeduction  // NEW PARAMETER
    });
    return response.data;
  } catch (error) {
    console.error('Error managing points:', error);
    throw error;
  }
};