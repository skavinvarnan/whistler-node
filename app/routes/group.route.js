/**
 * Copyright 2018 (C) whistler
 * Created on: 14/03/18
 * Author: Kavin Varnan
 */

const express = require('express');
const groupController = require('../controllers/group.controller');
const firebaseAuth = require('../policies/firebase.auth');

const router = express.Router();

router.get('/create_group/:groupName/:icon', firebaseAuth.auth, async (req, res) => {
  await groupController.createGroup(req, res);
});

router.get('/join_group/:groupId/:joinCode', firebaseAuth.auth, async (req, res) => {
  await groupController.joinGroup(req, res);
});

router.get('/list_all_groups', firebaseAuth.auth, async (req, res) => {
  await groupController.listAllMyGroups(req, res);
});

router.get('/leave_group/:id', async (req, res) => {
  await groupController.leaveGroup(req, res);
});

router.get('/remove_member/:id/:uid', async (req, res) => {
  await groupController.removeMember(req, res);
});

router.get('/delete_group/:id', async (req, res) => {
  await groupController.deleteGroup(req, res);
});

router.get('/edit_group/:id/:groupName/:icon', async (req, res) => {
  await groupController.editGroup(req, res);
});

router.get('/get_everyone_form_group/:id/:matchKey', async (req, res) => {
  await groupController.getEveryoneFormGroup(req, res);
});

module.exports = router;
