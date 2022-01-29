const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const auth = require("../../middleware/auth");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");
const moment = require("moment");

const User = require("../../models/User");
const Timeline = require("../../models/Timeline");

// @route    POST api/timeline
// @desc     Add Event on BUtton Click
// @access   Private
router.post("/add-event", auth, async (req, res) => {

let ans = {}
  try {

    let coll = new Timeline({
      userId: req.user.id
    })

    try {
        ans = await coll.save();
    } catch (error) {
        return res.status(400).send({ msg: [ 'Could not add new event' ] })
    }

    return res.status(200).send(ans._id)
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    POST api/timeline
// @desc     Add Duration to the initial event
// @access   Private
router.post("/add-details-event", auth, async (req, res) => {

    const { id, duration } = req.body

let ans = {}
  try {

    try {
        ans = await Timeline.findOneAndUpdate({ _id: id }, { duration }, {
            new: true,
            upsert: true
        } )
    } catch (error) {
        console.error(error)
        return res.status(400).send({ msg: [ 'Could not add details of event' ] })
    }

    return res.status(200).send(ans)
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    POST api/timeline
// @desc     Get events of a specific date
// @access   Private
router.post("/get-details-specific-date-event", auth, async (req, res) => {

    const { date } = req.body
    
    const todayStart = moment(date).startOf("day");
    const todayEnd = moment(date).endOf("day");

let ans = {}
  try {

    try {
        ans = await Timeline.find({
          $and: [
            { 'userId': req.user.id },
            {'createdAt': {
              $gte: todayStart,
              $lte: todayEnd,
            }},
            {'duration': { $gt: 0 }}
          ]
        });

    } catch (error) {
        console.error(error)
        return res.status(400).send({ msg: [ 'Could not get details of event' ] })
    }

    return res.status(200).send(ans)
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});


module.exports = router;