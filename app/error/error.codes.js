/**
 * Copyright 2018 (C) whistler
 * Created on: 13/03/18
 * Author: Kavin Varnan
 */

const errorResponse = {
  INVALID_ENDPOINT: { code: 404, message: 'Invalid endpoint' },
  INTERNAL_SERVER_ERROR: { code: 500, message: 'Internal server error' },
  UNAUTHORISED: { code: 401, message: 'Unauthorised' },
  NOT_FOUND: { code: 404, message: 'Not found' },
  CONFLICT: { code: 409, message: 'Conflict' },
};

const errorCodes = {
  INVALID_ENDPOINT: 404,
  INTERNAL_SERVER_ERROR: 500,
  UNAUTHORISED: 401,
  NOT_FOUND: 404,
  CONFLICT: 409,
};

module.exports = { errorResponse, errorCodes };
