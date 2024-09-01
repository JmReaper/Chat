import { initializeApp } from 'firebase/App';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/auth';
import Constants from 'expo-constants';


const firebaseConfig = {
    apiKey: Constants.manifest.extra.apiKey,
    authDomain: Constants.manifest.extra.authDomain,
    projectId: Constants.manifest.extra.projectId,
    storageBucket: Constants.manifest.extra.storageBucket,
    messagingSenderId: Constants.manifest.extra.messagingSenderId,
    appId: Constants.manifest.extra.appId,
    databaseURL: Constants.manifest.extra.databaseURL
  };

  initializeApp(firebaseConfig);
  export const auth = getAuth();
  export const database = getFirestore();
