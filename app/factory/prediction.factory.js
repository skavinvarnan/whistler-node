/**
 * Copyright 2018 (C) whistler
 * Created on: 25/03/18
 * Author: Kavin Varnan
 */

class PredictionFactory {
  constructor() {

    this.teamRunsKeyCombined = ['a_1', 'a_2', 'a_3', 'a_4', 'a_5', 'a_6', 'a_7', 'a_8', 'a_9', 'a_10',
      'a_11', 'a_12', 'a_13', 'a_14', 'a_15', 'a_16', 'a_17', 'a_18', 'a_19', 'a_20', 'b_1', 'b_2', 'b_3', 'b_4', 'b_5', 'b_6', 'b_7', 'b_8', 'b_9', 'b_10',
      'b_11', 'b_12', 'b_13', 'b_14', 'b_15', 'b_16', 'b_17', 'b_18', 'b_19', 'b_20'];

    this.teamRunsKey = [['a_1', 'a_2', 'a_3', 'a_4', 'a_5', 'a_6', 'a_7', 'a_8', 'a_9', 'a_10',
      'a_11', 'a_12', 'a_13', 'a_14', 'a_15', 'a_16', 'a_17', 'a_18', 'a_19', 'a_20'], ['b_1', 'b_2', 'b_3', 'b_4', 'b_5', 'b_6', 'b_7', 'b_8', 'b_9', 'b_10',
      'b_11', 'b_12', 'b_13', 'b_14', 'b_15', 'b_16', 'b_17', 'b_18', 'b_19', 'b_20']];

    // this.teamBRunsKey = ['b_1', 'b_2', 'b_3', 'b_4', 'b_5', 'b_6', 'b_7', 'b_8', 'b_9', 'b_10',
    //   'b_11', 'b_12', 'b_13', 'b_14', 'b_15', 'b_16', 'b_17', 'b_18', 'b_19', 'b_20'];

    this.teamRunsFinishedKey = [['a_1_f', 'a_2_f', 'a_3_f', 'a_4_f', 'a_5_f', 'a_6_f', 'a_7_f', 'a_8_f', 'a_9_f', 'a_10_f',
      'a_11_f', 'a_12_f', 'a_13_f', 'a_14_f', 'a_15_f', 'a_16_f', 'a_17_f', 'a_18_f', 'a_19_f', 'a_20_f'], ['b_1_f', 'b_2_f', 'b_3_f', 'b_4_f', 'b_5_f', 'b_6_f', 'b_7_f', 'b_8_f', 'b_9_f', 'b_10_f',
      'b_11_f', 'b_12_f', 'b_13_f', 'b_14_f', 'b_15_f', 'b_16_f', 'b_17_f', 'b_18_f', 'b_19_f', 'b_20_f']];

    // this.teamBRunsFinishedKey = ['b_1_f', 'b_2_f', 'b_3_f', 'b_4_f', 'b_5_f', 'b_6_f', 'b_7_f', 'b_8_f', 'b_9_f', 'b_10_f',
    //   'b_11_f', 'b_12_f', 'b_13_f', 'b_14_f', 'b_15_f', 'b_16_f', 'b_17_f', 'b_18_f', 'b_19_f', 'b_20_f'];


  }

