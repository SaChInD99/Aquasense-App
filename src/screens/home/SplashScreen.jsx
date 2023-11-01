// SplashScreen.js
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';


const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('./logo.png')} // Replace with your splash image
        style={styles.splashImage}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // Use your app's primary color
    justifyContent: 'center',
    alignItems: 'center',
  },
  splashImage: {
    width: 200, // Adjust the width and height as needed
    height: 200,
  },
});

export default SplashScreen;
