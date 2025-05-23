// screen/ReminderScreen.jsx
import React, { useContext } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  StyleSheet, 
  SafeAreaView, 
  Platform 
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native';
import { ReminderContext } from '../context/ReminderContext';
import COLORS from '../constant/colors';

// Fungsi tidak perlu menerima 'navigation' lagi
const ReminderScreen = ({navigation}) => {
  const { reminders } = useContext(ReminderContext);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('ReminderDetail', { reminderId: item.id })}
      activeOpacity={0.7}
    >
      <View style={styles.itemContainer}>
        <Ionicons name={item.icon || "notifications-outline"} size={24} color={COLORS.primary} style={styles.itemIcon} />
        <Text style={styles.itemText}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Judul dan tombol yang sebelumnya di sini, sekarang DIHAPUS */}
        {reminders && reminders.length > 0 ? (
          <FlatList
            data={reminders}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
            contentContainerStyle={styles.listContentContainer}
          />
        ) : (
          <View style={styles.emptyContainer}>
            <Ionicons name="archive-outline" size={60} color={COLORS.textSecondary} />
            <Text style={styles.emptyText}>Belum ada pengingat.</Text>
            <Text style={styles.emptySubText}>Tekan tombol '+' di pojok kanan atas untuk menambah.</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background, // Background untuk seluruh layar
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 16, // Memberi sedikit jarak dari header
  },
  listContentContainer: {
    paddingBottom: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    paddingVertical: 18,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  itemIcon: {
    marginRight: 16,
  },
  itemText: {
    fontSize: 17,
    color: COLORS.text,
    fontWeight: '500',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 50,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.textSecondary,
    marginTop: 16,
    textAlign: 'center',
  },
  emptySubText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 8,
    textAlign: 'center',
    maxWidth: '80%',
  }
});

export default ReminderScreen;