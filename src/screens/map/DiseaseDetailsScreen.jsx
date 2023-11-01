import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  ScrollView,
  Pressable,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { theme } from '../../core/theme';
import Button from '../../components/Button';
import { DiseaseDetails } from '../../data/Data';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

const DiseaseDetailsScreen = ({ route, navigation }) => {
  const { diseaseId } = route.params;
  const [disease, setDisease] = useState({
    Name: '',
    Etiologi: '',
    img: '',
    bg: '',
    Clinical: '',
    Control: '',
  });

  useEffect(() => {
    setDisease(DiseaseDetails[diseaseId]);
  }, [diseaseId]);

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
          height: height / 4,
          backgroundColor: theme.colors.primary,
          zIndex: -1,
        }}>
        <Image
          source={{
            uri: disease.bg,
          }}
          width={width}
          height={height / 3}
        />
      </View>

      <View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: 20,
          width: width,
          height: (height / 3) * 2,
          backgroundColor: theme.colors.primary,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}>
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            width: width,
            height: height,
            backgroundColor: theme.colors.primary,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            zIndex: -1,
          }}>
          <Image
            source={{
              uri: 'https://i.ibb.co/JkCMvpQ/0fc05777d3c5b33c0f08e4fdda51c3ea.jpg',
            }}
            width={width}
            height={height}
            style={{ borderTopLeftRadius: 20, borderTopRightRadius: 20 }}
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
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            zIndex: -1,
            opacity: 0.7,
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            paddingBottom: 20,
          }}>
          <Text
            style={{
              fontSize: 24,
              fontWeight: '700',
              color: theme.colors.blue,
            }}>
            {disease?.Name}
          </Text>
          <Pressable
            onPress={() => navigation.navigate('AddToMapScreen')}
            style={{
              width: 'full',
              padding: 6,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 50,
              borderWidth: 0.5,
              borderColor: theme.colors.primary,
              backgroundColor: theme.colors.green,
            }}>
            <Icon
              name="map-marker-alert-outline"
              size={40}
              color={theme.colors.white}
            />
          </Pressable>
        </View>

        <ScrollView>
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'space-between',
              flex: 0.9,
              width: '100%',
            }}>
            <View style={{ gap: 15 }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'baseline',
                  gap: 15,
                }}>
                <Text style={styles.label}>Etiology </Text>
                <Text style={{ fontSize: 18, color: '#23A8E0', }}>{disease?.Etiologi}</Text>
              </View>
              <View
                style={{
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  gap: 10,
                }}>
                <Text style={styles.label}>Clinical Presentation</Text>
                <View
                  style={{
                    borderRadius: 10,
                    minHeight: 20,
                    padding: 10,
                    marginBottom: 10,
                    backgroundColor: '#FFF',
                    minHeight: 'full',
                    width: '100%',
                  }}>
                  <Text style={{ fontSize: 18 }}>{disease?.Clinical}</Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  gap: 15,
                }}>
                <Text style={styles.label}>Management/control</Text>
                <View
                  style={{
                    borderRadius: 10,
                    minHeight: 20,
                    padding: 10,
                    marginBottom: 10,
                    backgroundColor: '#FFF',
                    minHeight: 'full',
                    width: '100%',
                  }}>
                  <Text style={{ fontSize: 18 }}>{disease?.Control}</Text>
                </View>
              </View>
            </View>

            {/* <Button mode="contained" style={{ marginTop: 30 }}>
              <Text
                style={{
                  fontWeight: '400',
                  fontSize: 20,
                  borderRadius: 100,
                  color: '#FFFFFF',
                }}>
                Report the Disease
              </Text>
            </Button> */}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default DiseaseDetailsScreen;

const styles = StyleSheet.create({
  content: {
    flex: 1,
    width: width,
    backgroundColor: '#FFFFFF',
    padding: 20,
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative',
  },
  label: {
    fontSize: 20,
    fontWeight: '400',
    color: theme.colors.black,
  },
});


