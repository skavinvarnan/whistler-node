/**
 * Copyright 2018 (C) whistler
 * Created on: 14/03/18
 * Author: Kavin Varnan
 */

const mongoose = require('mongoose');

class RunsModel {
  constructor() {

    this.teamRunsFinishedKey = {'a': ['a_1_f', 'a_2_f', 'a_3_f', 'a_4_f', 'a_5_f', 'a_6_f', 'a_7_f', 'a_8_f', 'a_9_f', 'a_10_f',
      'a_11_f', 'a_12_f', 'a_13_f', 'a_14_f', 'a_15_f', 'a_16_f', 'a_17_f', 'a_18_f', 'a_19_f', 'a_20_f'], 'b': ['b_1_f', 'b_2_f', 'b_3_f', 'b_4_f', 'b_5_f', 'b_6_f', 'b_7_f', 'b_8_f', 'b_9_f', 'b_10_f',
      'b_11_f', 'b_12_f', 'b_13_f', 'b_14_f', 'b_15_f', 'b_16_f', 'b_17_f', 'b_18_f', 'b_19_f', 'b_20_f']};

    const schema = new mongoose.Schema({
      match_key: { type: String, required: true, index: true, unique: true },
      team_a: { type: String, required: true },
      team_b: { type: String, required: true },
      a_1: { type: Number, required: true },
      a_2: { type: Number, required: true },
      a_3: { type: Number, required: true },
      a_4: { type: Number, required: true },
      a_5: { type: Number, required: true },
      a_6: { type: Number, required: true },
      a_7: { type: Number, required: true },
      a_8: { type: Number, required: true },
      a_9: { type: Number, required: true },
      a_10: { type: Number, required: true },
      a_11: { type: Number, required: true },
      a_12: { type: Number, required: true },
      a_13: { type: Number, required: true },
      a_14: { type: Number, required: true },
      a_15: { type: Number, required: true },
      a_16: { type: Number, required: true },
      a_17: { type: Number, required: true },
      a_18: { type: Number, required: true },
      a_19: { type: Number, required: true },
      a_20: { type: Number, required: true },
      b_1: { type: Number, required: true },
      b_2: { type: Number, required: true },
      b_3: { type: Number, required: true },
      b_4: { type: Number, required: true },
      b_5: { type: Number, required: true },
      b_6: { type: Number, required: true },
      b_7: { type: Number, required: true },
      b_8: { type: Number, required: true },
      b_9: { type: Number, required: true },
      b_10: { type: Number, required: true },
      b_11: { type: Number, required: true },
      b_12: { type: Number, required: true },
      b_13: { type: Number, required: true },
      b_14: { type: Number, required: true },
      b_15: { type: Number, required: true },
      b_16: { type: Number, required: true },
      b_17: { type: Number, required: true },
      b_18: { type: Number, required: true },
      b_19: { type: Number, required: true },
      b_20: { type: Number, required: true },



      is_toss_done: { type: Boolean, required: true },
      is_started: { type: Boolean, required: true },
      innings_number: { type: String, enum: ['first', 'second', 'other'], required: true },
      is_completed: { type: Boolean, required: true },

      first_batting: { type: String },


      a_1_f: { type: Boolean, required: true },
      a_2_f: { type: Boolean, required: true },
      a_3_f: { type: Boolean, required: true },
      a_4_f: { type: Boolean, required: true },
      a_5_f: { type: Boolean, required: true },
      a_6_f: { type: Boolean, required: true },
      a_7_f: { type: Boolean, required: true },
      a_8_f: { type: Boolean, required: true },
      a_9_f: { type: Boolean, required: true },
      a_10_f: { type: Boolean, required: true },
      a_11_f: { type: Boolean, required: true },
      a_12_f: { type: Boolean, required: true },
      a_13_f: { type: Boolean, required: true },
      a_14_f: { type: Boolean, required: true },
      a_15_f: { type: Boolean, required: true },
      a_16_f: { type: Boolean, required: true },
      a_17_f: { type: Boolean, required: true },
      a_18_f: { type: Boolean, required: true },
      a_19_f: { type: Boolean, required: true },
      a_20_f: { type: Boolean, required: true },
      b_1_f: { type: Boolean, required: true },
      b_2_f: { type: Boolean, required: true },
      b_3_f: { type: Boolean, required: true },
      b_4_f: { type: Boolean, required: true },
      b_5_f: { type: Boolean, required: true },
      b_6_f: { type: Boolean, required: true },
      b_7_f: { type: Boolean, required: true },
      b_8_f: { type: Boolean, required: true },
      b_9_f: { type: Boolean, required: true },
      b_10_f: { type: Boolean, required: true },
      b_11_f: { type: Boolean, required: true },
      b_12_f: { type: Boolean, required: true },
      b_13_f: { type: Boolean, required: true },
      b_14_f: { type: Boolean, required: true },
      b_15_f: { type: Boolean, required: true },
      b_16_f: { type: Boolean, required: true },
      b_17_f: { type: Boolean, required: true },
      b_18_f: { type: Boolean, required: true },
      b_19_f: { type: Boolean, required: true },
      b_20_f: { type: Boolean, required: true },
    }, { strict: true });

    this.model = mongoose.model('runs', schema);
  }

