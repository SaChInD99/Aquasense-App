import React, { useEffect, useState } from 'react';
import { Text, View, TextInput, Button } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // You can choose your icon library
import axios from 'axios';
import { StyleSheet } from 'react-native'; // Import StyleSheet

const WeatherComponent = ({ apiKey }) => {
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  const weatherIcons = {
    // Map weather conditions to icons
    '01d': 'sun-o', // clear sky (day)
    '01n': 'moon-o', // clear sky (night)
    '02d': 'cloud', // few clouds (day)
    '02n': 'moon', // few clouds (night)
    '03d': 'cloud', // scattered clouds (day)
    '03n': 'moon', // scattered clouds (night)
    '04d': 'cloud', // broken clouds (day)
    '04n': 'moon', // broken clouds (night)
    '09d': 'tint', // shower rain (day)
    '09n': 'moon', // shower rain (night)
    '10d': 'tint', // rain (day)
    '10n': 'moon', // rain (night)
    '11d': 'bolt', // thunderstorm (day)
    '11n': 'moon', // thunderstorm (night)
    '13d': 'snowflake-o', // snow (day)
    '13n': 'snowflake-o', // snow (night)
    '50d': 'low-vision', // mist (day)
    '50n': 'moon', // mist (night)
  };

  const fetchWeatherData = () => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`
      )
      .then((response) => {
        setWeatherData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching weather data:', error);
      });
  };

  useEffect(() => {
    if (location) {
      fetchWeatherData();
    }
  }, [location, apiKey]);

  const styles = StyleSheet.create({
    container: {
      padding: 16,
      backgroundColor: '#f0f0f0',
      alignItems: 'center', // Center content horizontally
      justifyContent: 'center', // Center content vertically
      flex: 1,
    },
    input: {
      height: 30,
      width: 200, // Adjust the width
      color:'white',
      alignContent: 'center',
      borderColor: '#23A8E0',
      borderWidth: 0.5,
      padding: 4,
      marginBottom: 2,
      textAlign: 'center', // Center text within the input field
    },
    button: {
      backgroundColor: 'skyblue',
      padding: 12,
      alignItems: 'center',
    },
    buttonText: {
      color: 'white',
      fontWeight: 'bold',
    },
    weatherInfo: {
      marginTop: 20,
      alignItems: 'center',
    },
    weatherText: {
      fontSize: 15,
      marginBottom: 8,
      color: 'white',
      fontWeight: '7 00'
    },
    weatherTemp: {
      fontSize: 38,
      marginBottom: 12,
      color: 'white',
      fontWeight: '700'
    },
    weatherTempl: {
      fontSize: 28,
      fontWeight: '1000',
      marginBottom: 8,
      color: 'white',
      fontWeight: '50'
    },
    
    weatherIcon: {
      fontSize: 50,
      color:'white',
      marginBottom: 10
    },
  });

  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder="Enter location"
        value={location}
        onChangeText={(text) => setLocation(text)}
      />

      {weatherData && (
        <View style={styles.weatherInfo}>
          <Text style={styles.weatherTempl}> {weatherData.name}</Text>
          <Text style={styles.weatherTemp}>
             {weatherData.main.temp}°C
          </Text>
          <Icon
            name={weatherIcons[weatherData.weather[0].icon]}
            style={styles.weatherIcon}
            color="White"
          />
          <Text style={styles.weatherText}>
            Weather {weatherData.weather[0].description}
          </Text>
        </View>
      )}
    </View>
  );
};

export default WeatherComponent;

