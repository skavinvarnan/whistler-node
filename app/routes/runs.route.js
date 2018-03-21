/**
 * Copyright 2018 (C) whistler
 * Created on: 14/03/18
 * Author: Kavin Varnan
 */

const express = require('express');
const runsController = require('../controllers/runs.controller');

const router = express.Router();

router.get('/create_initial_model/:matchKey/:teamA/:teamB', async (req, res) => {
  await runsController.createInitialModel(req, res);
});

router.get('/update_runs/:matchKey/:team/:over/:runs', async (req, res) => {
  await runsController.updateRuns(req, res);
});

module.exports = router;
