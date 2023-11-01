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

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

const PredictionDetailsScreen = ({ navigation }) => {
  const [phValue, setPhValue] = useState(0.0);
  const [temperature, setTemperature] = useState(0.0);
  const [turbidity, setTurbudity] = useState(0.0);
  const [waterCondition, setWaterCondition] = useState('Optimal');

  const [visible, setVisible] = useState(false);
  const [msg, setMsg] = useState('Oops... Something went wrong');

  const onToggleSnackBar = () => setVisible(!visible);

  const onDismissSnackBar = () => setVisible(false);

  //get the name of the logged in user in initial load
  useEffect(() => {
    readRDB();
  }, []);

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
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
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
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          width: width,
          height: height,
          backgroundColor: theme.colors.white,
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 20,
          zIndex: -1,
          opacity: 0.3,
        }}
      />

      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'space-between',
          flex: 1,
          width: '100%',
          paddingTop: -200,
        }}>
        <View style={{ gap: 20 }}>
        <Text style={styles.title}>Current Disease Risk</Text>
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
              <FAIcon name={'water'} color={'#e4e9ed'} size={30} />
            </View>
            <Text style={{ fontWeight: '400', fontSize: 20, color: '#FFF' }}>
              Current pH
            </Text>
          </View>
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
                {temperature} C
              </Text>
              <FAIcon name={'temperature-low'} color={'#e8ecf1'} size={30} />
            </View>
            <Text style={{ fontWeight: '400', fontSize: 20, color: '#FFF' }}>
              Current Temperature
            </Text>
          </View>

          <Pressable
            onPress={() => navigation.navigate('DiseasesHomeScreen')}
            style={styles.topTile1}>
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
                {waterCondition}
              </Text>
              <FAIcon name={'bacteria'} color={'#f2f1ef'} size={30} />
              <FAIcon name={'virus'} color={'#f2f1ef'} size={30} />
            </View>
            <Text style={{ fontWeight: '400', fontSize: 20, color: '#FFF' }}>
              Identified Disease Risk
            </Text>
          </Pressable>
        </View>
        <Image
        source={{
          uri: 'https://firebasestorage.googleapis.com/v0/b/esp32-firebase-demo-c95d6.appspot.com/o/water.jpg?alt=media&token=a5690483-fe85-4a8c-983c-89af292a2afd',
        }}
        width={height / 2.1}
        height={height / 3.8}
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

export default PredictionDetailsScreen;

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
    minHeight: 140,
    padding: 10,
    backgroundColor: '#4274A2',
    width: '100%',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
  },

  topTile1: {
    borderRadius: 10,
    minHeight: 140,
    padding: 10,
    backgroundColor: '#334173',
    width: '100%',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 5,
    color: theme.colors.blue,
  },
  title1: {
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 10,
    color: theme.colors.title,
  },
});

