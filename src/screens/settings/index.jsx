import React from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import auth from '@react-native-firebase/auth';
import { theme } from '../../core/theme';

const SettingsScreen = ({ navigation }) => {
  const signout = () => {
    auth()
      .signOut()
      .catch(err => {
        console.log('error while signout!', err);
      });
  };

  return (
    <View style={styles.content}>
      {/* <Pressable
        onPress={() => {
          signout();
        }}
        style={styles.row}>
        <Icon name="logout" color={theme.colors.primary} size={40} />
        <Text style={styles.text}>Logout</Text>
      </Pressable> */}
      <Pressable
        onPress={() => {
          navigation.navigate('Map', {
            screen: 'DiagnoseHomeScreen',
          });
        }}
        style={styles.row}>
        <Icon name="chart-bell-curve" color={theme.colors.primary} size={40} />
        <Text style={styles.text}>Future Forecasting</Text>
      </Pressable>
      <Pressable
        onPress={() => {
          navigation.navigate('Map', {
            screen: 'PredictionDetailsScreen',
          });
        }}
        style={styles.row}>
        <Icon name="virus-outline" color={theme.colors.primary} size={40} />
        <Text style={styles.text}>Current Disease Risk</Text>
      </Pressable>
      <Pressable
        onPress={() => {
          navigation.navigate('Map', {
            screen: 'DiseasesHomeScreen',
          });
        }}
        style={styles.row}>
        <Icon
          name="information-variant"
          color={theme.colors.primary}
          size={40}
        />
        <Text style={styles.text}>Disease Details</Text>
      </Pressable>
      <Pressable
        onPress={() => {
          navigation.navigate('Map', {
            screen: 'AddToMapScreen',
          });
        }}
        style={styles.row}>
        <Icon name="map-marker-plus" color={theme.colors.primary} size={40} />
        <Text style={styles.text}>Report Disease</Text>
      </Pressable>
      <Pressable
        onPress={() => {
          signout();
        }}
        style={styles.row}>
        <Icon name="logout" color={theme.colors.primary} size={40} />
        <Text style={styles.text}>Logout</Text>
      </Pressable>
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  content: {
    flex: 1,
    padding: 30,
    width: '100%',
    backgroundColor: '#FFFFFF',
    gap: 30,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  text: {
    fontSize: 22,
    color: theme.colors.black,
  },
});
