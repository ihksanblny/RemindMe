// services/ReminderService.js
import axios from 'axios';

const BASE_URL = 'https://6833f907464b49963600ceda.mockapi.io/reminders'; // Ganti dengan URL MockAPI kamu

export const getReminders = async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
};

export const getReminderById = async (id) => {
  const response = await axios.get(`${BASE_URL}/${id}`);
  return response.data;
};

export const createReminder = async (reminders) => {
  const response = await axios.post(BASE_URL, reminders);
  return response.data;
};

export const updateReminder = async (id, updatedReminders) => {
  const response = await axios.put(`${BASE_URL}/${id}`, updatedReminders);
  return response.data;
};

export const deleteReminder = async (id) => {
  const response = await axios.delete(`${BASE_URL}/${id}`);
  return response.data;
};
