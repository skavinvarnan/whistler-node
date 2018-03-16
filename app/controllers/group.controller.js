/**
 * Copyright 2018 (C) whistler
 * Created on: 14/03/18
 * Author: Kavin Varnan
 */

const errorGenerator = require('../error/error.factory');
const errorCodes = require('../error/error.codes').errorCodes;
const groupModel = require('../model/group.model');

class GroupController {

  constructor() {
  }

  async createGroup(req, res) {
    try {
      const groupName = req.params.groupName;
      const uid = req.headers.uid;
      const group = await groupModel.createGroup(groupName, uid);
      res.status(200).json(group);
    } catch (err) {
      errorGenerator(errorCodes.INTERNAL_SERVER_ERROR, 500, 'Internal server error', res);
    }
  }

  async joinGroup(req, res) {
    try {
      const groupId = req.params.groupId;
      const joinCode = req.params.joinCode;
      const uid = req.headers.uid;
      const isJoinSuccess = await groupModel.joinGroup(groupId, joinCode, uid);
      if (isJoinSuccess) {
        res.status(200).json({ success: true });
      } else {
        errorGenerator(errorCodes.NOT_FOUND, 500, 'Internal server error', res);
      }
    } catch (err) {
      errorGenerator(errorCodes.INTERNAL_SERVER_ERROR, 500, 'Internal server error', res);
    }
  };

  async listAllMyGroups(req, res) {
    try {
      const uid = req.headers.uid;
      const groups = await groupModel.listAllMyGroups(uid);
      res.status(200).json({ groups });
    } catch (err) {
      errorGenerator(errorCodes.INTERNAL_SERVER_ERROR, 500, 'Internal server error', res);
    }
  }
}

module.exports = new GroupController();
