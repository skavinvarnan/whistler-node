/**
 * Copyright 2018 (C) whistler
 * Created on: 13/03/18
 * Author: Kavin Varnan
 */

const express = require('express');
const testController = require('./../controllers/test.controller');
const firebaseAuth = require('../policies/firebase.auth');

const router = express.Router();

router.get('/ping', async (req, res) => {
  res.status(200).json({ server: 'alive' });
});
//
// router.get('/test123', async (req, res) => {
//   await testController.test123(req, res);
// });
//
// router.post('/test', async (req, res) => {
//   await testController.createMatches(req, res);
// });
//
// router.get('/testzzz', async (req, res) => {
//   await testController.test(req, res);
// });

// router.get('/testtemp', async (req, res) => {
//   await testController.testtemp(req, res);
// });

module.exports = router;
