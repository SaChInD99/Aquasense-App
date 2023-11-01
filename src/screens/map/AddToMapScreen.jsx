import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  PermissionsAndroid,
  Image,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import SelectDropdown from 'react-native-select-dropdown';
import { DatePickerInput } from 'react-native-paper-dates';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Geolocation from '@react-native-community/geolocation';
import firestore from '@react-native-firebase/firestore';
import { Snackbar } from 'react-native-paper';

import TextInput from '../../components/TextInput';
import Button from '../../components/Button';
import { theme } from '../../core/theme';
import { inputValidator } from '../../helpers/inputValidator';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

const AddToMapScreen = ({ navigation }) => {
  const [disease, setDisease] = useState('');
  const [species, setSpecies] = useState('');
  const [name, setName] = useState({ value: '', error: '' });
  const [mobileNo, setMobileNo] = useState({ value: '', error: '' });
  const [inputDate, setInputDate] = useState(undefined);
  const diseaseTypes = ['Aeromonas', 'Columnaris', 'Whitespots', 'SVC'];
  const fishSpecies = [
    'Grass Carp',
    'Silver Carp',
    'Bighead Carp',
    'Catla',
    'Rohu',
    'Mirigal',
    'Koi',
  ];
  const [currentLocation, setCurrentLocation] = useState({
    latitude: 0.0,
    longitude: 0.0,
  });
  const [visible, setVisible] = useState(false);
  const [msg, setMsg] = useState('Oops... Something went wrong');

  const onToggleSnackBar = () => setVisible(!visible);

  const onDismissSnackBar = () => setVisible(false);

  useEffect(() => {
    requestLocationPermission();
    Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation({ latitude, longitude });
        setMsg('Successfully fetched your current location...');
        onToggleSnackBar();
      },
      error => {
        setMsg('Error while fetching your current location...');
        onToggleSnackBar();
        console.log(error.message);
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }, []);

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'This app needs access to your location.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        setMsg('Location permission granted.');
        onToggleSnackBar();
      } else {
        setMsg('Location permission denied.');
        onToggleSnackBar();
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const saveLocation = () => {
    const latitude = currentLocation.latitude;
    const longitude = currentLocation.longitude;

    const nameError = inputValidator(name.value);
    const noError = inputValidator(mobileNo.value);

    if (!latitude || !longitude) {
      setMsg('Please wait until we fetch your current location...');
      onToggleSnackBar();
      return;
    }

    if (
      nameError ||
      noError ||
      !disease ||
      !species ||
      inputDate == undefined
    ) {
      setName({ ...name, error: nameError });
      setMobileNo({ ...mobileNo, error: noError });
      setMsg('Please fill all the fields...');
      onToggleSnackBar();
      return;
    }

    firestore()
      .collection('locations')
      .add({
        latitude,
        longitude,
        name: name.value,
        mobileNo: mobileNo.value,
        disease,
        species,
        timestamp: inputDate,
      })
      .then(() => {
        setMsg('Disease information added to the map');
        onToggleSnackBar();

        navigation.navigate('Map', { screen: 'LocationScreen' });
      })
      .catch(error => {
        setMsg('Oops... Something went wrong...');
        onToggleSnackBar();
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

      <Text
        style={{
          fontSize: 26,
          alignSelf: 'center',
          paddingTop: 20,
          color: theme.colors.blue,
          fontWeight: '800',
        }}>
        Report Disease
      </Text>
      <View style={{ padding: 20, gap: 6 }}>
        <View style={{ gap: 10, width: '100%' }}>
          <Text style={styles.inputLabel}>Disease Type </Text>
          <SelectDropdown
            data={diseaseTypes}
            onSelect={(selectedItem, index) => {
              setDisease(selectedItem);
            }}
            defaultButtonText={'Select disease type'}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem;
            }}
            rowTextForSelection={(item, index) => {
              return item;
            }}
            buttonStyle={styles.dropdownBtnStyle}
            buttonTextStyle={styles.dropdownBtnTxtStyle}
            renderDropdownIcon={isOpened => {
              return (
                <FontAwesome
                  name={isOpened ? 'chevron-up' : 'chevron-down'}
                  color={'#444'}
                  size={18}
                />
              );
            }}
            dropdownIconPosition={'right'}
            dropdownStyle={styles.dropdownDropdownStyle}
            rowStyle={styles.dropdownRowStyle}
            rowTextStyle={styles.dropdownRowTxtStyle}
          />
        </View>
        <View style={{ gap: 10, width: '100%' }}>
          <Text style={styles.inputLabel}>Fish Species </Text>
          <SelectDropdown
            data={fishSpecies}
            onSelect={(selectedItem, index) => {
              setSpecies(selectedItem);
            }}
            defaultButtonText={'Select fish species'}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem;
            }}
            rowTextForSelection={(item, index) => {
              return item;
            }}
            buttonStyle={styles.dropdownBtnStyle}
            buttonTextStyle={styles.dropdownBtnTxtStyle}
            renderDropdownIcon={isOpened => {
              return (
                <FontAwesome
                  name={isOpened ? 'chevron-up' : 'chevron-down'}
                  color={'#444'}
                  size={18}
                />
              );
            }}
            dropdownIconPosition={'right'}
            dropdownStyle={styles.dropdownDropdownStyle}
            rowStyle={styles.dropdownRowStyle}
            rowTextStyle={styles.dropdownRowTxtStyle}
          />
        </View>

        <View style={{ gap: -10, width: '100%' }}>
          <Text style={styles.inputLabel}>Fish Farm Name </Text>
          <TextInput
            label=""
            returnKeyType="next"
            value={name.value}
            onChangeText={text => setName({ value: text, error: '' })}
            error={!!name.error}
            errorText={name.error}
            autoCapitalize="none"
            autoCompleteType="username"
            textContentType="username"
            keyboardType="default"
          />
        </View>

        <View style={{ gap: -10, width: '100%', marginTop: -10 }}>
          <Text style={styles.inputLabel}>Contact Number </Text>
          <TextInput
            label=""
            returnKeyType="next"
            value={mobileNo.value}
            onChangeText={text => setMobileNo({ value: text, error: '' })}
            error={!!mobileNo.error}
            errorText={mobileNo.error}
            autoCapitalize="none"
            autoCompleteType="tel"
            textContentType="telephoneNumber"
            keyboardType="numeric"
          />
        </View>

        <View style={{ gap: 5, width: '100%', marginTop: -10 }}>
          <Text style={styles.inputLabel}>Date </Text>
          <DatePickerInput
            locale="en"
            label="Date"
            value={inputDate}
            onChange={d => setInputDate(d)}
            inputMode="start"
            style={{
              backgroundColor: '#FFF',
              borderWidth: 1,
              borderRadius: 10,
              borderColor: theme.colors.inactive,
            }}
          />
        </View>

        <Button
          mode="contained"
          onPress={saveLocation}
          style={{ marginTop: 30 }}>
          <Text style={{ ...styles.textBtn, color: '#FFF' }}>
            Add to the map
          </Text>
        </Button>
        <Image
        source={{
          uri: 'https://firebasestorage.googleapis.com/v0/b/esp32-firebase-demo-c95d6.appspot.com/o/11669328_20945911.jpg?alt=media&token=7987f2c9-2582-47ee-97d5-60d365b31795',
        }}
        width={height / 2.3}
        height={height / 5}
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

export default AddToMapScreen;

const styles = StyleSheet.create({
  content: {
    flex: 1,
    width: '100%',
    backgroundColor: '#FFFFFF',
    gap: 4,
    position: 'relative',
  },
  textBtn: {
    fontWeight: '400',
    fontSize: 20,
  },
  inputLabel: {
    fontSize: 18,
    fontWeight: '400',
    color: theme.colors.black,
  },
  dropdownBtnStyle: {
    width: '100%',
    height: 50,
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#104b58',
  },
  dropdownBtnTxtStyle: { color: '#444', textAlign: 'left' },
  dropdownDropdownStyle: { backgroundColor: '#EFEFEF' },
  dropdownRowStyle: {
    backgroundColor: '#EFEFEF',
    borderBottomColor: '#C5C5C5',
  },
  dropdownRowTxtStyle: { color: '#444', textAlign: 'left' },
});
