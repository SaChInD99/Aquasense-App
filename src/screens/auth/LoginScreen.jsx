import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import auth from '@react-native-firebase/auth';

import { OnboardFlow, PrimaryButton } from 'react-native-onboard';
import { theme } from '../../core/theme';
import { Snackbar } from 'react-native-paper';

import Background from '../../components/Background';
import Logo from '../../components/Logo';
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';

import { emailValidator } from '../../helpers/emailValidator';
import { passwordValidator } from '../../helpers/passwordValidator';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });
  const [visible, setVisible] = useState(false);
  const [msg, setMsg] = useState('Oops... Something went wrong');

  const onToggleSnackBar = () => setVisible(!visible);

  const onDismissSnackBar = () => setVisible(false);

  const onLoginPressed = () => {
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);
    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }

    auth()
      .signInWithEmailAndPassword(email.value, password.value)
      .then(res => {
        setMsg('Signing in...');
        onToggleSnackBar();
      })
      .catch(error => {
        setMsg('Please check your credentials!');
        onToggleSnackBar();
        console.log('error while signing in >>> ', error);
      });
  };

  const CustomButton = ({ text, ...props }) => (
    <Button mode="contained" onPress={props.goToNextPage}>
      <Text style={{ color: '#fff' }}>{text}</Text>
    </Button>
  );

  return (
    <View style={styles.container}>
      <OnboardFlow
        PrimaryButtonComponent={CustomButton}
        pageStyle={{ paddingTop: 110 }}
        pages={[
          {
            title: 'Welcome to Aqua Sense+',
            subtitle: '',
            imageUri: 'https://firebasestorage.googleapis.com/v0/b/esp32-firebase-demo-c95d6.appspot.com/o/logo1.png?alt=media&token=eafff6e2-66e4-44c9-a22a-bdecdc1e5481',
          },
          {
            title: 'Real-time Data Monitoring',
            subtitle:
              'Display Real-time sensor data',
            imageUri:
              'https://firebasestorage.googleapis.com/v0/b/esp32-firebase-demo-c95d6.appspot.com/o/moni.jpg?alt=media&token=4b661f3f-2b3b-4fea-92b2-fa6dd8e9bdc6',
          },
          {
            title: 'Early Disease Risk Identification',
            subtitle: 'Identify disease risks early. So you can take quick actions',
            imageUri:
              'https://firebasestorage.googleapis.com/v0/b/esp32-firebase-demo-c95d6.appspot.com/o/dis.jpg?alt=media&token=d67841c1-a4c9-402a-beb0-98730253445e',
          },
          {
            title: 'Data Forecasting & Chemical Calculation',
            subtitle:
              'Forecast sensor data and calculate chemical dosages for your aquaculture ponds',
            imageUri:
              'https://firebasestorage.googleapis.com/v0/b/esp32-firebase-demo-c95d6.appspot.com/o/chemical.jpg?alt=media&token=e92010f6-8272-4893-b01d-5f5f8bc55853',
          },
        ]}
        type="fullscreen" // Change to either 'fullscreen', 'bottom-sheet', or 'inline'
        paginationSelectedColor={theme.colors.primary}
        primaryColor={theme.colors.primary}
        titleStyle={{ fontWeight: '800', color: theme.colors.blue }}
      />

      <Background>
        <Logo />
        <Text style={styles.welcome}>Welcome back</Text>
        <TextInput
          label="Email"
          returnKeyType="next"
          value={email.value}
          onChangeText={text => setEmail({ value: text, error: '' })}
          error={!!email.error}
          errorText={email.error}
          autoCapitalize="none"
          autoCompleteType="email"
          textContentType="emailAddress"
          keyboardType="email-address"
        />
        <TextInput
          label="Password"
          returnKeyType="done"
          value={password.value}
          onChangeText={text => setPassword({ value: text, error: '' })}
          error={!!password.error}
          errorText={password.error}
          secureTextEntry
        />
        <Button
          mode="contained"
          onPress={onLoginPressed}
          style={{ marginTop: 30 }}>
          <Text style={styles.signin}>Sign In</Text>
        </Button>
        <View style={styles.row}>
          <Text style={styles.account}>Don’t have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.link}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </Background>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  row: {
    width: '100%',
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'baseline',
    justifyContent: 'space-between',
    paddingHorizontal: 3,
  },
  forgot: {
    fontSize: 13,
    color: theme.colors.inactive,
  },
  link: {
    fontWeight: '400',
    color: theme.colors.primary,
    fontSize: 18,
  },
  welcome: {
    fontSize: 24,
    marginBottom: 40,
    fontWeight: '800',
    color: theme.colors.blue,
  },
  account: {
    fontSize: 18,
  },

  signin: {
    fontSize: 20,
  },
});

export default LoginScreen;
