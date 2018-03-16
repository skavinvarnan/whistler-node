/**
 * Copyright 2018 (C) whistler
 * Created on: 14/03/18
 * Author: Kavin Varnan
 */

const express = require('express');
const runsController = require('../controllers/runs.controller');

const router = express.Router();

router.get('/save_runs/:match/:over/:runs', async (req, res) => {
  await runsController.saveRuns(req, res);
});

router.get('/check_if_exists/:match/:over', async (req, res) => {
  await runsController.checkRunsExists(req, res);
});

module.exports = router;
