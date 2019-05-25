// Firebase
import { firebase, googleAuthProvider } from '../firebase/firebase';

// function calls auth which prompts to log in via an popUp
export const startLogin = () => {
  return () => {
    return firebase.auth().signInWithPopup(googleAuthProvider); //for google
  };
};

export const login = (uid) => ({
  type: 'LOGIN',
  uid
});


export const startLogout = () => {
  return () => {
    return firebase.auth().signOut(); //for google
  };
};

export const logout = () => ({
  type: 'LOGOUT'
});
