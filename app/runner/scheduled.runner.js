/**
 * Copyright 2018 (C) whistler
 * Created on: 15/03/18
 * Author: Kavin Varnan
 */

const got = require('got');

const logger = require('../logger/logger');
const CronJob = require('cron').CronJob;
const redis = require('../redis/redis.connect');
const constants = require('../utils/constants');
const runsController = require('../controllers/runs.controller');
const matchController = require('../controllers/match.controller');
const matchModel = require('../model/matches.model');
const dumpModel = require('../model/dumpmatch.model');
const runsFactory = require('../factory/runs.factory');
const pointsService = require('../services/points.service');
const pointsComputedModel  = require('../model/pointscomputed.model');
const runsModel  = require('../model/runs.model');

class ScheduledRunner {
  constructor() {

  }

  getTimeStamp() {
    const dummyTimeStamp = 1521950401;
    const realTimeStamp = new Date().getTime() / 1000;
    return realTimeStamp;
  }

  startAccessTokenRunner() {
    this._fetchAccessToken().catch(err => { logger.error(err) });
    new CronJob('0 */6 * * *', async () => {
      this._fetchAccessToken().catch(err => { logger.error(err) });
    }, null, true);
  }

  startScheduleUpdateRunner() {
    this._fetchSeasonSchedule().catch(err => { logger.error(err) });
    new CronJob('*/10 * * * *', async () => {
      this._fetchSeasonSchedule().catch(err => { logger.error(err) });
    }, null, true);
  }

  startMatchRunner() {
    new CronJob('*/5 * * * * *', async () => {
      this._fetchMatchRecord().catch(err => { logger.error(err) });
    }, null, true);
  }

  startPointsComputationRunner() {
    new CronJob('*/30 * * * * *', async () => {
      this._computePoints().catch(err => { logger.error(err) });
    }, null, true);
  }

  async _computePoints() {
    logger.info('Compute points ');
    const happeningMatches = await matchModel.getHappeningSchedule(this.getTimeStamp());
    for (let i = 0; i < happeningMatches.length; i++) {
      const hm = happeningMatches[i].toObject();
      logger.info(`Compute points happening match ${hm.key} ` );
      const pointsComputedObj = await pointsComputedModel.getForMatchKey(hm.key);
      const runsObj = await runsModel.getRuns(hm.key);
      await pointsService.computeRunsForMatch(pointsComputedObj, runsObj);
    }
  }

  async _fetchSeasonSchedule() {
    try {
      logger.info('Fetching season schedule ' + new Date());
      const season = 'iplt20_2018';
      const redisAccessToken = await redis.get(constants.redisKeys.ACCESS_TOKEN);
      const response = await got(`https://rest.cricketapi.com/rest/v2/season/${season}/?access_token=${redisAccessToken}`);
      const responseObj = JSON.parse(response.body);
      await matchController.updateMatchSchedule(responseObj);
    } catch (err) {
      logger.error(`Season fetch - ${err}`);
    }
  }

  async _fetchMatchRecord() {
    logger.info('Fetch match record');
    try {
      const happeningMatches = await matchModel.getHappeningSchedule(this.getTimeStamp());
      for (let i = 0; i < happeningMatches.length; i++) {
        const hm = happeningMatches[i].toObject();
        logger.info(`Fetch match record happening match ${hm.key} ` );
        const redisAccessToken = await redis.get(constants.redisKeys.ACCESS_TOKEN);
        // const response = await got('http://127.0.0.1:7325/api/utils/test123');
        const response = await got(`https://rest.cricketapi.com/rest/v2/match/${hm.key}/?card_type=full_card&access_token=${redisAccessToken}`);
        if (response.body) {
          const bodyObj = JSON.parse(response.body);
          if (bodyObj.status) {
            const scoreCard = runsFactory.convertToScoreCardFromRawResponse(bodyObj);
            redis.set(hm.key, JSON.stringify(scoreCard));
            bodyObj.time_stamp = new Date().getTime() / 1000;
            redis.set(`${hm.key}_raw`, JSON.stringify(bodyObj));
            await dumpModel.dumpMatch(bodyObj);
            await runsController.computeRunsForResponse(bodyObj);
          } else {
            logger.error(`regularfetch Response status is ${bodyObj.status_code}`)
          }
        }
      }
    } catch (err) {
      logger.error(`Match record fetch - ${err}`);
    }

  }

  async _fetchAccessToken() {
    try {
      logger.info('Fetching access token ' + new Date());
      const response = await got.post('https://rest.cricketapi.com/rest/v2/auth/', {body: 'access_key=8d13bc900740f69c33d5f9f3032243ff&secret_key=b14b6adea7842240509656b61849fb6e&app_id=server&device_id=google'});
      const body = JSON.parse(response.body);
      if (body.status_code === 200) {
        const accessToken = body.auth.access_token;
        logger.info(`Access token - ${accessToken}`);
        this._saveAccessTokenToRedis(accessToken);
      } else {
        logger.error(body);
      }
    } catch (err) {
      logger.error(`Access token fetch - ${err}`)
    }
  }

  _saveAccessTokenToRedis(accessToken) {
    redis.set(constants.redisKeys.ACCESS_TOKEN, accessToken);
  }
}


module.exports = new ScheduledRunner();
