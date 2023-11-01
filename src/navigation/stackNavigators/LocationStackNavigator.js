import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MapScreen from '../../screens/map';
import DiagnoseHomeScreen from '../../screens/map/DiagnoseHomeScreen';
import DiseaseDetailsScreen from '../../screens/map/DiseaseDetailsScreen';
import AddToMapScreen from '../../screens/map/AddToMapScreen';
import DiseasesHomeScreen from '../../screens/map/DiseasesHomeScreen';
import PredictionDetailsScreen from '../../screens/map/PredictionDetailsScreen';

const Stack = createNativeStackNavigator();

const LocationStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="LocationScreen" component={MapScreen} />
      <Stack.Screen name="DiagnoseHomeScreen" component={DiagnoseHomeScreen} />
      <Stack.Screen
        name="DiseaseDetailsScreen"
        component={DiseaseDetailsScreen}
      />
      <Stack.Screen name="AddToMapScreen" component={AddToMapScreen} />
      <Stack.Screen name="DiseasesHomeScreen" component={DiseasesHomeScreen} />
      <Stack.Screen
        name="PredictionDetailsScreen"
        component={PredictionDetailsScreen}
      />
    </Stack.Navigator>
  );
};

export default LocationStackNavigator;
