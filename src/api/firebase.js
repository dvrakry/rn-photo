import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../../env';

import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
//import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const initFirebase = () => {
  try {
    const app = initializeApp(firebaseConfig);
    initializeAuth(app, {
      persistence: getReactNativePersistence(AsyncStorage),
    });
    return app;
  } catch (e) {
    // console.log(e);
  }
};
