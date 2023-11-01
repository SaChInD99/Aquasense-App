import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WaterQualityHomeScreen from '../../screens/water';
import PredictionOutputScreen from '../../screens/water/PredictionOutputScreen';
import PredictedWaterQualityScreen from '../../screens/water/PredictedWaterQualityScreen';

const Stack = createNativeStackNavigator();

const WaterQualityStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="HomeScreen" component={WaterQualityHomeScreen} />
      {/* <Stack.Screen name="HomeScreen" component={PredictedWaterQualityScreen} /> */}
      <Stack.Screen
        name="PredictionOutputScreen"
        component={PredictionOutputScreen}
      />
      <Stack.Screen
        name="PredictedWaterQualityScreen"
        component={PredictedWaterQualityScreen}
      />
    </Stack.Navigator>
  );
};

export default WaterQualityStackNavigator;
