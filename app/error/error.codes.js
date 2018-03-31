/**
 * Copyright 2018 (C) whistler
 * Created on: 13/03/18
 * Author: Kavin Varnan
 */

const errorResponse = {
  INVALID_ENDPOINT: { code: 400, message: 'Invalid endpoint' },
  INTERNAL_SERVER_ERROR: { code: 500, message: 'Internal server error' },
  UNAUTHORISED: { code: 401, message: 'Unauthorised' },
  NOT_FOUND: { code: 404, message: 'Not found' },
  CONFLICT: { code: 409, message: 'Conflict' },
  INVALID_ACCESS_TOKEN: { code: 406, message: 'Invalid access token' },
  MATCH_YET_TO_START: { code: 4001, message: 'Waiting for toss' },
};

const errorCodes = {
  INVALID_ENDPOINT: 400,
  INTERNAL_SERVER_ERROR: 500,
  UNAUTHORISED: 401,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INVALID_ACCESS_TOKEN: 406,
  MATCH_YET_TO_START: 4001,
};

module.exports = { errorResponse, errorCodes };
