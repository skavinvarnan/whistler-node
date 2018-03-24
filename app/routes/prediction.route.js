/**
 * Copyright 2018 (C) whistler
 * Created on: 14/03/18
 * Author: Kavin Varnan
 */

const express = require('express');
const predictionController = require('./../controllers/prediction.controller');

const router = express.Router();

router.get('/predict/:matchKey/:team/:over/:runs', async (req, res) => {
  await predictionController.savePrediction(req, res);
});

router.get('/my_prediction_table/:matchKey', async (req, res) => {
  await predictionController.myPredictionTable(req, res);
});

module.exports = router;
