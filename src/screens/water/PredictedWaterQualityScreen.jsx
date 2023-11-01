import { View, Text, Dimensions, Image, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { theme } from '../../core/theme';
import Icon from 'react-native-vector-icons/AntDesign';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

const PredictedWaterQualityScreen = ({ route }) => {
  const { pH, temperature, turbidity } = route?.params;
  const [stats, setStats] = useState({
    name: 'checkcircleo',
    color: theme.colors.success,
    status: 'Good',
  });

  useEffect(() => {
    checkWaterQuality();
  }, [pH]);

  const checkWaterQuality = () => {
    if (
      pH > 6.5 &&
      pH < 8.0 &&
      temperature > 15.0 &&
      temperature < 22.0 &&
      turbidity > 0 &&
      turbidity < 200.0
    ) {
      setStats({
        ...stats,
        status: 'Good',
        name: 'checkcircleo',
        color: theme.colors.success,
      });
      return;
    }
    setStats({
      ...stats,
      status: 'Bad',
      name: 'exclamationcircleo',
      color: theme.colors.error,
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

      <View style={{ marginTop: 60 }}>
        <Icon name={stats.name} color={stats.color} size={150} />
      </View>

      <View
        style={{
          gap: 20,
          width: '100%',
          flexDirection: 'column',
          textAlign: 'center',
          marginTop: 80,
        }}>
        <Text style={styles.title}>
          Optimal Water Quality Ranges for Carp Fish are,
        </Text>
        <View style={{ marginVertical: 20, marginBottom: 40, gap: 10 }}>
          <Text style={styles.sub}>
            🔵{'  '}
            <Text style={{ ...styles.sub, fontWeight: '600' }}>pH</Text> : 6.5 -
            8.0
          </Text>
          <Text style={styles.sub}>
            🔵{'  '}
            <Text style={{ ...styles.sub, fontWeight: '600' }}>
              Temperature
            </Text>{' '}
            : 15.0 - 22.0(Celcius)
          </Text>
          <Text style={styles.sub}>
            🔵{'  '}
            <Text style={{ ...styles.sub, fontWeight: '600' }}>
              Turbidity
            </Text>{' '}
            : 0 - 200.0(NTU)
          </Text>
        </View>
        <Text
          style={{
            ...styles.title,
            color: theme.colors.black,
            textAlign: 'center',
          }}>
          So, After 2 weeks water quality will be{' '}
          <Text style={{ ...styles.title, color: stats.color }}>
            {stats.status}
          </Text>{' '}
          for Carp fish.
        </Text>
      </View>
    </View>
  );
};

export default PredictedWaterQualityScreen;
const styles = StyleSheet.create({
  content: {
    flex: 1,
    width: '100%',
    backgroundColor: '#FFFFFF',
    padding: 20,
    alignItems: 'center',
    gap: 20,
  },
  title: {
    fontSize: 24,
    color: theme.colors.primary,
    fontWeight: '500',
  },
  sub: {
    fontSize: 20,
    fontWeight: '400',
    color: theme.colors.black,
  },
});
