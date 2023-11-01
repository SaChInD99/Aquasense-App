import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Keyboard,
  Dimensions,
  Image,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { DatePickerInput, TimePickerModal } from 'react-native-paper-dates';
import axios from 'axios';

import { theme } from '../../core/theme';
import TextInput from '../../components/TextInput';
import { inputValidator } from '../../helpers/inputValidator';
import Button from '../../components/Button';
import { predictForecastedDisease } from '../../services/diseasePrediction.service';
import { Snackbar } from 'react-native-paper';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

const DiagnoseHomeScreen = ({ navigation }) => {
  const [phValue, setPhValue] = useState({ value: '', error: '' });
  const [turbudity, setTurbidity] = useState({ value: '', error: '' });
  const [temperature, setTemperature] = useState({ value: '', error: '' });
  const [date, setDate] = useState(undefined);
  const [time, setTime] = useState({ value: '', error: '' });
  const [riskName, setRiskName] = useState({ value: '-', error: '' });
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  const [visible, setVisible] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);
  const [msg, setMsg] = useState('Oops... Something went wrong');

  const onToggleSnackBar = () => setPopupVisible(!popupVisible);

  const onDismissSnackBar = () => setPopupVisible(false);

  const onDismiss = React.useCallback(() => {
    setVisible(false);
  }, [setVisible]);

  const onConfirm = React.useCallback(
    ({ hours, minutes }) => {
      setVisible(false);
      setTime({ ...time, value: `${hours}:${minutes}` });
    },
    [setVisible],
  );

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const diagnoseDisease = async () => {
    const phValueError = inputValidator(phValue.value);
    const temperatureError = inputValidator(temperature.value);
    const turbudityError = inputValidator(turbudity.value);
    const timeError = inputValidator(time.value);

    if (
      date == undefined ||
      phValueError ||
      temperatureError ||
      turbudityError ||
      timeError
    ) {
      setPhValue({ ...phValue, error: phValueError });
      setTemperature({ ...temperature, error: temperatureError });
      setTurbidity({ ...turbudity, error: turbudityError });
      setTime({ ...time, error: timeError });
      setMsg('Please fill all the fields');
      onToggleSnackBar();
      return;
    }

    const yyyy = date.getFullYear();
    let mm = date.getMonth() + 1; // Months start at 0!
    let dd = date.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    const formattedToday = mm + '/' + dd + '/' + yyyy;

    const payload = {
      date_time: `${formattedToday} ${time.value}`,
      temperature: parseFloat(temperature.value),
      ph: parseFloat(phValue.value),
      turbidity: parseFloat(turbudity.value),
    };

    try {
      const response = await predictForecastedDisease(payload);
      setRiskName({ ...riskName, value: response?.data });
    } catch (error) {
      onToggleSnackBar();
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.content}>
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

      <Text style={styles.title}>Disease Identification</Text>
      <View style={{ gap: 7, width: '100%', marginTop: -25 }}>
        <DatePickerInput
          locale="en"
          label="Date"
          value={date}
          onChange={d => setDate(d)}
          inputMode="start"
          style={{
            backgroundColor: '#FFF',
            borderWidth: 1,
            borderRadius: 10,
            borderColor: theme.colors.inactive,
          }}
        />
      </View>
      <TextInput
        label="Time"
        returnKeyType="next"
        value={time.value}
        onChangeText={text => setTime({ value: text, error: '' })}
        error={!!time.error}
        errorText={time.error}
        autoCapitalize="none"
        keyboardType="numeric"
        onPressIn={() => setVisible(true)}
        onPressOut={() => setTime({ value: time.value, error: '' })}
      />

      <TimePickerModal
        visible={visible}
        onDismiss={onDismiss}
        onConfirm={onConfirm}
        hours={12}
        minutes={14}
      />

      <TextInput
        label="Ph Value"
        returnKeyType="next"
        value={phValue.value}
        onChangeText={text => setPhValue({ value: text, error: '' })}
        error={!!phValue.error}
        errorText={phValue.error}
        autoCapitalize="none"
        keyboardType="numeric"
      />

      <TextInput
        label="Temperature"
        returnKeyType="next"
        value={temperature.value}
        onChangeText={text => setTemperature({ value: text, error: '' })}
        error={!!temperature.error}
        errorText={temperature.error}
        autoCapitalize="none"
        keyboardType="numeric"
      />

      <TextInput
        label="Turbudity"
        returnKeyType="next"
        value={turbudity.value}
        onChangeText={text => setTurbidity({ value: text, error: '' })}
        error={!!turbudity.error}
        errorText={turbudity.error}
        autoCapitalize="none"
        keyboardType="numeric"
      />

      <Button
        mode="contained"
        onPress={() => diagnoseDisease()}
        style={{ marginTop: 40 }}>
        <Text style={{ ...styles.text, color: '#FFF' }}>Start Forecasting</Text>
      </Button>
      <Text>OR</Text>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('PredictionDetailsScreen')}>
        <Text style={{ ...styles.text, color: '#FFF' }}>
          View Current Disease Risk
        </Text>
      </Button>

      <View
        style={{
          borderWidth: 1,
          borderColor: theme.colors.inactive,
          borderRadius: 10,
          backgroundColor: '#FFF',
          padding: 10,
          alignItems: 'center',
          flexDirection: 'row',
          marginTop: 40,
          gap: 10,
          width: 'full',
          marginHorizontal: 20,
          borderStyle: 'dashed',
        }}>
        <View
          style={{
            width: '100%',
            alignItems: 'baseline',
            flexDirection: 'row',
            gap: 10,
          }}>
          <Text style={{ ...styles.text, color: '#000', fontSize: 20 }}>
            Identified Risk :
          </Text>
          <Text
            style={{ ...styles.text, color: theme.colors.error, fontSize: 18 }}>
            {riskName.value}
          </Text>
        </View>
        <Pressable
          style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}
          disabled={riskName.value === '-' || riskName.value === 'Optimal'}
          onPress={() =>
            navigation.navigate('DiseaseDetailsScreen', { diseaseId: 0 })
          }>
          <Icon name="information" color={theme.colors.green} size={40} />
        </Pressable>
      </View>
      <Snackbar
        visible={popupVisible}
        onDismiss={onDismissSnackBar}
        action={{
          label: 'Dismiss',
          onPress: () => {
            onDismissSnackBar();
          },
        }}>
        {msg}
      </Snackbar>
    </ScrollView>
  );
};

export default DiagnoseHomeScreen;

const styles = StyleSheet.create({
  content: {
    flex: 1,
    width: '100%',
    backgroundColor: '#FFFFFF',
    padding: 20,
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative',
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 40,
    color: theme.colors.blue,
  },
  diagnoseBtn: {
    borderWidth: 1,
    borderColor: '#FFFFFF',
    borderRadius: 10,
    padding: 10,
    backgroundColor: theme.colors.blue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontWeight: '400',
    fontSize: 20,
  },
});

