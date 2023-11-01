import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import database from '@react-native-firebase/database';

import Icon from 'react-native-vector-icons/Ionicons';
import FAIcon from 'react-native-vector-icons/FontAwesome5';
import { theme } from '../../core/theme';
import Button from '../../components/Button';
import { predictDisease } from '../../services/diseasePrediction.service';
import { Snackbar } from 'react-native-paper';
import WeatherComponent from './WeatherComponent';
// Import the WeatherWidget component

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

const HomeScreen = ({ navigation }) => {
  const [username, setUsername] = useState('user');
  const [dayInfo, setDayInfo] = useState({
    time: 'Morning',
    icon: 'partly-sunny',
  });
  const [phValue, setPhValue] = useState(0.0);
  const [temperature, setTemperature] = useState(0.0);
  const [turbidity, setTurbudity] = useState(0.0);
  const [waterCondition, setWaterCondition] = useState('Optimal');

  const [visible, setVisible] = useState(false);
  const [msg, setMsg] = useState('Oops... Something went wrong');

  const onToggleSnackBar = () => setVisible(!visible);

  const onDismissSnackBar = () => setVisible(false);

  const apiKey = 'db63784ca22e2ee8ed904af656c366c3';

  //set the daytime info in initial load
  useEffect(() => {
    let currentTime = new Date().getHours();

    if (currentTime >= 5 && currentTime < 12) {
      setDayInfo({ time: 'Morning', icon: 'partly-sunny' });
    } else if (currentTime >= 12 && currentTime < 17) {
      setDayInfo({ time: 'Afternoon', icon: 'sunny' });
    } else {
      setDayInfo({ time: 'Evening', icon: 'moon' });
    }
  }, []);

  //get the name of the logged in user in initial load
  useEffect(() => {
    readRDB();
    getUserDataFromFirestore();
  }, []);

  // function related to get the name of the logged in user
  const getUserDataFromFirestore = async () => {
    try {
      const user = auth().currentUser;
      const { uid } = user;

      // Get a reference to the Firestore document for the given userID in the 'users' collection
      const userDocRef = firestore().collection('users').doc(uid);

      // Fetch the user document data
      const userDoc = await userDocRef.get();

      if (userDoc.exists) {
        setUsername(userDoc.get('name'));
      } else {
        // console.log('User document not found.');
        onToggleSnackBar();
      }
    } catch (error) {
      onToggleSnackBar();
    }
  };

  const readRDB = () => {
    database()
      .ref('/test/stream/data/json')
      .once('value')
      .then(snapshot => {
        const { ph, temp, turbidity } = snapshot.val();

        predictDisease({ temp, ph, turbidity })
          .then(res => {
            setWaterCondition(res.data);
          })
          .catch(err => {
            setMsg(err.message);
            onToggleSnackBar();
            console.log(
              'error while predicting water condition : ',
              err.message,
            );
          });

        setPhValue(parseFloat(ph).toFixed(2));
        setTemperature(parseFloat(temp).toFixed(2));
        setTurbudity(parseFloat(turbidity).toFixed(2));
      })
      .catch(err => {
        setMsg(err.message);
        onToggleSnackBar();
        console.log(
          'error while reading data from the IOT device : ',
          err.message,
        );
      });
  };

  return (
    <View style={styles.content}>
      {/* background image */}
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          width: width,
          height: height,
          backgroundColor: theme.colors.primary,
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
          zIndex: -1,
        }}>
        <Image
          source={{
            uri: 'https://i.ibb.co/JkCMvpQ/0fc05777d3c5b33c0f08e4fdda51c3ea.jpg',
          }}
          width={width}
          height={height}
          style={{ borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }}
        />
      </View>
      {/* top tile background */}
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          width: width,
          height: height / 8.8,
          backgroundColor: theme.colors.white,
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
        }}>
        <Image
          source={{
            uri: 'https://firebasestorage.googleapis.com/v0/b/esp32-firebase-demo-c95d6.appspot.com/o/d.png?alt=media&token=8f7b7d73-8d2a-43ea-926a-ab5b3cc3a491',
          }}
          width={width / 1}
          height={height / 6.3}
          style={{ borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }}
        />
      </View>
      <View
        style={{
          marginTop: 23,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
          <Text style={{ fontSize: 23, fontWeight: '690', color: 'black' }}>
            Good {dayInfo.time}
          </Text>
          <Text style={{ fontSize: 30, fontWeight: '690', color: '#043b5c' }}>
          {username}
          </Text>
        </View>
        <Icon name={dayInfo.icon} color={theme.colors.secondary} size={60} />
      </View>
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'space-between',
          flex: 1,
          width: '100%',
        }}>
        <View style={{ gap: 10 }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View style={styles.topTile}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                }}>
                <Text
                  style={{
                    textAlign: 'left',
                    fontWeight: '600',
                    fontSize: 36,
                    color: '#FFF',
                  }}>
                  {phValue.toString()}
                </Text>
                <Icon name={'water'} color={'#d6d6d6'} size={30} />
              </View>
              <Text style={{ fontWeight: '400', fontSize: 20, color: '#FFF' }}>
                pH
              </Text>
            </View>
            <View style={{ ...styles.topTile, backgroundColor: '#4274A2' }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                }}>
                <Text
                  style={{
                    textAlign: 'left',
                    fontWeight: '600',
                    fontSize: 36,
                    color: '#FFF',
                  }}>
                  {turbidity.toString()}
                </Text>
                <FAIcon name={'low-vision'} color={'#d6d6d6'} size={30} />
              </View>
              <Text style={{ fontWeight: '400', fontSize: 20, color: '#FFF' }}>
                Turbidity
              </Text>
            </View>
          </View>
          <View
            style={{
              ...styles.topTile,
              backgroundColor: '#2c82c9',
              width: '100%',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
              }}>
              <Text
                style={{
                  textAlign: 'left',
                  fontWeight: '600',
                  fontSize: 36,
                  color: '#FFF',
                }}>
                {temperature} °C
              </Text>
              <FAIcon name={'temperature-low'} color={'#d6d6d6'} size={30} />
            </View>
            <Text style={{ fontWeight: '400', fontSize: 20, color: '#FFF' }}>
              Temperature
            </Text>
        
          </View> 
          <View>
          <View
            style={{
              ...styles.topTileWeather,
              backgroundColor: '#039be5',
              width: '50%',
              
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '48%',
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  fontWeight: '600',
                  fontSize: 36,
                  color: '#FFF',
                }}>
                <WeatherComponent apiKey={apiKey} />
              </Text>
             
            </View>
            
        
          </View>
      {/* <WeatherComponent apiKey={apiKey} /> */}
    </View>
        </View>
        <Image
        source={{
          uri: '',
        }}
        width={height / 2.5}
        height={height / 2.8}
      />
      
    </View>
    
      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        action={{
          label: 'Dismiss',
          onPress: () => {
            onDismissSnackBar();
          },
        }}>
        {msg}
      </Snackbar>
    </View>
    
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  content: {
    flex: 1,
    width: '100%',
    backgroundColor: '#FFFFFF',
    padding: 20,
    gap: 50,
    position: 'relative',
  },
  topTile: {
    borderRadius: 10,
    minHeight: 120,
    padding: 10,
    backgroundColor: '#4274A2',
    width: '48.5%',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
  },
  topTileWeather: {
    borderRadius: 10,
    minHeight: 120,
    padding: 10,
    backgroundColor: '#4274A2',
    width: '48.5%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  
});

