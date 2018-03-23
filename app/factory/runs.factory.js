/**
 * Copyright 2018 (C) whistler
 * Created on: 22/03/18
 * Author: Kavin Varnan
 */

class RunsFactory {
  constructor() {

  }

  convertToScoreCardFromRedisObject(obj) {
    let teamShortName;
    if (this.isEmpty(obj.data.toss)) {
      teamShortName = 'Waiting for toss';
    }

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
    let showRrr;
    let showUpdated;

    let title;

    let response = {
      teamShortName: 'KXIP',
      inningsNumber: '2',
      runsWickets: '3-0',
      overNumber: '4',
      pShipLabel: '5',
      pShipData: '6',
      crrLabel: '7',
      crrData: '8',
      rrrLabel: '9',
      rrrData: '10',
      matchInfo: '11',
      batsmanNameOne: '12',
      batsmanRunsOne: '555',
      batsmanBallsOne: '120',
      batsman4sOne: '15',
      batsman6sOne: '16',
      batsmanSROne: '17',
      batsmanNameTwo: '18',
      batsmanRunsTwo: '888',
      batsmanBallsTwo: '120',
      batsman4sTwo: '21',
      batsman6sTwo: '22',
      batsmanSRTwo: '23',
      bowlerName: '24',
      bowlerOver: '25',
      bowlerMaiden: '26',
      bowlerRuns: '27',
      bowlerWickets: '28',
      bowlerEconomy: '29',
      showRrr: true,
      showUpdated: true,

      title: 'asdf',
    };
    return response;
  }

  isEmpty(obj) {
    return Object.keys(obj).length === 0;
  }

}

module.exports = new RunsFactory();
