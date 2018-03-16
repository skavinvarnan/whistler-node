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

class ScheduledRunner {
  constructor() {

  }

  startAccessTokenRunner() {
    this._fetchAccessToken().catch(err => { logger.info(err) });
    new CronJob('0 */6 * * *', async () => {
      this._fetchAccessToken().catch(err => { logger.info(err) });
    }, null, true);
  }

  startMatchRunner() {
    new CronJob('*/6 * * * * *', async () => {
      this._fetchMatchRecord().catch(err => { logger.info(err) });
    }, null, true);
  }

  async _fetchMatchRecord() {
    const response = await got('https://rest.cricketapi.com/rest/v2/match/pslt20_2018_g27/?card_type=full_card&access_token=2s152110106595726s974558539936845922');
    console.log(response.body);
  }

  async _fetchAccessToken() {
    logger.info('Fetching access token ' + new Date());
    const response = await got.post('https://rest.cricketapi.com/rest/v2/auth/', { body: 'access_key=523ec3fb77caa91d0a461f4da458565d&secret_key=e87c3e63329781caa0caa8418c3da400&app_id=test-id-2&device_id=1234567' });
    const body = JSON.parse(response.body);
    if (body.status_code === 200) {
      const accessToken = body.auth.access_token;
      console.log(accessToken);
      this._saveAccessTokenToRedis(accessToken);
    } else {
      logger.error(body);
    }
  }

  _saveAccessTokenToRedis(accessToken) {
    redis.set(constants.redisKeys.ACCESS_TOKEN, accessToken);
  }
}

const startRunner = async () => {
  new CronJob('*/6 * * * * *', async () => {

    try {
      const response = await got('https://rest.cricketapi.com/rest/v2/season/pslt20_2018_g27/?access_token=2s152110106595726s974558539936845922');
      console.log(response.body);
      //=> '<!doctype html> ...'
    } catch (error) {
      console.log(error.response.body);
      //=> 'Internal server error ...'
    }

  }, null, true);
};


module.exports = new ScheduledRunner();
