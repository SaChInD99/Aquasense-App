import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  Pressable,
} from 'react-native';
import React from 'react';
import { theme } from '../../core/theme';
import { DiseaseDetails } from '../../data/Data';
const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;
const DiseasesHomeScreen = ({ navigation }) => {
  const CardSection = props => {
    return (
      <Pressable
        onPress={() => {
          navigation.navigate('DiseaseDetailsScreen', {
            diseaseId: props?.index,
          });
        }}
        style={styles.containerStyle}>
        {props.children}
      </Pressable>
    );
  };

  return (
    <View style={styles.content}>
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
      <Text style={styles.title}>Diseases</Text>

      <View style={styles.mainContainer}>
        {DiseaseDetails.map((value, index) => {
          return (
            <CardSection
              style={styles.containerStyle}
              key={index}
              index={index}>
              <Image
                source={{
                  uri: value.img,
                }}
                width={100}
                height={100}
                style={{
                  borderRadius: 50,
                  alignSelf: 'center',
                  marginBottom: 20,
                }}
              />
              <Text style={{ color: 'black', fontSize: 20, fontWeight: '400' }}>
                {value?.Name}
              </Text>
              <Text style={{ color: '#104b58', fontSize: 14, fontWeight: '350' }}>
                {value?.Etiologi}
              </Text>

              <View
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginTop: 5,
                }}>
                <Text
                  style={{ color: 'black', fontSize: 12, fontWeight: '300' }}>
                  {value?.diseaseType}
                </Text>
                <Image
                  source={{
                    uri: value.diseaseTypeImg,
                  }}
                  width={35}
                  height={30}
                  style={{
                    borderRadius: 50,
                  }}
                />
              </View>
            </CardSection>
          );
        })}
        <Image
        source={{
          uri: 'https://firebasestorage.googleapis.com/v0/b/esp32-firebase-demo-c95d6.appspot.com/o/dis.jpg?alt=media&token=d67841c1-a4c9-402a-beb0-98730253445e',
        }}
        width={height / 1.5}
        height={height / 1.98}
      />
      </View>
    </View>
  );
};

export default DiseasesHomeScreen;

const styles = StyleSheet.create({
  content: {
    flex: 1,
    width: width,
    backgroundColor: '#FFFFFF',
    padding: 20,
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative',
    gap: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    marginBottom: -8,
    color: theme.colors.blue,
  },
  mainContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: width,
  },
  containerStyle: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: 20,
    borderRadius: 10,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: theme.colors.primary,
    margin: 10,
    elevation: 10,
    width: '44%',
    minHeight: 240,
  },
});
