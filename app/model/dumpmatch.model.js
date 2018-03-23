/**
 * Copyright 2018 (C) whistler
 * Created on: 22/03/18
 * Author: Kavin Varnan
 */

const mongoose = require('mongoose');

class DumpModel {
  constructor() {
    const schema = new mongoose.Schema({

    }, { strict: false });

    this.model = mongoose.model('dump_match', schema);
  }

  async dumpMatch(dump) {
    const objToSave = this.model(dump);
    let savedObj = await objToSave.save();
    return savedObj;
  }
}

module.exports = new DumpModel();
