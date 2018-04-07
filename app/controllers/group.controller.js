/**
 * Copyright 2018 (C) whistler
 * Created on: 14/03/18
 * Author: Kavin Varnan
 */

const errorGenerator = require('../error/error.factory');
const errorCodes = require('../error/error.codes').errorCodes;
const groupModel = require('../model/group.model');
const pointsModel = require('../model/points.model');
const userModel = require('../model/user.model');
const overAllPointsModel = require('../model/overallpoints.model');
const transferModel = require('../model/transfer.model');

class GroupController {

  constructor() {
  }

  async createGroup(req, res) {
    try {
      const groupName = req.params.groupName;
      const icon = req.params.icon;
      const uid = req.headers.uid;
      const group = await groupModel.createGroup(groupName, uid, icon);
      res.status(200).json(group);
    } catch (err) {
      errorGenerator(errorCodes.INTERNAL_SERVER_ERROR, err, 500, 'Internal server error', res);
    }
  }

  async joinGroup(req, res) {
    try {
      const groupId = req.params.groupId.toLowerCase();
      const joinCode = req.params.joinCode;
      const uid = req.headers.uid;
      const isJoinSuccess = await groupModel.joinGroup(groupId, joinCode, uid);
      if (isJoinSuccess) {
        res.status(200).json({ success: true });
      } else {
        errorGenerator(errorCodes.NOT_FOUND, null, 500, 'Internal server error', res);
      }
    } catch (err) {
      errorGenerator(errorCodes.INTERNAL_SERVER_ERROR, err, 500, 'Internal server error', res);
    }
  };

  async listAllMyGroups(req, res) {
    try {
      const uid = req.headers.uid;
      const groups = await groupModel.listAllMyGroups(uid);
      res.status(200).json({ groups });
    } catch (err) {
      errorGenerator(errorCodes.INTERNAL_SERVER_ERROR, err, 500, 'Internal server error', res);
    }
  }

  async leaveGroup(req, res) {
    try {
      const uid = req.headers.uid;
      const id = req.params.id;
      const isSuccess = await groupModel.leaveGroup(id, uid);
      if (isSuccess) {
        res.status(200).json({ success: true });
      } else {
        errorGenerator(errorCodes.NOT_FOUND, null, 500, 'Internal server error', res);
      }
    } catch(err) {
      errorGenerator(errorCodes.INTERNAL_SERVER_ERROR, err, 500, 'Internal server error', res);
    }
  }

  async removeMember(req, res) {
    try {
      const memberUid = req.params.uid;
      const id = req.params.id;
      const isSuccess = await groupModel.leaveGroup(id, memberUid);
      if (isSuccess) {
        res.status(200).json({ success: true });
      } else {
        errorGenerator(errorCodes.NOT_FOUND, null, 500, 'Internal server error', res);
      }
    } catch(err) {
      errorGenerator(errorCodes.INTERNAL_SERVER_ERROR, err, 500, 'Internal server error', res);
    }
  }

  async deleteGroup(req, res) {
    try {
      const id = req.params.id;
      const isSuccess = await groupModel.deleteGroup(id);
      if (isSuccess) {
        res.status(200).json({ success: true });
      } else {
        errorGenerator(errorCodes.NOT_FOUND, null, 500, 'Internal server error', res);
      }
    } catch(err) {
      errorGenerator(errorCodes.INTERNAL_SERVER_ERROR, err, 500, 'Internal server error', res);
    }
  }

  async editGroup(req, res) {
    try {
      const groupName = req.params.groupName;
      const icon = req.params.icon;
      const id = req.params.id;
      const isSuccess = await groupModel.editGroup(id, groupName, icon);
      if (isSuccess) {
        res.status(200).json({ success: true });
      } else {
        errorGenerator(errorCodes.NOT_FOUND, null, 500, 'Internal server error', res);
      }
    } catch(err) {
      errorGenerator(errorCodes.INTERNAL_SERVER_ERROR, err, 500, 'Internal server error', res);
    }
  }

  async getEveryoneFormGroup(req, res) {
    try {
      const id = req.params.id;
      const matchKey = req.params.matchKey;
      const group = await groupModel.getGroup(id);
      if (group) {
        const points = await pointsModel.getPointsForUsersOnlyUidAndTotal(matchKey, group.members);
        const users = await userModel.getUsersWithUids(group.members);
        const overAllPoints = await overAllPointsModel.getOverAllPointsWithUids(group.members);
        const transfer = await transferModel.getRecord();

        let merge1 = users.map(x => Object.assign(x, points.find(y => y.uid === x.uid)));
        let merge2 = merge1.map(x => Object.assign(x, overAllPoints.find(y => y.uid === x.uid)));

        if (transfer) {
          res.status(200).json({ groupMembers: merge2, transfer });
        } else {
          res.status(200).json({ groupMembers: merge2 });
        }

      } else {
        errorGenerator(errorCodes.NOT_FOUND, null, 500, 'Internal server error', res);
      }
    } catch (err) {
      errorGenerator(errorCodes.INTERNAL_SERVER_ERROR, err, 500, 'Internal server error', res);
    }
  }
}

module.exports = new GroupController();
