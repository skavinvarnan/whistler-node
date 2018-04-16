/**
 * Copyright 2018 (C) whistler
 * Created on: 14/03/18
 * Author: Kavin Varnan
 */

const express = require('express');
const runsController = require('../controllers/runs.controller');
const firebaseAuth = require('../policies/firebase.auth');

const router = express.Router();

router.get('/create_initial_model/:matchKey/:teamA/:teamB', firebaseAuth.auth, async (req, res) => {
  await runsController.createInitialModel(req, res);
});

router.get('/update_runs/:matchKey/:team/:over/:runs', firebaseAuth.auth, async (req, res) => {
  await runsController.updateRuns(req, res);
});

router.get('/score_board/:matchKey', firebaseAuth.auth, async (req, res) => {
  await runsController.scoreBoard(req, res);
});

router.get('/score_board/:matchKey/md', firebaseAuth.auth, async (req, res) => {
  await runsController.scoreBoardWithMd(req, res);
});

module.exports = router;
