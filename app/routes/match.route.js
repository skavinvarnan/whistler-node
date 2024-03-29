/**
 * Copyright 2018 (C) whistler
 * Created on: 21/03/18
 * Author: Kavin Varnan
 */

const express = require('express');
const matchController = require('./../controllers/match.controller');
const firebaseAuth = require('../policies/firebase.auth');

const router = express.Router();

router.get('/schedule', firebaseAuth.auth, async (req, res) => {
  await matchController.getMatchSchedule(req, res);
});

router.get('/happening_schedule', firebaseAuth.auth, async (req, res) => {
  await matchController.getHappeningSchedule(req, res);
});

router.get('/all_match_points/:uid', firebaseAuth.auth, async (req, res) => {
  await matchController.getAllMatchPointsForUser(req, res);
});

router.get('/get_some_match_to_display', firebaseAuth.auth, async (req, res) => {
  await matchController.getSomeMatchToDisplay(req, res);
});

router.get('/leader_board/:matchKey', firebaseAuth.auth, async (req, res) => {
  await matchController.getLeaderBoard(req, res);
});


module.exports = router;
