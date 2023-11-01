import React, { useEffect, useState } from 'react';
import { View, StatusBar, useColorScheme } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { theme } from './src/core/theme';
import { Provider } from 'react-native-paper';
import BottomTabNavigator from './src/navigation/BottomTabNavigator';
import AuthStackNavigator from './src/navigation/stackNavigators/AuthStackNavigator';
import { navigationRef } from './src/navigation/stackNavigators/RootNavigation';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import auth from '@react-native-firebase/auth';
import { LogBox } from 'react-native';
import { en, registerTranslation } from 'react-native-paper-dates';
import SplashScreen from './src/screens/home/SplashScreen';

LogBox.ignoreAllLogs(true);
registerTranslation('en', en);

function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  const Stack = createNativeStackNavigator();
  const isDarkMode = useColorScheme() === 'dark';

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  // Define the duration of the splash screen in milliseconds (e.g., 2000ms = 2 seconds)
  const splashScreenDuration = 500000;

  // Use setTimeout to navigate to the appropriate screen after the splash screen duration
  useEffect(() => {
    const splashScreenTimer = setTimeout(() => {
      setInitializing(false); // End the splash screen
    }, splashScreenDuration);

    // Clear the timer if the component unmounts to avoid memory leaks
    return () => clearTimeout(splashScreenTimer);
  }, []);

  return (
    <Provider theme={theme}>
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        <NavigationContainer ref={navigationRef}>
          {initializing ? (
            <SplashScreen />
          ) : !user ? (
            <Stack.Navigator
              screenOptions={{
                headerShown: false,
              }}>
              <Stack.Screen name="Auth" component={AuthStackNavigator} />
            </Stack.Navigator>
          ) : (
            <Stack.Navigator
              screenOptions={{
                headerShown: false,
              }}>
              <Stack.Screen name="Root" component={BottomTabNavigator} />
            </Stack.Navigator>
          )}
        </NavigationContainer>
      </View>
    </Provider>
  );
}

export default App;
