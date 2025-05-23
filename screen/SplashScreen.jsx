import React, { useEffect } from 'react';
import { View, Image, ActivityIndicator, StyleSheet, Dimensions } from 'react-native';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('MainAppTabs'); // Ganti 'MainTabs' dengan nama screen utama Anda
    }, 2000);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/logo/logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <ActivityIndicator size="large" color="#10b981" />
    </View>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0fdf4',
    paddingHorizontal: 20,
  },
  logo: {
    width: width * 0.6,
    height: width * 0.6,
    marginBottom: 30,
  },
});

export default SplashScreen;
