const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const auth = require("../../middleware/auth");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");
const moment = require("moment");
const mongoose = require('mongoose')
const User = require("../../models/User");
const Timeline = require("../../models/Timeline");

// @route    POST api/metrics
// @desc     Get total number of tuus
// @access   Private
router.get("/total-number-tuus", auth, async (req, res) => {
  let ans = {};
  try {

    ans = await Timeline.find({
      $and: [
        { userId: new mongoose.Types.ObjectId(req.user.id) },
        { duration: { $ne: null} },
      ],
    }).count();
    return res.status(200).send(ans.toString())
  } catch(error) {
    console.error(error.message);
    res.status(400).send("Something went wrong!");
  }
});

// @route    POST api/timeline
// @desc     Add Duration to the initial event
// @access   Private
router.get("/average-duration-tuus", auth, async (req, res) => {
  const { id, duration } = req.body;

  let ans = {}
  let ans2 = 0
  try {
        ans = await Timeline.aggregate([
          {
            $match: {
              $and: [
                { userId: new mongoose.Types.ObjectId(req.user.id) },
                { duration: { $ne: null } },
              ],
            },
          },
          {
            $group: {
              _id: "$userId",
              totalSum: { $sum: "$duration" },
            },
          },
        ]);

        ans2 = await Timeline.find({
          $and: [
        { userId: new mongoose.Types.ObjectId(req.user.id) },
        { duration: { $ne: null} },
      ]
        }).count();

        let complete = (ans[0].totalSum/ans2).toFixed('0')

    return res.status(200).send(complete);
  } catch (err) {
    console.error(err.message);
    res.status(400).send('Something went wrong!');
  }
});

// @route    POST api/timeline
// @desc     Get events of a specific date
// @access   Private
router.post("/get-details-specific-date-event", auth, async (req, res) => {
  const { date } = req.body;

  const todayStart = moment(date).startOf("day");
  const todayEnd = moment(date).endOf("day");

  let ans = {};
  try {
    try {
      ans = await Timeline.find({
        $and: [
          { userId: req.user.id },
          {
            createdAt: {
              $gte: todayStart,
              $lte: todayEnd,
            },
          },
          { duration: { $gt: 0 } },
        ],
      });
    } catch (error) {
      console.error(error);
      return res.status(400).send({ msg: ["Could not get details of event"] });
    }

    return res.status(200).send(ans);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    GET api/timeline
// @desc     Get all dates where events are input
// @access   Private
router.get("/get-dates-existing-events", auth, async (req, res) => {
  let ans = {};
  try {
    try {
      ans = await Timeline.find(
        { $and: [{ userId: req.user.id }, { duration: { $gte: 0 } }] },
        {
          createdAt: 1,
        }
      );
    } catch (error) {
      console.error(error);
      return res.status(400).send({ msg: ["Could not get details of event"] });
    }

    return res.status(200).send(ans);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;