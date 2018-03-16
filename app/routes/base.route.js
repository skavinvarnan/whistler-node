/**
 * Copyright 2018 (C) whistler
 * Created on: 13/03/18
 * Author: Kavin Varnan
 */

const express = require('express');
const utils = require('./utils.route');
const group = require('./group.route');
const user = require('./user.route');
const prediction = require('./prediction.route');
const runs = require('./runs.route');

const router = express.Router();

router.use('/utils', utils);
router.use('/group', group);
router.use('/user', user);
router.use('/prediction', prediction);
router.use('/runs', runs);

module.exports = router;
