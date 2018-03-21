/**
 * Copyright 2018 (C) whistler
 * Created on: 20/03/18
 * Author: Kavin Varnan
 */

const admin = require('firebase-admin');

const serviceAccount = require('./../assets/credentials/whistler-cricket-firebase-adminsdk-8w518-2a39b78c28');

class FirebaseService {
  constructor() {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: 'https://whistler-cricket.firebaseio.com'
    });
  }

  getAdmin() {
    return admin;
  }

}

module.exports = new FirebaseService();
