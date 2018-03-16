/**
 * Copyright 2018 (C) whistler
 * Created on: 14/03/18
 * Author: Kavin Varnan
 */

const mongoose = require('mongoose');
const keygen = require('keygenerator');


class GroupModel {
  constructor() {
    const schema = new mongoose.Schema({
      name: {
        type: String,
        required: true,
      },
      groupId: {
        type: String,
        required: true,
      },
      joinCode: {
        type: String,
        required: true,
      },
      admin: {
        type: String,
        required: true,
      },
      members: {
        type: [String],
        required: true,
        index: true,
      },
    }, { strict: true });

    this.model = mongoose.model('groups', schema);
  }

  async createGroup(name, adminUid) {
    const objToSave = this.model({ name,
      admin: adminUid,
      members: [adminUid],
      joinCode: keygen.number({ length: 6 }),
      groupId: keygen.password({ chars: true, length: 4, numbers: false }).toLocaleLowerCase() });
    let savedObj = await objToSave.save();
    return savedObj;
  }

  async joinGroup(groupId, joinCode, uid) {
    const group = await this.model.findOne({ groupId, joinCode });
    if (group) {
      if (!group.members.includes(uid)) {
        group.members.push(uid);
        await this.model.update({ groupId, joinCode }, group);
      }
      return true;
    } else {
      return false;
    }
  }

  async listAllMyGroups(uid) {
    const groups = await this.model.find({ members: uid });
    return groups;
  }
}

module.exports = new GroupModel();
