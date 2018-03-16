/**
 * Copyright 2018 (C) whistler
 * Created on: 14/03/18
 * Author: Kavin Varnan
 */

const express = require('express');
const userController = require('./../controllers/user.controller');

const router = express.Router();

router.get('/create_user/:name', async (req, res) => {
  await userController.createUser(req, res);
});

module.exports = router;
