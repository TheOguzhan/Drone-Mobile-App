import auth from '@react-native-firebase/auth';
import { Alert } from 'react-native';

export const register = (email: string, password: string) => {
  auth().createUserWithEmailAndPassword(email, password).catch(e => {
    if (e.code === "'auth/email-already-in-use") {
      Alert.alert("This email is already in use");
    }
    if (e.code === 'auth/invalid-email') {
      Alert.alert('Email address is invalid')
    }
  })
};
export const logout = () => {
  auth().signOut()
};
export const login = (email: string, password: string) => {
  auth().signInWithEmailAndPassword(email, password).catch(e => {
    if (e.code === 'auth/invalid-email') {
      Alert.alert('Invalid email!');
    }
    if (e.code === "auth/user-not-found") {
      Alert.alert("There seems to be no user")
    }
    else {
      Alert.alert('Something wrong happened');
    }
  })
};
