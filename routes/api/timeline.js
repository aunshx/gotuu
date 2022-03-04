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
const LiveCount = require("../../models/LiveCount");

// @route    POST api/timeline
// @desc     Add Event on BUtton Click
// @access   Private
router.get("/add-event", auth, async (req, res) => {

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
    res.status(400).send({ errors: [{ msg: "Something went wrong!" }] });
  }
});

// @route    POST api/timeline
// @desc     Add Duration to the initial event
// @access   Private
router.post("/add-details-event", auth, async (req, res) => {

    const { id, duration } = req.body

    let intDuration = parseInt(duration)

    let todayDate = moment().utcOffset(0, true).startOf("day").format("LL");

let ans = {}
  try {

    try {
        ans = await Timeline.findOneAndUpdate(
          { _id: id },
          { duration: intDuration },
          {
            new: true,
            upsert: true,
          }
        );

        let ans3 = await LiveCount.findOne(
          { userId: req.user.id },
        );

        if(!ans3){
          let ans2 = new LiveCount({
            userId: req.user.id,
            date: todayDate,
          });

          await ans2.save();
        }

    } catch (error) {
        console.error(error)
        return res.status(400).send({ msg: [ 'Could not add details of event' ] })
    }

    return res.status(200).send(ans)
  } catch (err) {
    res.status(400).send({ errors: [{ msg: "Something went wrong!" }] });
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
        }).sort({ 'updatedAt': -1 })

    } catch (error) {
        console.error(error)
        return res.status(400).send({ msg: [ 'Could not get details of event' ] })
    }

    return res.status(200).send(ans)
  } catch (err) {
    res.status(400).send({ errors: [{ msg: "Something went wrong!" }] });
  }
});

// @route    POST api/timeline
// @desc     Get events of a specific date ascending order
// @access   Private
router.post("/get-details-specific-date-event-ascending", auth, async (req, res) => {

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
        }).sort({ 'updatedAt': 1 })

    } catch (error) {
        console.error(error)
        return res.status(400).send({ msg: [ 'Could not get details of event' ] })
    }

    return res.status(200).send(ans)
  } catch (err) {
    res.status(400).send({ errors: [{ msg: "Something went wrong!" }] });
  }
});

// @route    GET api/timeline
// @desc     Get all dates where events are input
// @access   Private
router.get("/get-dates-existing-events", auth, async (req, res) => {

let ans = {}
  try {

    try {
        ans = await Timeline.find(
          { $and: [{ userId: req.user.id }, { duration: { $gte: 0 } }] },
          {
            createdAt: 1,
          }
        )

    } catch (error) {
        console.error(error)
        return res.status(400).send({ msg: [ 'Could not get details of event' ] })
    }

    return res.status(200).send(ans)
  } catch (err) {
    res.status(400).send({ errors: [{ msg: "Something went wrong!" }] });
  }
});

// @route    DELETE api/timeline
// @desc     Delete an event
// @access   Private

router.post(
  "/delete-event",
  auth,
  async (req, res) => {

    const { eventId } = req.body;

    try {
      let event = await Timeline.deleteOne({ _id: eventId })

      return res.status(200).send('Event deleted successfully!');
    } catch (error) {
     res.status(400).send({ errors: [{ msg: "Something went wrong!" }] });
    }
  }
);

// @route    DELETE api/timeline
// @desc     Delete all empty events
// @access   Private

router.post(
  "/delete-all-empty-events",
  auth,
  async (req, res) => {

    try {
      let event = await Timeline.deleteMany({ $and: [ { userId: req.user.id, duration: null } ] })
      
      return res.status(200).send('Empty events deleted successfully!');
    } catch (error) {
     res.status(400).send({ errors: [{ msg: "Could not delete empty events!" }] });
    }
  }
);
// @route    DELETE api/timeline
// @desc     Delete an event
// @access   Private

router.post(
  "/delete-event",
  auth,
  async (req, res) => {

    const { eventId } = req.body;

    try {
      let event = await Timeline.deleteOne({ _id: eventId })

      return res.status(200).send('Event deleted successfully!');
    } catch (error) {
     res.status(400).send({ errors: [{ msg: "Something went wrong!" }] });
    }
  }
);


module.exports = router;
