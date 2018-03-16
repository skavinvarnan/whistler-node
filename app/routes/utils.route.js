/**
 * Copyright 2018 (C) whistler
 * Created on: 13/03/18
 * Author: Kavin Varnan
 */

const express = require('express');

const router = express.Router();

router.post('/ping', async (req, res) => {
  res.status(200).json({ server: 'alive' });
});

module.exports = router;
