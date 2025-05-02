import { AcademicFormData, LecturerFormData, StudentFormData } from "../types/register";
const API_BASE_URL = import.meta.env.VITE_API_URL;


export const registerStudent = async (data: StudentFormData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/user/student/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const text = await response.text();

    let result;
    try {
      result = JSON.parse(text); 
    } catch {
      result = { message: text }; 
    }

    if (!response.ok) {
      console.error("Registration failed:", result);
      throw new Error(result.message || "Failed to register student");
    }

    return result;
  } catch (error) {
    console.error("Error during student registration:", error);
    throw error;
  }
};


export const registerLecturer = async (data: LecturerFormData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/user/lecturer/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Failed to register lecturer");
    }

    return result;
  } catch (error) {
    console.error("Error during lecturer registration:", error);
    throw error;
  }
};

export const registerAcademic = async (data: AcademicFormData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/user/academic/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Failed to register academic");
    }

    return result;
  } catch (error) {
    console.error("Error during academic registration:", error);
    throw error;
  }
};