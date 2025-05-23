// ReminderContext.js
import React, { createContext, useState } from 'react';

export const ReminderContext = createContext();
import Ionicons from 'react-native-vector-icons/Ionicons';

export const ReminderProvider = ({ children }) => {
  const [reminders, setReminders] = useState([]);

  return (
    <ReminderContext.Provider value={{ reminders, setReminders }}>
      {children}
    </ReminderContext.Provider>
  );
};
