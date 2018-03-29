/**
 * Copyright 2018 (C) whistler
 * Created on: 22/03/18
 * Author: Kavin Varnan
 */

const mongoose = require('mongoose');

class DumpModel {
  constructor() {
    const schema = new mongoose.Schema({ }, { strict: false });

    this.model = mongoose.model('dump_match', schema);

    this.testModel = mongoose.model('dump_match_test', new mongoose.Schema({ }, { strict: false }));
  }

  async dumpMatch(dump) {
    const objToSave = this.model(dump);
    let savedObj = await objToSave.save();
    return savedObj;
  }

  async getAllDumpForMatch() {

    const oldArray = await this.model.find({ 'data.card.key': 'wmntriseries_2018_g3' });
    for (let i = 0; i < oldArray.length; i++) {
      const t = oldArray[i].toObject();
      await this.testModel(t).save();
    }

  }

  async getFirstRecordAndDelete() {
    const firstRecord = await this.testModel.findOne();
    const t = firstRecord.toObject();
    await firstRecord.remove();
    return t;
  }
}

module.exports = new DumpModel();
