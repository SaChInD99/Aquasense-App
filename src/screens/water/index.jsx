import React, { useState } from 'react';
import { StyleSheet, Text, View, Dimensions, Image } from 'react-native';
import { DatePickerInput } from 'react-native-paper-dates';

import { theme } from '../../core/theme';
import Button from '../../components/Button';
import { Snackbar, ActivityIndicator } from 'react-native-paper';
import { predictWaterQuality } from '../../services/waterQualityPrediction.service';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

const WaterQualityHomeScreen = ({ navigation }) => {
  const [date, setDate] = useState(undefined);
  const [isProcessing, setIsProcessing] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);
  const [msg, setMsg] = useState('Oops... Something went wrong');

  const onToggleSnackBar = () => setPopupVisible(!popupVisible);

  const onDismissSnackBar = () => setPopupVisible(false);

  const onPredict = async () => {
    if (date == undefined) {
      setMsg('Please input a valid date!');
      onToggleSnackBar();
      return;
    }
    setIsProcessing(true);

    const yyyy = date.getFullYear();
    let mm = date.getMonth() + 1; // Months start at 0!
    let dd = date.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    const formattedDate = yyyy + '-' + mm + '-' + dd;

    const payload = {
      Day: `${formattedDate}`,
    };

    try {
      const response = await predictWaterQuality(payload);
      const { pH, temperature, turbidity } = response?.data;
      setIsProcessing(false);

      navigation.navigate('PredictionOutputScreen', {
        pH,
        temperature,
        turbidity,
      });
    } catch (error) {
      setMsg(error);
      setIsProcessing(false);
      onToggleSnackBar();
    }
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

      <Text style={styles.title}>Water Quality Prediction</Text>
      <Image
        source={{
          uri: 'https://i.ibb.co/Jj5kfWZ/wq.png',
        }}
        width={height / 2.5}
        height={height / 2.5}
      />
      <View style={{ gap: 5, width: '100%', marginVertical: 40 }}>
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

      <Button
        mode="contained"
        onPress={() => onPredict()}
        disabled={isProcessing}>
        {isProcessing ? (
          <ActivityIndicator
            animating={true}
            size={'large'}
            color={theme.colors.white}
          />
        ) : (
          <Text style={{ ...styles.text, color: '#FFF' }}>
            Start Water Quality Forecasting
          </Text>
        )}
      </Button>

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
    </View>
  );
};

export default WaterQualityHomeScreen;

const styles = StyleSheet.create({
  content: {
    flex: 1,
    width: '100%',
    backgroundColor: '#FFFFFF',
    padding: 20,
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative',
  },
  title: {
    fontSize: 24,
    fontWeight: '500',
    marginBottom: 40,
    color: theme.colors.title,
  },
  diagnoseBtn: {
    borderWidth: 1,
    borderColor: '#FFFFFF',
    borderRadius: 10,
    padding: 10,
    backgroundColor: theme.colors.buttonBackground,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontWeight: '400',
    fontSize: 20,
  },
});
