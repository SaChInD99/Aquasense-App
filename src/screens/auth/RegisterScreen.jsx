import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';
import React, { useState } from 'react';
import { Snackbar } from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import Background from '../../components/Background';
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';
import { theme } from '../../core/theme';

import { emailValidator } from '../../helpers/emailValidator';
import { passwordValidator } from '../../helpers/passwordValidator';
import { inputValidator } from '../../helpers/inputValidator';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

const Register = ({ navigation }) => {
  const [username, setUsername] = useState({ value: '', error: '' });
  const [email, setEmail] = useState({ value: '', error: '' });
  const [mobileNo, setMobileNo] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });
  const [rePassword, setRePassword] = useState({ value: '', error: '' });
  const [visible, setVisible] = useState(false);
  const [msg, setMsg] = useState('Oops... Something went wrong');

  const onToggleSnackBar = () => setVisible(!visible);

  const onDismissSnackBar = () => setVisible(false);

  const onSignupPressed = async () => {
    const usernameError = inputValidator(username.value);
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);
    const rePasswordError = passwordValidator(rePassword.value);
    const inputError = inputValidator(mobileNo.value);
    if (
      usernameError ||
      emailError ||
      passwordError ||
      inputError ||
      rePasswordError
    ) {
      setUsername({ ...username, error: usernameError });
      setEmail({ ...email, error: emailError });
      setMobileNo({ ...mobileNo, error: inputError });
      setPassword({ ...password, error: passwordError });
      setRePassword({ ...rePassword, error: rePasswordError });
      return;
    }

    if (password.value !== rePassword.value) {
      setPassword({ ...password, error: 'passwords are not matching' });
      setRePassword({ ...rePassword, error: 'passwords are not matching' });
      return;
    }

    await auth()
      .createUserWithEmailAndPassword(email.value, password.value)
      .then(async userCredentials => {
        await saveUserDataToFirestore(userCredentials.user.uid, email.value);
        setMsg('Signing up...');
        onToggleSnackBar();
      })
      .catch(error => {
        if (error.code == 'email-already-in-use') {
          setMsg('Email Provided already Exists');
        } else if (error.code == 'weak-password') {
          setMsg('Password Provided is too weak');
        } else {
          setMsg('Oops, Something went wrong!');
        }
        onToggleSnackBar();
      });
  };

  const saveUserDataToFirestore = async (userID, email) => {
    try {
      // Get a reference to the Firestore collection 'users'
      const usersCollectionRef = firestore().collection('users');

      // Create a new document in the 'users' collection with the user ID as the document ID
      await usersCollectionRef.doc(userID).set({
        email: email,
        name: username.value,
        mobileNo: mobileNo.value,
      });

      // console.log('User data saved to Firestore.');
    } catch (error) {
      console.error('Error saving user data to Firestore:', error.message);
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{
        flexGrow: 1,
      }}>
      <Background>
      <Image
        source={{
          uri: 'https://firebasestorage.googleapis.com/v0/b/esp32-firebase-demo-c95d6.appspot.com/o/logo_1.png?alt=media&token=4073fcb3-9bda-4100-b6a8-293f095cc970',
        }}
        width={height / 2.1}
        height={height / 3.9}
        />
        <Text style={styles.welcome}>Welcome to Aqua Sense+</Text>
        <Text
          style={{
            fontSize: 16,
            marginBottom: 5,
          }}>
          Create an account to get started.
        </Text>
        <TextInput
          label="Username"
          returnKeyType="next"
          value={username.value}
          onChangeText={text => setUsername({ value: text, error: '' })}
          error={!!username.error}
          errorText={username.error}
          autoCapitalize="none"
          autoCompleteType="username"
          textContentType="username"
          keyboardType="default"
        />
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
          label="Mobile Number"
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
        <TextInput
          label="Password"
          returnKeyType="done"
          value={password.value}
          onChangeText={text => setPassword({ value: text, error: '' })}
          error={!!password.error}
          errorText={password.error}
          secureTextEntry
        />
        <TextInput
          label="Re-Enter the Password"
          returnKeyType="done"
          value={rePassword.value}
          onChangeText={text => setRePassword({ value: text, error: '' })}
          error={!!rePassword.error}
          errorText={rePassword.error}
          secureTextEntry
        />
        <Button
          mode="contained"
          onPress={onSignupPressed}
          style={{ marginTop: 20 }}>
          <Text style={styles.signin}>Sign Up</Text>
        </Button>
        <View style={styles.row}>
          <Text style={styles.account}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.link}>Sign In</Text>
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
    </ScrollView>
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

export default Register;
