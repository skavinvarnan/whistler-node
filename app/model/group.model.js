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
      icon: {
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

  async createGroup(name, adminUid, icon) {
    const objToSave = this.model({ name, icon,
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

  async getGroup(id) {
    let group = await this.model.findOne({ _id: id });
    if (group) {
      group = group.toObject();
      return group;
    } else {
      return null;
    }
  }

  async leaveGroup(id, uid) {
    const group = await this.model.findOne({ _id: id });
    if (group) {
      const index = group.members.indexOf(uid);
      group.members.splice(index, 1);
      await this.model.update({ _id: id }, group);
      return true;
    } else {
      return false;
    }
  }

  async deleteGroup(id) {
    const group = await this.model.remove({ _id: id });
    return !!group;
  }

  async editGroup(id, groupName, icon) {
    const group = await this.model.findOne({ _id: id });
    if (group) {
      group.name = groupName;
      group.icon = icon;
      await this.model.update({ _id: id }, group);
      return true;
    } else {
      return false;
    }
  }
}

module.exports = new GroupModel();
