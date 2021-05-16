import firebase from 'firebase/app';
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDmSj6oBnlAXzSDyruYZOXqCXx2daIwM0E",
    authDomain: "get-rid-covid-v1.firebaseapp.com",
    projectId: "get-rid-covid-v1",
    storageBucket: "get-rid-covid-v1.appspot.com",
    messagingSenderId: "1073653348042",
    appId: "1:1073653348042:web:5c88e29794fea0d6562633",
    measurementId: "G-30BFZZW8V4"
  };

  firebase.initializeApp(firebaseConfig);
  export const db = firebase.firestore();
  export const orgCollection = db.collection('organisationList');
  export const plasmaDonarCollection =db.collection('plasmaDonarsList');
  export const oxygenDealerCollection=db.collection('oxygenDealersList');
  export const plasmaRequestCollection =db.collection('plasmaRequesterList');
  export const feedbackCollections =db.collection('feedbacks');
  export const deactivateCollections =db.collection('deactivedRequests');


 export const createdTime = firebase.firestore.FieldValue.serverTimestamp;

export const convertFirebaseTime = (date) =>{
  return firebase.firestore.Timestamp.fromDate(date);
}
  export default firebase;