/**
 * Copyright 2018 (C) whistler
 * Created on: 14/03/18
 * Author: Kavin Varnan
 */

const mongoose = require('mongoose');

class UserModel {

  constructor() {
    const schema = new mongoose.Schema({
      name: {
        type: String,
        required: true,
      },
      uid: {
        type: String,
        required: true,
        index: true,
      },
    }, { strict: true });

    this.model = mongoose.model('users', schema);
  }

  async createUser (name, uid) {
    const objToSave = this.model({ name, uid });
    let savedObj = await objToSave.save();
    return savedObj;
  }

}

module.exports = new UserModel();
