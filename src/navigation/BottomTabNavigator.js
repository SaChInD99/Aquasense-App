import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeStackNavigator from './stackNavigators/HomeStackNavigator';
import SettingsStackNavigator from './stackNavigators/SettingsStackNavigator';
import LocationStackNavigator from './stackNavigators/LocationStackNavigator';
import ChemicalsStackNavigator from './stackNavigators/ChemicalStackNavigator';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { theme } from '../core/theme';
import WaterQualityStackNavigator from './stackNavigators/WaterQualityStackNavigator';

const Tab = createBottomTabNavigator();

const screenOptions = (route, color) => {
  let iconName;

  switch (route.name) {
    case 'Home':
      iconName = 'home';
      break;
    case 'Map':
      iconName = 'google-maps';
      break;
    case 'Chemicals':
      iconName = 'test-tube';
      break;
    case 'WaterQuality':
      iconName = 'water';
      break;
    case 'Settings':
      iconName = 'menu';
      break;
    default:
      break;
  }

  return <Icon name={iconName} color={color} size={30} />;
};

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => screenOptions(route, color),
        headerShown: false,
        tabBarStyle: {
          // backgroundColor: '#213B71',
          backgroundColor: theme.colors.tabBarBackground,
          // backgroundColor: '#7b6bc3',
          borderTopColor: theme.colors.inactive,
          height: 70,
        },
        tabBarActiveTintColor: theme.colors.active,
        tabBarInactiveTintColor: theme.colors.inactive,
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
      })}
      initialRouteName="Home">
      <Tab.Screen name="Home" component={HomeStackNavigator} />
      <Tab.Screen name="Map" component={LocationStackNavigator} />
      <Tab.Screen name="Chemicals" component={ChemicalsStackNavigator} />
      <Tab.Screen name="WaterQuality" component={WaterQualityStackNavigator} />
      <Tab.Screen name="Settings" component={SettingsStackNavigator} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
