import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCoyR_v91wi3Z0_OHMe9lVPVyLlsZwApY8",
    authDomain: "crown-db-7691f.firebaseapp.com",
    databaseURL: "https://crown-db-7691f.firebaseio.com",
    projectId: "crown-db-7691f",
    storageBucket: "crown-db-7691f.appspot.com",
    messagingSenderId: "331141084103",
    appId: "1:331141084103:web:17f3d1109206c71b70dfe2",
    measurementId: "G-5755KSTQW3"
};

export const createUserProfileDocument = async (userAuth, ...additionalData) => {
    if (!userAuth) return;
 
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapshot = await userRef.get();
    if(!snapshot.exists) {
        const {displayName, email} = userAuth;
        const createdAt =  new Date();

        try {

            await userRef.set({
            displayName, 
            email, 
            createdAt,
            ...additionalData
            })
        } catch (error) {
            console.log("Error creating user" , error.message);
        }
    }
    return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;