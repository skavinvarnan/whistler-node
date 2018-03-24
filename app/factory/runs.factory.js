/**
 * Copyright 2018 (C) whistler
 * Created on: 22/03/18
 * Author: Kavin Varnan
 */

class RunsFactory {
  constructor() {

  }

  convertToScoreCardFromRawResponse(obj) {
    let teamShortName;
    let inningsNumber;
    let runsWickets;
    let overNumber;
    let pShipLabel;
    let pShipData;
    let crrLabel;
    let crrData;
    let rrrLabel;
    let rrrData;
    let matchInfo;
    let batsmanNameOne;
    let batsmanRunsOne;
    let batsmanBallsOne;
    let batsman4sOne;
    let batsman6sOne;
    let batsmanSROne;
    let batsmanNameTwo;
    let batsmanRunsTwo;
    let batsmanBallsTwo;
    let batsman4sTwo;
    let batsman6sTwo;
    let batsmanSRTwo;
    let bowlerName;
    let bowlerOver;
    let bowlerMaiden;
    let bowlerRuns;
    let bowlerWickets;
    let bowlerEconomy;
    let showUpdated;
    let title;

    if (this.isEmpty(obj.data.card.toss)) {
      teamShortName = '--';
      inningsNumber = '1st Inn';
      runsWickets = '';
      overNumber = '';
      pShipLabel = 'P\'SHIP:';
      pShipLabel = '';
      pShipData = '';
      crrLabel = 'CRR:';
      crrLabel = '';
      crrData = '';
      rrrLabel = '';
      rrrData = '';
      matchInfo = 'Waiting for toss';
      batsmanNameOne = '-';
      batsmanRunsOne = '-';
      batsmanBallsOne = '-';
      batsman4sOne = '-';
      batsman6sOne = '-';
      batsmanSROne = '-';
      batsmanNameTwo = '-';
      batsmanRunsTwo = '-';
      batsmanBallsTwo = '-';
      batsman4sTwo = '-';
      batsman6sTwo = '-';
      batsmanSRTwo = '-';
      bowlerName = '-';
      bowlerOver = '-';
      bowlerMaiden = '-';
      bowlerRuns = '-';
      bowlerWickets = '-';
      bowlerEconomy = '-';
      showUpdated = true;
      title = obj.data.card.short_name;
    }



    let response = {
      teamShortName, inningsNumber, runsWickets, overNumber, pShipLabel, pShipData, crrLabel, crrData,
      rrrLabel, rrrData, matchInfo, batsmanNameOne, batsmanRunsOne, batsmanBallsOne, batsman4sOne, batsman6sOne,
      batsmanSROne, batsmanNameTwo, batsmanRunsTwo, batsmanBallsTwo, batsman4sTwo, batsman6sTwo, batsmanSRTwo,
      bowlerName, bowlerOver, bowlerMaiden, bowlerRuns, bowlerWickets, bowlerEconomy, showUpdated, title,
    };
    return response;
  }

  isEmpty(obj) {
    return Object.keys(obj).length === 0;
  }

}

module.exports = new RunsFactory();
