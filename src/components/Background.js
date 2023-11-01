import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  KeyboardAvoidingView,
  View,
  Dimensions,
} from 'react-native';
import { theme } from '../core/theme';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;
export default function Background({ children }) {
  return (
    <ImageBackground
      source={{
        uri: 'https://i.ibb.co/JkCMvpQ/0fc05777d3c5b33c0f08e4fdda51c3ea.jpg',
      }}
      resizeMode="cover"
      style={styles.background}>
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            width: width,
            height: height,
            backgroundColor: theme.colors.white,
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
            zIndex: -1,
            opacity: 0.7,
          }}
        />
        {children}
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: theme.colors.white,
    position: 'relative',
  },
  container: {
    flex: 1,
    padding: 20,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
