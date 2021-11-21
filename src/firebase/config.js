import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAQO_e24mg9QJqwprflu8vh-IMG3WvpQ98",
  authDomain: "ecomapp-35a02.firebaseapp.com",
  projectId: "ecomapp-35a02",
  storageBucket: "ecomapp-35a02.appspot.com",
  messagingSenderId: "196205193241",
  appId: "1:196205193241:web:6805cd54e93e8c1bc86288",
};

//initialise firebase
firebase.initializeApp(firebaseConfig);

//initialise service
const projectFirestore = firebase.firestore();

export { projectFirestore };