  createUserPredictionTable(runsObj, predictionObj, pointsObj) {
    let teamBatting = '';
    let status = 'Loading';
    let statusColor = '#007BFA';
    let numberOfRecords = 1;
    let futurePredictionsAllowedCount = 2;
    let teamNumber = -1;
    let isInningsComleted = false;
    if (runsObj.first_batting) {
      if (runsObj.innings_number === 'first') {
        status = "Predictions open. Click the predict button when it turns blue";
        statusColor = '#4bb750';
        teamBatting = runsObj.first_batting;
        teamNumber = teamBatting === 'a' ? 0 : 1;
      } else if (runsObj.innings_number === 'second') {
        status = "Predictions open. Click the predict button when it turns blue";
        statusColor = '#4bb750';
        teamBatting = runsObj.first_batting === 'a' ? 'b' : 'a';
        teamNumber = teamBatting === 'a' ? 0 : 1;
      } else if (runsObj.innings_number === 'other') {
        if (runsObj.is_completed) {
          status = "Predictions closed. Come back for the next match to predict";
          statusColor = '#b72d32';
          teamBatting = runsObj.first_batting === 'a' ? 'b' : 'a';
          teamNumber = teamBatting === 'a' ? 0 : 1;
        } else {
          status = "Predictions open. Click the predict button when it turns blue";
          statusColor = '#4bb750';
          teamBatting = runsObj.first_batting;
          teamNumber = teamBatting === 'a' ? 0 : 1;
        }
      }
    } else {
      return null;
    }


    if (runsObj.is_toss_done) {
      if (runsObj.is_started) {
        // First ball bowled
        numberOfRecords = this.getNumberOfRecords(runsObj, teamNumber);
        const overItems = [];
        const runsItems = [];
        const predictedItems = [];
        const pointsItems = [];
        const predictButtonItems = [];
        isInningsComleted = this.checkIfInningsCompleted(runsObj, teamNumber);
        let itemsToDisplay = 0;
        if (isInningsComleted) {
          itemsToDisplay = numberOfRecords;
        } else {
          if ((numberOfRecords + futurePredictionsAllowedCount) >= 20) {
            itemsToDisplay = 20;
          } else {
            itemsToDisplay = numberOfRecords + futurePredictionsAllowedCount;
          }
        }

        for (let i = 0; i < (numberOfRecords + futurePredictionsAllowedCount); i++) {
          overItems.push(this.generateIndividualItem(`${i + 1}`, '#FFFFFF', false));

          const runsLabel = runsObj[this.teamRunsKey[teamNumber][i]] === -1 ? 'NA' : `${runsObj[this.teamRunsKey[teamNumber][i]]}`;
          runsItems.push(this.generateIndividualItem(runsLabel, '#FFFFFF', false));

          const predictionColor = predictionObj[this.teamRunsKey[teamNumber][i]] === -1 ? '#FFFFFF' : '#5AC8FA';
          const predictionLabel = predictionObj[this.teamRunsKey[teamNumber][i]] === -1 ? 'NA' : `${predictionObj[this.teamRunsKey[teamNumber][i]]}`;
          predictedItems.push(this.generateIndividualItem(predictionLabel, predictionColor, false));

          const points = pointsObj[this.teamRunsKey[teamNumber][i]];
          let pointsColor;
          if (points === 0) {
            pointsColor = '#FFFFFF';
          } else if (points === 1) {
            pointsColor = '#4CD964';
          } else if (points === 5) {
            pointsColor = '#FF3B30';
          } else if (points === 7) {
            pointsColor = '#007AFF';
          } else if (points === 10) {
            pointsColor = '#bb63cc';
          } else {
            pointsColor = '#000000';
          }
          pointsItems.push(this.generateIndividualItem(`${points}`, pointsColor, false)); // dynamic
          if (i < numberOfRecords) {
            if (i === 0 && runsObj.innings_number === "second" && runsObj[this.teamRunsKey[teamNumber][i+1]] === -1) {
              predictButtonItems.push(this.generateIndividualItem('Predict', "#FFFFFF", true));
            } else {
              predictButtonItems.push(this.generateIndividualItem('Predict', "#FFFFFF", false));
            }
          } else {
            predictButtonItems.push(this.generateIndividualItem('Predict', "#FFFFFF", true));
          }
        }

        return { status, statusColor, teamBatting, response: this.generateTableItems(itemsToDisplay, overItems, runsItems, predictedItems, pointsItems, predictButtonItems) };

      } else {
        const overItems = [];
        const runsItems = [];
        const predictedItems = [];
        const pointsItems = [];
        const predictButtonItems = [];

        for (let i = 0; i < (numberOfRecords + futurePredictionsAllowedCount); i++) {
          // Toss done but the first ball is not bolwed
          overItems.push(this.generateIndividualItem(`${i + 1}`, '#FFFFFF', false));
          const runsLabel = runsObj[this.teamRunsKey[teamNumber][i]] === -1 ? 'NA' : `${runsObj[this.teamRunsKey[teamNumber][i]]}`;
          runsItems.push(this.generateIndividualItem(runsLabel, '#FFFFFF', false));

          const predictionColor = predictionObj[this.teamRunsKey[teamNumber][i]] === -1 ? '#FFFFFF' : '#5AC8FA';
          const predictionLabel = predictionObj[this.teamRunsKey[teamNumber][i]] === -1 ? 'NA' : `${predictionObj[this.teamRunsKey[teamNumber][i]]}`;
          predictedItems.push(this.generateIndividualItem(predictionLabel, predictionColor, false)); // runs is dynamic


          const points = pointsObj[this.teamRunsKey[teamNumber][i]];
          let pointsColor;
          if (points === 0) {
            pointsColor = '#FFFFFF';
          } else if (points === 1) {
            pointsColor = '#4CD964';
          } else if (points === 5) {
            pointsColor = '#FF3B30';
          } else if (points === 7) {
            pointsColor = '#007AFF';
          } else if (points === 10) {
            pointsColor = '#bb63cc';
          } else {
            pointsColor = '#000000';
          }
          pointsItems.push(this.generateIndividualItem(`${points}`, pointsColor, false)); // dynamic
          predictButtonItems.push(this.generateIndividualItem('Predict', '#FFFFFF', true)); // dynamic
        }

        return { status, statusColor, teamBatting, response: this.generateTableItems((numberOfRecords + futurePredictionsAllowedCount), overItems, runsItems, predictedItems, pointsItems, predictButtonItems) };

      }
    } else {
      return null; // This is the pedios when the pre match start and the toss is not done
    }
  }

