const express = require('express');
const auth = require('../middleware/auth');
const CalcLogic = require('../models/calcLogics');
const router = express.Router();

// Get CalcLogic
router.get('/getCalcLogic', auth, async (req, res) => {
  try {
    const calcLogic = await CalcLogic.findOne({ user: req.user.id });
    return res.send(calcLogic);
  } catch (error) {
    console.log({ error });
    return res.sendStatus(400);
  }
});

// Edit CalcLogic Values
router.post('/edit', auth, async (req, res) => {
  try {
    const bodyKeys = Object.keys(req.body);
    if (bodyKeys.length === 0) {
      return res.sendStatus(200);
    }

    let calcLogic = await CalcLogic.findOne({ user: req.user.id });

    bodyKeys
      .filter((flt) => flt !== '_id')
      .map((key) => (calcLogic[key] = req.body[key]));

    await calcLogic.save();
    return res.send(calcLogic);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

module.exports = router;
