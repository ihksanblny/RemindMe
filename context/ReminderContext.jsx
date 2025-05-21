// ReminderContext.js
import React, { createContext, useState } from 'react';

export const ReminderContext = createContext();

export const ReminderProvider = ({ children }) => {
  const [reminders, setReminders] = useState([
    { id: '1', title: 'Minum Air Pagi' },
    { id: '2', title: 'Stretching 5 Menit' },
    { id: '3', title: 'Cek Detak Jantung' },
  ]);

  return (
    <ReminderContext.Provider value={{ reminders, setReminders }}>
      {children}
    </ReminderContext.Provider>
  );
};
