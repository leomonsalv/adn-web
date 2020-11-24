import 'firebase/auth';
import 'firebase/storage';
import 'firebase/firestore';

import app from 'firebase/app';

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID
};

class Firebase {
  constructor() {
    app.initializeApp(config);

    // *** Firebase Api's  ***
    this.auth = app.auth();
    this.firestore = app.firestore();
    this.storage = app.storage();
  }

  // *** Auth API ***

  getAuth() {
    return this.auth;
  }

  createUserWithEmailAndPassword(email, password) {
    return this.auth.createUserWithEmailAndPassword(email, password);
  }

  signInWithEmailAndPassword(email, password) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  signOut() {
    return this.auth.signOut();
  }

  // *** Users Api ***
  createUser(user) {
    this.firestore.collection('users').add(user);
  }

  async getUserByEmail(email) {
    const usersReference = this.firestore.collection('users');
    const snapshot = await usersReference.where('email', '==', email).get();
    const collection = [];

    snapshot.forEach((element) => {
      collection.push({
        ...element.data()
      });
    });

    const { password, confirm, ...user } = collection[0];
    return user;
  }
}

export default new Firebase();
