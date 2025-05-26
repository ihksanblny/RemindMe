// ReminderContext.js
import React, { createContext, useState, useEffect } from 'react';
import { getReminders } from '../services/ReminderServices'; // pastikan path-nya sesuai

export const ReminderContext = createContext();

export const ReminderProvider = ({ children }) => {
  const [reminders, setReminders] = useState([]);

  const fetchReminders = async () => {
    try {
      const data = await getReminders();
      setReminders(data);
    } catch (error) {
      console.error('Gagal mengambil data pengingat:', error);
    }
  };

  useEffect(() => {
    fetchReminders();
  }, []);

  return (
    <ReminderContext.Provider value={{ reminders, setReminders, fetchReminders }}>
      {children}
    </ReminderContext.Provider>
  );
};
