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
    new CronJob('*/15 * * * * *', async () => {
      this._fetchMatchRecord().catch(err => { logger.error(err) });
    }, null, true);
  }

  startPointsComputationRunner() {
    new CronJob('*/10 * * * * *', async () => {
      this._computePoints().catch(err => { logger.error(err) });
    }, null, true);
  }

  async _computePoints() {
    const dummyTimeStamp = 1523114041;
    const realTimeStamp = new Date().getTime() / 1000;
    const happeningMatches = await matchModel.getHappeningSchedule(dummyTimeStamp);
    for (let i = 0; i < happeningMatches.length; i++) {
      const hm = happeningMatches[i].toObject();
      const pointsComputedObj = await pointsComputedModel.getForMatchKey(hm.key);
      logger.info(` happeneing ${pointsComputedObj['team_a']}`);
      const runsObj = await runsModel.getRuns(hm.key);
      await pointsService.computeRunsForMatch(pointsComputedObj, runsObj);
    }
  }

  async _fetchSeasonSchedule() {
    try {
      const season = 'wmntriseries_2018';
      const redisAccessToken = await redis.get(constants.redisKeys.ACCESS_TOKEN);
      const response = await got(`https://rest.cricketapi.com/rest/v2/season/${season}/?access_token=${redisAccessToken}`);
      const responseObj = JSON.parse(response.body);
      await matchController.updateMatchSchedule(responseObj);
    } catch (err) {
      logger.error(`Season fetch - ${err}`);
    }
  }

  async _fetchMatchRecord() {
    try {
      const dummyTimeStamp = 1523714401;
      const realTimeStamp = new Date().getTime() / 1000;
      const happeningMatches = await matchModel.getHappeningSchedule(realTimeStamp);
      console.log(happeningMatches.length);
      for (let i = 0; i < happeningMatches.length; i++) {
        const hm = happeningMatches[i].toObject();
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
            logger.error(`Response status is ${bodyObj.status_code}`)
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
      const response = await got.post('https://rest.cricketapi.com/rest/v2/auth/', {body: 'access_key=e43c2fcfb531e0f9fe77cf86921124c7&secret_key=8e0fe030700283b89ab80297d2d221d9&app_id=test-id&device_id=server'});
      const body = JSON.parse(response.body);
      if (body.status_code === 200) {
        const accessToken = body.auth.access_token;
        console.log(accessToken);
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
