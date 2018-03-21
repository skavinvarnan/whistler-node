/**
 * Copyright 2018 (C) whistler
 * Created on: 13/03/18
 * Author: Kavin Varnan
 */

const errorResponse = require('../error/error.codes').errorResponse;

const errorGenerator = (code, err, alternativeCode, alternativeMessage, res) => {
  if (code) {
    let errorReturned = false;
    for (const [k, v] of Object.entries(errorResponse)) {
      if (errorResponse[k].code === code) {
        if (v) res.status(200).json({ error: v });
        else res.status(200).json({ error: { code: v.code, message: alternativeMessage } });
        errorReturned = true;
        break;
      }
    }
    if (!errorReturned) res.status(200).json({ error: { code, message: alternativeMessage, err } });
  } else {
    res.status(200).json({ error: { code: alternativeCode, message: alternativeMessage, err } });
  }
};

module.exports = errorGenerator;
