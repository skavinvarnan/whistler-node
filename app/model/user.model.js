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
      email: {
        type: String,
        required: true,
      },
    }, { strict: true });

    this.model = mongoose.model('users', schema);
  }

  async createOrUpdateUser (name, uid, email) {
    const user = await this.model.findOne({ uid });
    if (!user) {
      const objToSave = this.model({ name, uid, email });
      let savedObj = await objToSave.save();
      return savedObj;
    } else {
      user['name'] = name;
      return await this.model.update({ uid }, user);
    }


  }

  async getUsersWithUids(uids) {
    const resArr = await this.model.find({ uid: uids });
    let arr = [];
    resArr.forEach(obj => {
      arr.push(obj.toObject());
    });
    return arr;
  }

}

module.exports = new UserModel();
