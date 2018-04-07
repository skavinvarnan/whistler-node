/**
 * Copyright 2018 (C) whistler
 * Created on: 07/04/18
 * Author: Kavin Varnan
 */

const mongoose = require('mongoose');

class TransferModel {
  constructor() {
    const schema = new mongoose.Schema({
      key: {
        type: String,
        index: true,
        required: true,
        unique: true,
      },
      above_button: {
        type: String,
        required: true,
      },
      main: {
        type: String,
        required: true,
      },
      download: {
        type: String,
        required: true,
      },
    }, { strict: true });

    this.model = mongoose.model('transfer', schema);

  }

  async getRecord() {
    const firstRecord = await this.model.findOne({ key: 'data' });
    if (firstRecord) {
      const t = firstRecord.toObject();
      return t;
    } else {
      return null;
    }
  }

}

module.exports = new TransferModel();
