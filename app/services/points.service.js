/**
 * Copyright 2018 (C) whistler
 * Created on: 26/03/18
 * Author: Kavin Varnan
 */

const predictionModel = require('../model/predictions.model');
const pointsModel = require('../model/points.model');
const pointsComputedModel = require('../model/pointscomputed.model');

class PointsFactory {
  constructor() {
    this.teamRunsKey = [['a_1', 'a_2', 'a_3', 'a_4', 'a_5', 'a_6', 'a_7', 'a_8', 'a_9', 'a_10',
      'a_11', 'a_12', 'a_13', 'a_14', 'a_15', 'a_16', 'a_17', 'a_18', 'a_19', 'a_20'], ['b_1', 'b_2', 'b_3', 'b_4', 'b_5', 'b_6', 'b_7', 'b_8', 'b_9', 'b_10',
      'b_11', 'b_12', 'b_13', 'b_14', 'b_15', 'b_16', 'b_17', 'b_18', 'b_19', 'b_20']];

    this.teamRunsFinishedKey = [['a_1_f', 'a_2_f', 'a_3_f', 'a_4_f', 'a_5_f', 'a_6_f', 'a_7_f', 'a_8_f', 'a_9_f', 'a_10_f',
      'a_11_f', 'a_12_f', 'a_13_f', 'a_14_f', 'a_15_f', 'a_16_f', 'a_17_f', 'a_18_f', 'a_19_f', 'a_20_f'], ['b_1_f', 'b_2_f', 'b_3_f', 'b_4_f', 'b_5_f', 'b_6_f', 'b_7_f', 'b_8_f', 'b_9_f', 'b_10_f',
      'b_11_f', 'b_12_f', 'b_13_f', 'b_14_f', 'b_15_f', 'b_16_f', 'b_17_f', 'b_18_f', 'b_19_f', 'b_20_f']];
  }

  async computeRunsForMatch(pointsComputedObj, runsObj) {

    let teamBatting = '';
    let teamNumber = -1;
    if (runsObj.first_batting) {
      if (runsObj.innings_number === 'first') {
        teamBatting = runsObj.first_batting;
        teamNumber = teamBatting === 'a' ? 0 : 1;
      } else if (runsObj.innings_number === 'second') {
        teamBatting = runsObj.first_batting === 'a' ? 'b' : 'a';
        teamNumber = teamBatting === 'a' ? 0 : 1;
      } else if (runsObj.innings_number === 'other') {
        // handle case
      }
    }

    for (let i = 0; i < this.teamRunsKey[0].length; i++) {
      if (!pointsComputedObj[this.teamRunsKey[teamNumber][i]]) {
        if (runsObj[this.teamRunsFinishedKey[teamNumber][i]]) {
          const allPredictedUser = await predictionModel.getAllUserWithMatchKeyAndNotPredictedForOver(runsObj.match_key, this.teamRunsKey[teamNumber][i]);

          for (let j = 0; j < allPredictedUser.length; j++) {
            const predictedValue = allPredictedUser[j][this.teamRunsKey[teamNumber][i]];
            let pointsForUser = 0;
            if (predictedValue !== -1 && runsObj[this.teamRunsKey[teamNumber][i]] !== -1) {
              if (predictedValue === runsObj[this.teamRunsKey[teamNumber][i]]) {
                pointsForUser = 10;
              } else if (predictedValue === runsObj[this.teamRunsKey[teamNumber][i]] - 1
                || predictedValue === runsObj[this.teamRunsKey[teamNumber][i]] + 1) {
                pointsForUser = 7;
              } else if (predictedValue === runsObj[this.teamRunsKey[teamNumber][i]] - 2
                || predictedValue === runsObj[this.teamRunsKey[teamNumber][i]] + 2) {
                pointsForUser = 5;
              } else {
                pointsForUser = 1;
              }
              if (i === 9 || i === 19) {
                pointsForUser = pointsForUser * 2;
              }
            } else {
              pointsForUser = 0;
            }
            await pointsModel.updatePointsForUser(runsObj.match_key, allPredictedUser[j].uid, this.teamRunsKey[teamNumber][i], pointsForUser);
            console.log(`Point for user ${allPredictedUser[j].uid} for over ${i+1} is ${pointsForUser}`);
          }
          await pointsComputedModel.updatePointsComputedForOver(runsObj.match_key, this.teamRunsKey[teamNumber][i]);
        } else {
          console.log(`prediction notdone for ${this.teamRunsKey[teamNumber][i]} over also not completed as of now`);
        }
      } else {
        console.log(`computation done for ${this.teamRunsKey[teamNumber][i]}`);
      }
    }
  }
}

module.exports = new PointsFactory();
