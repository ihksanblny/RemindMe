import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';

const DailyCheckScreen = () => {
  const [checked, setChecked] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cek Harian</Text>
      <Text style={styles.text}>Apakah kamu sudah olahraga hari ini?</Text>
      <Switch value={checked} onValueChange={setChecked} />
      {checked && <Text style={styles.checked}>✅ Sudah dicek!</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  text: { fontSize: 16 },
  checked: { marginTop: 10, color: 'green' },
});

export default DailyCheckScreen;
