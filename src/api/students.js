// api/studentService.js
import api from "./axiosConfig";  // 👈 import the shared axios instance

export const fetchStudents = async () => {
  const res = await api.get("students/"); // use the shared config
  return res.data;
};

export const registerStudent = async (studentData) => {
  const res = await api.post("students/", studentData);
  return res.data;
};
