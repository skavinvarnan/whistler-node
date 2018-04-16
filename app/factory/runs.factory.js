/**
 * Copyright 2018 (C) whistler
 * Created on: 22/03/18
 * Author: Kavin Varnan
 */

class RunsFactory {
  constructor() {

  }

  convertToScoreCardFromRawResponse(obj) {
    let teamShortName = '--';
    let inningsNumber = '1st Inn';
    let runsWickets = '';
    let overNumber = '';
    let pShipLabel = '';
    let pShipData = '';
    let crrLabel = '';
    let crrData = '';
    let rrrLabel = '';
    let rrrData = '';
    let matchInfo = 'Waiting for toss';
    let batsmanNameOne = '-';
    let batsmanRunsOne = '-';
    let batsmanBallsOne = '-';
    let batsman4sOne = '-';
    let batsman6sOne = '-';
    let batsmanSROne = '-';
    let batsmanNameTwo = '-';
    let batsmanRunsTwo = '-';
    let batsmanBallsTwo = '-';
    let batsman4sTwo = '-';
    let batsman6sTwo = '-';
    let batsmanSRTwo = '-';
    let bowlerName = '-';
    let bowlerOver = '-';
    let bowlerMaiden = '-';
    let bowlerRuns = '-';
    let bowlerWickets = '-';
    let bowlerEconomy = '-';
    let showUpdated = true;
    let title = 'Waiting';
    let battingTeam = '';

    if (obj.data.card.toss && this.isEmpty(obj.data.card.toss)) {
      teamShortName = '--';
      inningsNumber = '1st Inn';
      runsWickets = '';
      overNumber = '';
      pShipLabel = '';
      pShipData = '';
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
      battingTeam = '';
      showUpdated = true;
      title = obj.data.card.short_name;
    } else { // Toss done scenario

      if (obj.data.card.status_overview === 'pre_match') {
        if (obj.data.card.toss && !this.isEmpty(obj.data.card.toss)) {
          matchInfo = obj.data.card.toss.str;
        } else {
          matchInfo = 'Waiting for toss';
        }
      } else if (obj.data.card.status_overview === 'scheduled') {
        matchInfo = 'Match scheduled to start';
      } else if (obj.data.card.status_overview === 'in_play') {
        matchInfo = 'in play'
      } else if (obj.data.card.status_overview === 'strategic_timeout' || obj.data.card.status_overview === 'drinks_break' || obj.data.card.status_overview === 'lunch_break') {
        matchInfo = 'Strategic timeout';
      } else if (obj.data.card.status_overview === 'innings_break') {
        matchInfo = 'Innings break';
      } else if (obj.data.card.status_overview === 'rain_delay') {
        matchInfo = 'Rain delay';
      } else if (obj.data.card.status_overview === 'stumps') {
        matchInfo = 'Stumps';
      } else if (obj.data.card.status_overview === 'bad_light') {
        matchInfo = 'Bad light';
      } else if (obj.data.card.status_overview === 'crowd_trouble') {
        matchInfo = 'Crowd trouble';
      } else if (obj.data.card.status_overview === 'bad_pitch_condition') {
        matchInfo = 'Bad pitch condition';
      } else if (obj.data.card.status_overview === 'result') {
        matchInfo = obj.data.card.msgs.completed
      } else if (obj.data.card.status_overview === 'abandoned') {
        matchInfo = 'Match Abandoned';
      } else if (obj.data.card.status_overview === 'canceled') {
        matchInfo = 'Match Canceled';
      } else if (obj.data.card.status_overview === 'floodlight_failure') {
        matchInfo = 'Flood light failure';
      } else if (obj.data.card.status_overview === 'play_suspended_unknown') {
        matchInfo = 'Play suspended';
      } else if (obj.data.card.status_overview === 'start_delayed') {
        matchInfo = 'Start delayed';
      } else if (obj.data.card.status_overview === 'ball_change') {
        matchInfo = 'Ball change';
      } else if (obj.data.card.status_overview === 'player_injured') {
        matchInfo = 'Player injured';
      } else {
        matchInfo = '--';
      }

      if (obj.data.card.now.runs_str) {
        let splitRuns = obj.data.card.now.runs_str.split(' in ');
        teamShortName = `${obj.data.card.teams[obj.data.card.now.batting_team].short_name}`;
        battingTeam = obj.data.card.now.batting_team;
        inningsNumber = '1st Inn';
        runsWickets = `${splitRuns[0]}`;
        overNumber = `${splitRuns[1]} Ov`;
        if (obj.data.card.innings && !this.isEmpty(obj.data.card.innings)) {
          pShipLabel = 'DOTs:';
          pShipData = `${obj.data.card.innings[obj.data.card.now.batting_team + '_' + obj.data.card.now.innings].dotballs}`;
        } else {
          pShipLabel = '';
          pShipData = '';
        }
        crrLabel = 'CRR:';
        crrData = `${obj.data.card.now.run_rate}`;
      } else {
        teamShortName = '--';
        inningsNumber = '1st Inn';
        runsWickets = '';
        overNumber = '';
        pShipLabel = '';
        pShipData = '';
        crrLabel = '';
        crrData = '';
      }
      if (obj.data.card.now.req && !this.isEmpty(obj.data.card.now.req)) {
        rrrLabel = 'RRR:';
        rrrData = `${obj.data.card.now.req.runs_rate}`;
        inningsNumber = '2nd Inn';
        if (obj.data.card.status_overview === 'in_play') {
          matchInfo = `${teamShortName} need ${obj.data.card.now.req.runs} runs from ${obj.data.card.now.req.balls} balls`
        }
      } else {
        rrrLabel = '';
        rrrData = '';
      }
      let batsManOne;
      if (obj.data.card.now.striker) {
        batsManOne = this.getPlayerInformation(obj, obj.data.card.now.striker);
        batsmanNameOne = `${batsManOne.name} *`;
        if (batsManOne.match.innings['1'].batting && batsManOne.match.innings['1'].batting.runs) {
          batsmanRunsOne = `${batsManOne.match.innings['1'].batting.runs}`;
          batsmanBallsOne = `${batsManOne.match.innings['1'].batting.balls}`;
          batsman4sOne = `${batsManOne.match.innings['1'].batting.fours}`;
          batsman6sOne = `${batsManOne.match.innings['1'].batting.sixes}`;
          batsmanSROne = `${batsManOne.match.innings['1'].batting.strike_rate}`;
        } else {
          batsmanRunsOne = '-';
          batsmanBallsOne = '-';
          batsman4sOne = '-';
          batsman6sOne = '-';
          batsmanSROne = '-';
        }
      } else {
        batsmanNameOne = '-';
        batsmanRunsOne = '-';
        batsmanBallsOne = '-';
        batsman4sOne = '-';
        batsman6sOne = '-';
        batsmanSROne = '-';
      }
      let batsManTwo;
      if (obj.data.card.now.nonstriker) {
        batsManTwo = this.getPlayerInformation(obj, obj.data.card.now.nonstriker);
        batsmanNameTwo = batsManTwo.name;
        if (batsManTwo.match.innings['1'].batting && batsManTwo.match.innings['1'].batting.runs) {
          batsmanRunsTwo = `${batsManTwo.match.innings['1'].batting.runs}`;
          batsmanBallsTwo = `${batsManTwo.match.innings['1'].batting.balls}`;
          batsman4sTwo = `${batsManTwo.match.innings['1'].batting.fours}`;
          batsman6sTwo = `${batsManTwo.match.innings['1'].batting.sixes}`;
          batsmanSRTwo = `${batsManTwo.match.innings['1'].batting.strike_rate}`;
        } else {
          batsmanRunsTwo = '-';
          batsmanBallsTwo = '-';
          batsman4sTwo = '-';
          batsman6sTwo = '-';
          batsmanSRTwo = '-';
        }
      } else {
        batsmanNameTwo = '-';
        batsmanRunsTwo = '-';
        batsmanBallsTwo = '-';
        batsman4sTwo = '-';
        batsman6sTwo = '-';
        batsmanSRTwo = '-';
      }
      let bowler;
      if (obj.data.card.now.bowler) {
        bowler = this.getPlayerInformation(obj, obj.data.card.now.bowler);
        bowlerName = bowler.name;
        if (bowler.match.innings['1'].bowling && bowler.match.innings['1'].bowling.overs) {
          bowlerOver = `${bowler.match.innings['1'].bowling.overs}`;
          bowlerMaiden = `${bowler.match.innings['1'].bowling.maiden_overs}`;
          bowlerRuns = `${bowler.match.innings['1'].bowling.runs}`;
          bowlerWickets = `${bowler.match.innings['1'].bowling.wickets}`;
          bowlerEconomy = `${bowler.match.innings['1'].bowling.economy}`;
        } else {
          bowlerOver = '-';
          bowlerMaiden = '-';
          bowlerRuns = '-';
          bowlerWickets = '-';
          bowlerEconomy = '-';
        }
      } else {
        bowlerName = '-';
        bowlerOver = '-';
        bowlerMaiden = '-';
        bowlerRuns = '-';
        bowlerWickets = '-';
        bowlerEconomy = '-';
      }
      showUpdated = true;
      title = obj.data.card.short_name;

    }

    let teamAShortName = obj.data.card.teams.a.short_name;
    let teamBShortName = obj.data.card.teams.b.short_name;

    let squadA = [];

    if (obj.data.card.teams.a.match.playing_xi) {
      for (let i = 0; i < obj.data.card.teams.a.match.playing_xi.length; i++) {
        const playerInfo = this.getPlayerInformation(obj, obj.data.card.teams.a.match.playing_xi[i]);
        let isCaptain = false;
        let isKeeper = false;
        if (obj.data.card.teams.a.match.keeper === obj.data.card.teams.a.match.playing_xi[i]) {
          isKeeper = true;
        }
        if (obj.data.card.teams.a.match.captain === obj.data.card.teams.a.match.playing_xi[i]) {
          isCaptain = true;
        }

        const constObj = { name: playerInfo.name, isCaptain, isKeeper, key: obj.data.card.teams.a.match.playing_xi[i] };
        squadA.push(constObj);
      }
    }

    let squadB = [];

    if (obj.data.card.teams.b.match.playing_xi) {
      for (let i = 0; i < obj.data.card.teams.b.match.playing_xi.length; i++) {
        const playerInfo = this.getPlayerInformation(obj, obj.data.card.teams.b.match.playing_xi[i]);
        let isCaptain = false;
        let isKeeper = false;
        if (obj.data.card.teams.b.match.keeper === obj.data.card.teams.b.match.playing_xi[i]) {
          isKeeper = true;
        }
        if (obj.data.card.teams.b.match.captain === obj.data.card.teams.b.match.playing_xi[i]) {
          isCaptain = true;
        }

        const constObj = { name: playerInfo.name, isCaptain, isKeeper, key: obj.data.card.teams.b.match.playing_xi[i] };
        squadB.push(constObj);
      }
    }

    let inn1md = "test";
    let inn2md = "test";
    let showScoreCard = false;
    let response = {
      teamShortName, inningsNumber, runsWickets, overNumber, pShipLabel, pShipData, crrLabel, crrData,
      rrrLabel, rrrData, matchInfo, batsmanNameOne, batsmanRunsOne, batsmanBallsOne, batsman4sOne, batsman6sOne,
      batsmanSROne, batsmanNameTwo, batsmanRunsTwo, batsmanBallsTwo, batsman4sTwo, batsman6sTwo, batsmanSRTwo,
      bowlerName, bowlerOver, bowlerMaiden, bowlerRuns, bowlerWickets, bowlerEconomy, showUpdated, title, battingTeam, teamAShortName,
      teamBShortName, squadA, squadB, showScoreCard, inn1md, inn2md
    };
    return response;
  }

  getPlayerInformation(obj, playerName) {
    return obj.data.card.players[playerName];
  }

  isEmpty(obj) {
    return Object.keys(obj).length === 0;
  }

}

module.exports = new RunsFactory();
