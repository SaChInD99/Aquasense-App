import React, { useEffect, useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import MapView, { Marker, Callout } from 'react-native-maps';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { theme } from '../../core/theme';

const MapScreen = ({ navigation }) => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('locations')
      .onSnapshot(snapshot => {
        const locationList = [];
        snapshot.forEach(doc => {
          const {
            latitude,
            longitude,
            name,
            mobileNo,
            disease,
            species,
            timestamp,
          } = doc.data();
          locationList.push({
            latitude,
            longitude,
            name,
            mobileNo,
            disease,
            species,
            timestamp,
          });
        });
        setLocations(locationList);
      });

    return () => unsubscribe();
  }, []);

  return (
    <View style={{ flex: 4 }}>
      <MapView style={{ flex: 10 }}
      initialRegion={{
        latitude: 8.55,
        longitude: 80.41,
        latitudeDelta: 5.51,
        longitudeDelta: 0.0500
      }}>
        {locations.map((location, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: location?.latitude,
              longitude: location?.longitude,
            }}>
            <Callout>
              <View>
                <Text>Name: {location?.name}</Text>
                <Text>Contact Details: {location?.mobileNo}</Text>
                <Text>Disease Type: {location?.disease}</Text>
                <Text>Fish Species: {location?.species}</Text>
                <Text>
                  Date Reported: {location?.timestamp?.toDate()?.toDateString()}
                </Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>
      <View
        style={{
          width: 'full',
          position: 'absolute',
          bottom: 70,
          right: 26,
          flexDirection: 'column',
          gap: 10,
        }}>
        <Pressable
          style={{
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: theme.colors.blue,
            padding: 10,
            borderRadius: 50,
          }}
          onPress={() => navigation.navigate('AddToMapScreen')}>
          <Icon name={'plus'} color={'#FFF'} size={30} />
        </Pressable>
        <Pressable
          style={{
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: theme.colors.blue,
            padding: 10,
            borderRadius: 50,
          }}
          onPress={() => navigation.navigate('DiagnoseHomeScreen')}>
          <Icon name={'trending-up'} color={'#FFF'} size={30} />
        </Pressable>
      </View>
    </View>
  );
};

export default MapScreen;