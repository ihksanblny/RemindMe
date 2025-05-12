import React from 'react';
import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native';

const ReminderScreen = ({ route, navigation }) => {
  const { reminders } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reminder Hari Ini</Text>
      <FlatList
        data={reminders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text style={styles.reminderText}>• {item.title}</Text>
        )}
      />
      <Pressable style={styles.closeButton} onPress={() => navigation.goBack()}>
        <Text style={styles.closeButtonText}>Kembali</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: 'bold',
    color: '#047857',
    textAlign: 'center',
  },
  reminderText: {
    fontSize: 16,
    marginVertical: 2,
    color: '#065f46',
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#10b981',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  closeButtonText: { color: '#fff', fontWeight: 'bold' },
});

export default ReminderScreen;