  checkIfInningsCompleted(runsObj, teamNumber) {
    if (runsObj.is_completed) {
      return true; // Will only work on second innings.
    } else {
      let flag = false;
      if (runsObj[this.teamRunsKey[teamNumber][19]] !== -1 && runsObj[this.teamRunsFinishedKey[teamNumber][19]]) {
        return true;
      }
      for (let i = 0; i < this.teamRunsKey[0].length - 1; i++) {
        if (runsObj[this.teamRunsFinishedKey[teamNumber][i]] &&
          runsObj[this.teamRunsKey[teamNumber][i+1]] === -1) {
          flag = true;
        }
      }
      return flag;
    }
  }

  getNumberOfRecords(runsObj, teamNumber) {
    if (runsObj[this.teamRunsFinishedKey[teamNumber][19]]) {
      return 20;
    }
    for (let i = 0; i < this.teamRunsKey[0].length; i ++) {
      if(!runsObj[this.teamRunsFinishedKey[teamNumber][i]]) {
        return i + 1;
      }
    }
  }

  generateIndividualItem(label, colorHex, clickable) {
    return { label, colorHex, whiteText: colorHex !== '#FFFFFF', clickable, radius: 5 }
  }

  generateTableItems(numberOfItems, overItems, runsItem, predictedItems, pointsItems, predictedButtonItems) {
    let response = [];
    for (let i = 0; i < numberOfItems; i++) {
      response.push({ over: overItems[i],
        runs: runsItem[i],
        predicted: predictedItems[i],
        points: pointsItems[i],
        predictButton: predictedButtonItems[i],})
    }

    return response;
  }

  getUserPredictionReport(runsObj, predictionObj, pointsObj) {
    const response = [];
    for (let i = 0; i < this.teamRunsKeyCombined.length; i++) {
      const obj = {};
      obj.over = `${runsObj['team_' + this.teamRunsKeyCombined[i].charAt(0)].toUpperCase()} - ${this.teamRunsKeyCombined[i].substr(2, this.teamRunsKeyCombined[i].length)}`;
      obj.runs = runsObj[this.teamRunsKeyCombined[i]] === -1 ? 'NA' : `${runsObj[this.teamRunsKeyCombined[i]]}`;
      obj.predicted = predictionObj[this.teamRunsKeyCombined[i]]=== -1 ? 'NA' : `${predictionObj[this.teamRunsKeyCombined[i]]}`;
      obj.points = `${pointsObj[this.teamRunsKeyCombined[i]]}`;
      response.push(obj)
    }
    return response;
  }

}

module.exports = new PredictionFactory();
