/**
 * Copyright 2018 (C) whistler
 * Created on: 20/03/18
 * Author: Kavin Varnan
 */

const errorGenerator = require('./../error/error.factory');
const errorCodes = require('./../error/error.codes').errorCodes;
const firebaseService = require('./../services/firebase.service');

class FirebaseAuth {
  constructor() {

  }

  auth(req, res, next) {
    const token = req.header("accessToken");
    const uid = req.header("uid");

    if (token && uid) {
      firebaseService.getAdmin().auth().verifyIdToken(token)
        .then((decodedToken) => {
          if (decodedToken.uid === uid) {
            return next();
          } else {
            errorGenerator(errorCodes.INVALID_ACCESS_TOKEN, null, 500, 'Internal server error', res);
          }
        }).catch((err) => {
        errorGenerator(errorCodes.INVALID_ACCESS_TOKEN, err, 500, 'Internal server error', res);
      });
    } else {
      errorGenerator(errorCodes.INVALID_ACCESS_TOKEN, null, 500, 'Internal server error', res);
    }

  }
}

module.exports = new FirebaseAuth();
