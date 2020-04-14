import * as firebase from 'firebase/app';

import 'firebase/auth';
import 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyB9wYuHvHxRZ2qCL1VgJtdt4wWoA_UpvNs',
  authDomain: 'shopping-app-native.firebaseapp.com',
  databaseURL: 'https://shopping-app-native.firebaseio.com',
  projectId: 'shopping-app-native',
  storageBucket: 'shopping-app-native.appspot.com',
  messagingSenderId: '1087717829313',
  appId: '1:1087717829313:web:d3db753ee183c3ca140240',
  measurementId: 'G-DNZG6S4VFM',
};

firebase.initializeApp(firebaseConfig);

export const db = firebase.database();
export const auth = firebase.auth();
