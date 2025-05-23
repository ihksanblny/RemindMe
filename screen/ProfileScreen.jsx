// screen/ProfileScreen.jsx
import React, { useContext } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Image, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ReminderContext } from '../context/ReminderContext';
import COLORS from '../constant/colors';

const ProfileMenuItem = ({ icon, title, onPress }) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress} activeOpacity={0.7}>
    <View style={styles.menuItemIcon}>
      <Ionicons name={icon} size={24} color={COLORS.primary} />
    </View>
    <Text style={styles.menuItemText}>{title}</Text>
    <Ionicons name="chevron-forward-outline" size={22} color={COLORS.textSecondary} />
  </TouchableOpacity>
);

const ProfileScreen = ({ navigation }) => {
  const { reminders } = useContext(ReminderContext);

  const user = {
    name: 'Pengguna Sehat',
    age: 25,
    weight: 65,
    height: 170,
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View style={styles.profileHeader}>
            <Image source={{ uri: user.avatar }} style={styles.avatar} />
            <Text style={styles.userName}>{user.name}</Text>
            <Text style={styles.userBio}>Jaga kesehatan, raih kebahagiaan.</Text>
          </View>

          <View style={styles.statsContainer}>
            <View style={styles.statBox}><Text style={styles.statValue}>{reminders.length}</Text><Text style={styles.statLabel}>Pengingat</Text></View>
            <View style={styles.statBox}><Text style={styles.statValue}>{user.weight} <Text style={{fontSize: 14}}>kg</Text></Text><Text style={styles.statLabel}>Berat</Text></View>
            <View style={styles.statBox}><Text style={styles.statValue}>{user.height} <Text style={{fontSize: 14}}>cm</Text></Text><Text style={styles.statLabel}>Tinggi</Text></View>
          </View>

          <View style={styles.menuWrapper}>
            <ProfileMenuItem icon="person-circle-outline" title="Edit Profil" onPress={() => navigation.navigate('EditProfile', { user })} />
            <ProfileMenuItem icon="notifications-outline" title="Pengaturan Notifikasi" onPress={() => alert('Fitur Pengaturan akan datang!')} />
            <ProfileMenuItem icon="information-circle-outline" title="Tentang Aplikasi" onPress={() => alert('Aplikasi RemindMe v1.0')} />
            <ProfileMenuItem icon="log-out-outline" title="Keluar" onPress={() => alert('Fitur Keluar akan datang!')} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.background },
  container: { padding: 20 },
  profileHeader: { alignItems: 'center', marginBottom: 24 },
  avatar: { width: 100, height: 100, borderRadius: 50, borderWidth: 3, borderColor: COLORS.primary, marginBottom: 16 },
  userName: { fontSize: 24, fontWeight: 'bold', color: COLORS.primaryDark },
  userBio: { fontSize: 14, color: COLORS.textSecondary, marginTop: 8 },
  statsContainer: { flexDirection: 'row', justifyContent: 'space-around', backgroundColor: COLORS.surface, padding: 20, borderRadius: 12, marginBottom: 24, elevation: 2 },
  statBox: { alignItems: 'center' },
  statValue: { fontSize: 20, fontWeight: 'bold', color: COLORS.primaryDark },
  statLabel: { fontSize: 12, color: COLORS.textSecondary, marginTop: 8 },
  menuWrapper: { backgroundColor: COLORS.surface, borderRadius: 12, elevation: 2, overflow: 'hidden' },
  menuItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 18, paddingHorizontal: 20, borderBottomWidth: 1, borderBottomColor: COLORS.background },
  menuItemIcon: { width: 40, height: 40, borderRadius: 20, backgroundColor: COLORS.background, justifyContent: 'center', alignItems: 'center', marginRight: 20 },
  menuItemText: { flex: 1, fontSize: 16, color: COLORS.text },
});

export default ProfileScreen;