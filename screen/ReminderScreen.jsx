// ReminderScreen.js
import React, { useContext } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { ReminderContext } from '../context/ReminderContext';

export default function ReminderScreen() {
  const { reminders } = useContext(ReminderContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reminder Hari Ini</Text>
      <FlatList
        data={reminders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Text style={styles.item}>• {item.title}</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'white',
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  item: {
    fontSize: 16,
    marginVertical: 5,
  },
});
