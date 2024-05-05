// api.js

import axios from 'axios';

const API_BASE_URL = 'http://192.168.0.164:5000'; // Replace with your actual backend API URL

// Function to handle GET request
export const get = async (route:any) => { 
  try {
    const response = await axios.get(`${API_BASE_URL}${route}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function to handle POST request
export const post = async (route:any, data:any) => {
  try {
    const response = await axios.post(`${API_BASE_URL}${route}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function to handle PUT request
export const put = async (route:any, data:any) => {
  try {
    const response = await axios.put(`${API_BASE_URL}${route}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function to handle DELETE request
export const del = async (route:any) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}${route}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