  async createInitialModel(match_key, team_a, team_b) {
    const data = { match_key, team_a, team_b,
      a_1: -1, a_2: -1, a_3: -1, a_4: -1, a_5: -1, a_6: -1, a_7: -1, a_8: -1, a_9: -1, a_10: -1,
      a_11: -1, a_12: -1, a_13: -1, a_14: -1, a_15: -1, a_16: -1, a_17: -1, a_18: -1, a_19: -1, a_20: -1,
      b_1: -1, b_2: -1, b_3: -1, b_4: -1, b_5: -1, b_6: -1, b_7: -1, b_8: -1, b_9: -1, b_10: -1,
      b_11: -1, b_12: -1, b_13: -1, b_14: -1, b_15: -1, b_16: -1, b_17: -1, b_18: -1, b_19: -1, b_20: -1,

      a_1_f: false, a_2_f: false, a_3_f: false, a_4_f: false, a_5_f: false, a_6_f: false, a_7_f: false, a_8_f: false, a_9_f: false, a_10_f: false,
      a_11_f: false, a_12_f: false, a_13_f: false, a_14_f: false, a_15_f: false, a_16_f: false, a_17_f: false, a_18_f: false, a_19_f: false, a_20_f: false,
      b_1_f: false, b_2_f: false, b_3_f: false, b_4_f: false, b_5_f: false, b_6_f: false, b_7_f: false, b_8_f: false, b_9_f: false, b_10_f: false,
      b_11_f: false, b_12_f: false, b_13_f: false, b_14_f: false, b_15_f: false, b_16_f: false, b_17_f: false, b_18_f: false, b_19_f: false, b_20_f: false,
      is_toss_done: false, is_started: false, innings_number: 'other', is_completed: false, first_batting: null
    };
    const objToSave = this.model(data);
    let savedObj = await objToSave.save();
    return savedObj;
  }

  async updateRuns(match_key, team, over, runs) {
    const match = await this.model.findOne({ match_key });
    if (match) {
      const key = `${team}_${over}`;
      match[key] = runs;
      return await this.model.update({ match_key }, match);
    } else {
      return null;
    }
  }

  async getRuns(match_key) {
    let match = await this.model.findOne({ match_key });
    match = match.toObject();
    return match;
  }

  async groupUpdateRuns(match_key, team, overRunsArray,
        is_toss_done, is_started, innings_number, is_completed, first_batting) {
    const match = await this.model.findOne({ match_key });
    if (match) {
      for (let i = 0; i < overRunsArray.length; i++) {
        match[`${team}_${overRunsArray[i].over}`] = overRunsArray[i].runs;
        match[`${team}_${overRunsArray[i].over}_f`] = overRunsArray[i].over_finished;
        if (i === 1 && overRunsArray[i].over_finished) {
          for (let j = 0; j < this.teamRunsFinishedKey[team].length; j++) {
            if (`${team}_${overRunsArray[i].over}_f` !== this.teamRunsFinishedKey[team][j]) {
              match[this.teamRunsFinishedKey[team][j]] = true;
            } else {
              break;
            }
          }
        }
        console.log(`Updating over: ${`${team}_${overRunsArray[i].over}`} runs ${overRunsArray[i].runs}`);
      }
      match['is_toss_done'] = is_toss_done;
      match['is_started'] = is_started;
      match['innings_number'] = innings_number;
      match['is_completed'] = is_completed;
      match['first_batting'] = first_batting;
      await this.model.update({ match_key }, match);
    } else {
      return null;
    }
  }

  async canPredict(match_key, team, over) {
    const match = await this.model.findOne({ match_key });
    if (match) {
      const key = `${team}_${over}`;
      return match[key] === -1;
    } else {
      return false;
    }
  }

}

module.exports = new RunsModel();
