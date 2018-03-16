/**
 * Copyright 2018 (C) whistler
 * Created on: 14/03/18
 * Author: Kavin Varnan
 */

const express = require('express');
const groupController = require('../controllers/group.controller');

const router = express.Router();

router.get('/create_group/:groupName', async (req, res) => {
  await groupController.createGroup(req, res);
});

router.get('/join_group/:groupId/:joinCode', async (req, res) => {
  await groupController.joinGroup(req, res);
});

router.get('/list_all_groups', async (req, res) => {
  await groupController.listAllMyGroups(req, res);
});

module.exports = router;
