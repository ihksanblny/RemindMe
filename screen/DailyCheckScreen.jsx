// screen/DailyCheckScreen.jsx
import React, { useState, useEffect, useRef } from 'react'; // Tambahkan useEffect dan useRef
import {
  View,
  Text,
  Switch,
  StyleSheet,
  SafeAreaView,
  Platform,
  Animated, // <-- 1. Import Animated
  TouchableOpacity, // Untuk menutup pop-up
  Modal, // Untuk efek pop-up yang lebih baik
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import COLORS from '../constant/colors'; // Sesuaikan path jika perlu

const DailyCheckScreen = () => {
  const [checked, setChecked] = useState(false);
  const [showPopup, setShowPopup] = useState(false); // State untuk mengontrol visibilitas pop-up

  // 2. Animated value untuk opacity dan scale
  const scaleValue = useRef(new Animated.Value(0)).current; // Mulai dari skala 0
  const opacityValue = useRef(new Animated.Value(0)).current; // Mulai dari opacity 0

  const handleCheckChange = (newValue) => {
    setChecked(newValue);
    if (newValue) {
      setShowPopup(true);
      // Animasi saat pop-up muncul
      Animated.parallel([
        Animated.spring(scaleValue, {
          toValue: 1,
          friction: 5, // Efek pegas
          useNativeDriver: true,
        }),
        Animated.timing(opacityValue, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();

      // Sembunyikan pop-up setelah beberapa detik
      setTimeout(() => {
        closePopup();
      }, 2500); // Pop-up akan hilang setelah 2.5 detik
    }
  };

  const closePopup = () => {
    // Animasi saat pop-up menghilang
    Animated.parallel([
      Animated.timing(scaleValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(opacityValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => setShowPopup(false)); // Set showPopup ke false setelah animasi selesai
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.card}>
          <Ionicons 
            name={checked ? "checkmark-circle" : "help-circle-outline"} 
            size={60} 
            color={checked ? COLORS.success : COLORS.primary} 
            style={styles.icon} 
          />
          <Text style={styles.title}>Cek Harian</Text>
          <Text style={styles.text}>Apakah kamu sudah olahraga hari ini?</Text>
          <Switch
            trackColor={{ false: '#d1d5db', true: COLORS.primaryLight || '#a7f3d0' }}
            thumbColor={checked ? COLORS.primary : '#f4f3f4'}
            ios_backgroundColor="#d1d5db"
            onValueChange={handleCheckChange} // Gunakan handler baru
            value={checked}
            style={styles.switch}
          />
        </View>
      </View>

      {/* 3. Komponen Pop-up menggunakan Modal */}
      <Modal
        transparent={true}
        visible={showPopup}
        animationType="none" // Kita akan handle animasi secara manual
        onRequestClose={closePopup} // Untuk tombol back Android
      >
        <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={closePopup}>
          <Animated.View 
            style={[
              styles.popupContainer,
              { 
                opacity: opacityValue, // Terapkan animasi opacity
                transform: [{ scale: scaleValue }] // Terapkan animasi scale
              }
            ]}
          >
            <Ionicons name="sparkles" size={40} color={COLORS.white} />
            <Text style={styles.popupText}>Luar biasa!</Text>
            <Text style={styles.popupSubText}>Sudah dicek hari ini.</Text>
          </Animated.View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background || '#f0fdf4',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: COLORS.surface || '#ffffff',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    width: '100%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  icon: {
    marginBottom: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: COLORS.primaryDark,
    marginBottom: 12,
    textAlign: 'center',
  },
  text: {
    fontSize: 17,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 24,
  },
  switch: {
    transform: Platform.OS === 'ios' ? [{ scaleX: 1.2 }, { scaleY: 1.2 }] : [{ scaleX: 1.5 }, { scaleY: 1.5 }],
    marginBottom: 20,
  },
  // Style untuk Modal Pop-up
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)', // Latar belakang semi-transparan
    justifyContent: 'center',
    alignItems: 'center',
  },
  popupContainer: {
    width: '70%',
    maxWidth: 300,
    backgroundColor: COLORS.primary, // Warna pop-up
    padding: 25,
    borderRadius: 20, // Sudut lebih bulat
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 10,
  },
  popupText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.white,
    marginTop: 10,
    textAlign: 'center',
  },
  popupSubText: {
    fontSize: 16,
    color: COLORS.white,
    marginTop: 4,
    textAlign: 'center',
  }
});

export default DailyCheckScreen;