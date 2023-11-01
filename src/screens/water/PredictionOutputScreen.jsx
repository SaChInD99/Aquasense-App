import { StyleSheet, Text, View, Dimensions, Image } from 'react-native';
import React from 'react';
import FAIcon from 'react-native-vector-icons/FontAwesome5';
import { theme } from '../../core/theme';
import Button from '../../components/Button';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

const PredictionOutputScreen = ({ route, navigation }) => {
  const { pH, temperature, turbidity } = route?.params;

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

      <Text style={styles.title}>Predicted Values After Two Weeks</Text>

      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'space-between',
          flex: 1,
          width: '100%',
          paddingTop: 20,
          gap: 50,
        }}>
        <View style={{ gap: 40 }}>
          <View style={{ ...styles.topTile, backgroundColor: '#8D4DE9' }}>
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
                {pH}
              </Text>
              <FAIcon name={'tachometer-alt'} color={'#d6d6d6'} size={20} />
            </View>
            <Text style={{ fontWeight: '400', fontSize: 20, color: '#FFF' }}>
              pH
            </Text>
          </View>
          <View style={{ ...styles.topTile, backgroundColor: '#ffae00' }}>
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
              <FAIcon name={'temperature-low'} color={'#d6d6d6'} size={20} />
            </View>
            <Text style={{ fontWeight: '400', fontSize: 20, color: '#FFF' }}>
              Temperature
            </Text>
          </View>

          <View style={{ ...styles.topTile, backgroundColor: '#22C5FF' }}>
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
                {turbidity}
              </Text>
              <FAIcon name={'tint'} color={'#d6d6d6'} size={20} />
            </View>
            <Text style={{ fontWeight: '400', fontSize: 20, color: '#FFF' }}>
              Turbidity
            </Text>
          </View>
        </View>
      </View>
      <Button
        mode="contained"
        onPress={() =>
          navigation.navigate('PredictedWaterQualityScreen', {
            pH,
            temperature,
            turbidity,
          })
        }
        style={{ marginTop: 40 }}>
        <Text style={{ ...styles.text, color: '#FFF' }}>
          View Predicted Water Quality
        </Text>
      </Button>
    </View>
  );
};

export default PredictionOutputScreen;

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
  topTile: {
    borderRadius: 10,
    minHeight: 120,
    padding: 10,
    backgroundColor: '#00B4D8',
    width: '100%',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
  },
  title: {
    fontSize: 24,
    fontWeight: '500',
    marginBottom: 40,
    color: theme.colors.title,
  },
  text: {
    fontWeight: '400',
    fontSize: 20,
  },
});
