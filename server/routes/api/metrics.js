const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const auth = require("../../middleware/auth");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");
const moment = require("moment");
const mongoose = require('mongoose')
const Timeline = require("../../models/Timeline");
const { getMonthInString } = require('../../middleware/getMonthInString')

// =============== NUMBER OF TUUS PER DAY =================

// ---------- PER YEAR------------------
// @route    POST api/metrics
// @desc     Get average duration of tuus per day
// @access   Private

router.get("/number-of-tuus-per-day-year", auth, async (req, res) => {
  let ans = {};
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
          _id: {
            date: {
              $dateToString: {
                date: "$createdAt",
                format: "%Y",
              },
            },
            year: {
              $year: { date: "$createdAt" },
            },
          },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          date: "$_id",
          count: 1,
          _id: 0,
        },
      },
    ]).sort({ 'date.year': 1 });

    return res.status(200).send(ans);
  } catch (error) {
    console.error(error.message);
    res.status(400).send("Something went wrong!");
  }
});


// ---------- 7 DAYS ------------------
// @route    POST api/metrics
// @desc     Get average duration of tuus per day
// @access   Private

router.get("/number-of-tuus-per-day-sevendays", auth, async (req, res) => {

  let ans = {};
  try {
    ans = await Timeline.aggregate([
      {
        $match: {
          $and: [
            { userId: new mongoose.Types.ObjectId(req.user.id) },
            { duration: { $ne: null } },
            {
              updatedAt: {
                $gte: new Date(new Date() - 7 * 60 * 60 * 24 * 1000),
              },
            },
          ],
        },
      },
      {
        $group: {
          _id: {
            date: {
              $dateToString: {
                date: "$createdAt",
                format: "%d/%m/%Y",
              },
            },
            month: {
              $month: { date: "$createdAt" },
            },
            day: {
              $dayOfMonth: { date: "$createdAt" },
            },
            year: {
              $year: { date: "$createdAt" },
            },
          },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          date: "$_id",
          count: 1,
          _id: 0,
        },
      },
    ]).sort({ "date.year": 1, "date.month": 1, "date.day": 1 });

    return res.status(200).send(ans);
  } catch (error) {
    console.error(error.message);
    res.status(400).send("Something went wrong!");
  }
});

// ---------- Current Month ------------------
// @route    POST api/metrics
// @desc     Get number of tuus per month
// @access   Private

router.get("/number-of-tuus-per-day-currentMonth", auth, async (req, res) => {
  let ans = {};

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
          _id: {
            date: {
              $dateToString: {
                date: "$createdAt",
                format: "%m",
              },
            },
            month: {
              $month: { date: "$createdAt" },
            },
          },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          date: "$_id",
          count: 1,
          _id: 0,
        },
      },
    ]).sort({ "date.month": 1 });

    return res.status(200).send(ans);
  } catch (error) {
    console.error(error.message);
    res.status(400).send("Something went wrong!");
  }
});

// ----------------------------------------------------------------------------------

// -------------------------- AVG DURATION _ GRAPH ------------------------------------

// -------------------------- 7 DAYS -----------------------------------------
// @route    POST api/metrics
// @desc     Get average duration of tuus per day
// @access   Private
router.get("/average-duration-tuus-per-day-sevendays", auth, async (req, res) => {
  let ans = {};
  try {
    ans = await Timeline.aggregate([
      {
        $match: {
          $and: [
            { userId: new mongoose.Types.ObjectId(req.user.id) },
            { duration: { $ne: null } },
            {
              updatedAt: {
                $gte: new Date(new Date() - 7 * 60 * 60 * 24 * 1000),
              },
            },
          ],
        },
      },
      {
        $group: {
          _id: {
            date: {
              $dateToString: {
                date: "$createdAt",
                format: "%d/%m/%Y",
              },
            },
            month: {
              $month: { date: "$createdAt" },
            },
            day: {
              $dayOfMonth: { date: "$createdAt" },
            },
            year: {
              $year: { date: "$createdAt" },
            },
          },
          sum: { $sum: "$duration" },
        },
      },
      {
        $project: {
          date: "$_id",
          sum: 1,
          _id: 0,
        },
      },
    ]).sort({ "date.year": 1, "date.month": 1, "date.day": 1 });

    return res.status(200).send(ans);
  } catch (error) {
    console.error(error.message);
    res.status(400).send("Something went wrong!");
  }
});

// -------------------------- MONTH-----------------------------------------
// @route    POST api/metrics
// @desc     Get average duration of tuus per day-  month
// @access   Private
router.get("/average-duration-tuus-per-day-monthly", auth, async (req, res) => {
  let ans = {};
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
          _id: {
            date: {
              $dateToString: {
                date: "$createdAt",
                format: "%m",
              },
            },
            month: {
              $month: { date: "$createdAt" },
            },
          },
          sum: { $sum: "$duration" },
        },
      },
      {
        $project: {
          date: "$_id",
          sum: 1,
          _id: 0,
        },
      },
    ]).sort({ "date.month": 1 });

    return res.status(200).send(ans);
  } catch (error) {
    console.error(error.message);
    res.status(400).send("Something went wrong!");
  }
});

// ---------- PER YEAR------------------
// @route    POST api/metrics
// @desc     Get average duration of tuus per day - yearly
// @access   Private

router.get("/average-duration-tuus-per-day-yearly", auth, async (req, res) => {
  let ans = {};
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
          _id: {
            date: {
              $dateToString: {
                date: "$createdAt",
                format: "%Y",
              },
            },
            year: {
              $year: { date: "$createdAt" },
            },
          },
          sum: { $sum: "$duration" },
        },
      },
      {
        $project: {
          date: "$_id",
          sum: 1,
          _id: 0,
        },
      },
    ]).sort({ "date.year": 1 });

    return res.status(200).send(ans);
  } catch (error) {
    console.error(error.message);
    res.status(400).send("Something went wrong!");
  }
});


// -----------------------------------------------------------------------

// -------------------------- TOTAL TUUS - BLOCK ----------------------------

// ------------------------------- TODAY ----------------------------------
// @route    POST api/metrics
// @desc     Get total number of tuus
// @access   Private
router.get("/total-number-tuus-today", auth, async (req, res) => {
  let ans = {};

  var startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);
  // creates ObjectId() from date:
  var _id =
    Math.floor(startOfToday.getTime() / 1000).toString(16) + "0000000000000000";

  try {

    ans = await Timeline.find({
      $and: [
        { userId: new mongoose.Types.ObjectId(req.user.id) },
        { duration: { $ne: null } },
        { _id: { $gte: new mongoose.Types.ObjectId(_id) } },
      ],
    }).count();
    return res.status(200).send(ans.toString())
  } catch(error) {
    console.error(error.message);
    res.status(400).send("Something went wrong!");
  }
});

// ------------------------------- ALL TIME ----------------------------------
// @route    POST api/metrics
// @desc     Get total number of tuus
// @access   Private
router.get("/total-number-tuus-all-time", auth, async (req, res) => {
  let ans = {};
  try {

    ans = await Timeline.find({
      $and: [
        { userId: new mongoose.Types.ObjectId(req.user.id) },
        { duration: { $ne: null } },
      ],
    }).count();
    return res.status(200).send(ans.toString())
  } catch(error) {
    console.error(error.message);
    res.status(400).send("Something went wrong!");
  }
});

// ------------------------------- 7 DAYS ----------------------------------
// @route    POST api/metrics
// @desc     Get total number of tuus
// @access   Private
router.get("/total-number-tuus-seven-days", auth, async (req, res) => {
  let ans = {};
  try {

    ans = await Timeline.find({
      $and: [
        { userId: new mongoose.Types.ObjectId(req.user.id) },
        { duration: { $ne: null } },
        {
          updatedAt: {
            $gte: new Date(new Date() - 7 * 60 * 60 * 24 * 1000),
          },
        },
      ],
    }).count();
    return res.status(200).send(ans.toString())
  } catch(error) {
    console.error(error.message);
    res.status(400).send("Something went wrong!");
  }
});

// ------------------------------- MONTH ----------------------------------
// @route    POST api/metrics
// @desc     Get total number of tuus
// @access   Private
router.get("/total-number-tuus-monthly", auth, async (req, res) => {
  let ans = {};

  let selectMonth = await getMonthInString()

  try {
    ans = await Timeline.find({
          $and: [
            { userId: new mongoose.Types.ObjectId(req.user.id) },
            { duration: { $ne: null } },
            { $eq: [{ $month: "$createdAt" }, selectMonth] },
          ],
        }).count()

    return res.status(200).send(ans.toString())
  } catch(error) {
    console.error(error.message);
    res.status(400).send("Something went wrong!");
  }
});

// ------------------------------- YEAR ----------------------------------
// @route    POST api/metrics
// @desc     Get total number of tuus
// @access   Private
router.get("/total-number-tuus-yearly", auth, async (req, res) => {
  let ans = {};

  let selectYear = await moment().year()

  try {
    ans = await Timeline.find({
          $and: [
            { userId: new mongoose.Types.ObjectId(req.user.id) },
            { duration: { $ne: null } },
            { $eq: [{ $year: "$createdAt" }, selectYear] },
          ],
        }).count()

    return res.status(200).send(ans.toString())
  } catch(error) {
    console.error(error.message);
    res.status(400).send("Something went wrong!");
  }
});

// -------------------------------------------------------------------------------

// ---------------------------------- COMMON TIME - BLOCK --------------------------

// ------------------------------- TODAY -------------------------------------------
// @route    POST api/metrics
// @desc     Get total number of tuus
// @access   Private
router.get("/average-duration-tuus-today", auth, async (req, res) => {
  let ans = {};
  let ans2 = 0;

  var startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);
  // creates ObjectId() from date:
  var _id =
    Math.floor(startOfToday.getTime() / 1000).toString(16) + "0000000000000000";

  try {
    ans = await Timeline.aggregate([
      {
        $match: {
          $and: [
            { userId: new mongoose.Types.ObjectId(req.user.id) },
            { duration: { $ne: null } },
           { _id: { $gte: new mongoose.Types.ObjectId(_id) } },
          ],
        },
      },
      {
        $group: {
          _id: "$userId",
          sum: { $sum: "$duration" },
        },
      },
    ]);

    ans2 = await Timeline.find({
      $and: [
        { userId: new mongoose.Types.ObjectId(req.user.id) },
        { duration: { $ne: null } },
        { _id: { $gte: new mongoose.Types.ObjectId(_id) } },
      ],
    }).count();

    if(ans.length < 1){
      return res.status(200).send('0')
    } else {
        let complete = (ans[0].sum / ans2).toFixed("0");

        return res.status(200).send(complete);
    }

  } catch (error) {
    console.error(error.message);
    res.status(400).send("Something went wrong!");
  }
});

// ------------------------------- 7 DAYS ----------------------------------
// @route    POST api/metrics
// @desc     Get total number of tuus
// @access   Private
router.get(
  "/average-duration-tuus-seven-days",
  auth,
  async (req, res) => {
  let ans = {};
  let ans2 = 0;

  try {
    ans = await Timeline.aggregate([
      {
        $match: {
          $and: [
            { userId: new mongoose.Types.ObjectId(req.user.id) },
            { duration: { $ne: null } },
            {
              updatedAt: {
                $gte: new Date(new Date() - 7 * 60 * 60 * 24 * 1000),
              },
            },
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
        { duration: { $ne: null } },
        {
          updatedAt: {
            $gte: new Date(new Date() - 7 * 60 * 60 * 24 * 1000),
          },
        },
      ],
    }).count();

    let complete = (ans[0].totalSum / ans2).toFixed("0");

    return res.status(200).send(complete);
    
    } catch (error) {
      console.error(error.message);
      res.status(400).send("Something went wrong!");
    }
  }
);

// ------------------------------- MONTH ----------------------------------
// @route    POST api/metrics
// @desc     Get total number of tuus
// @access   Private
router.get("/average-duration-tuus-monthly", auth, async (req, res) => {
  let ans = {};
  let ans2 = 0;

  let selectMonth = await moment().month() + 1;

  try {
    ans = await Timeline.aggregate([
      {
        $match: {
          $and: [
            { userId: new mongoose.Types.ObjectId(req.user.id) },
            { duration: { $ne: null } },
            {$expr: { $eq: [{ $month: "$createdAt" }, selectMonth] } },
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
        { duration: { $ne: null } },
        { $eq: [{ $month: "$createdAt" }, selectMonth] },
      ],
    }).count();

    let complete = (ans[0].totalSum / ans2).toFixed("0");

    return res.status(200).send(complete);
  } catch (error) {
    console.error(error.message);
    res.status(400).send("Something went wrong!");
  }
});

// ------------------------------- YEAR ----------------------------------
// @route    POST api/metrics
// @desc     Get total number of tuus
// @access   Private
router.get("/average-duration-tuus-yearly", auth, async (req, res) => {

  let selectYear = await moment().year();

  let ans = {};
  let ans2 = 0;
  try {
    ans = await Timeline.aggregate([
      {
        $match: {
          $and: [
            { userId: new mongoose.Types.ObjectId(req.user.id) },
            { duration: { $ne: null } },
            {$expr: { $eq: [{ $year: "$createdAt" }, selectYear] } },
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
        { duration: { $ne: null } },
        { $eq: [{ $year: "$createdAt" }, selectYear] },
      ],
    }).count();

    let complete = (ans[0].totalSum / ans2).toFixed("0");

    return res.status(200).send(complete);
  } catch (error) {
    console.error(error.message);
    res.status(400).send("Something went wrong!");
  }
});

// ------------------------------- ALL TIME ----------------------------------
// @route    POST api/metrics
// @desc     Get total number of tuus
// @access   Private
router.get("/average-duration-tuus-all-time", auth, async (req, res) => {
 let ans = {};
 let ans2 = 0;
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
       { duration: { $ne: null } },
     ],
   }).count();

   let complete = (ans[0].totalSum / ans2).toFixed("0");

   return res.status(200).send(complete);
 } catch (error) {
   console.error(error.message);
   res.status(400).send("Something went wrong!");
 }
})

// --------------------------------------------------------------------------

// -------------------------------- LIVE STREAK - BLOCK -----------------------

// @route    POST api/metrics
// @desc     Get live streak
// @access   Private
router.get("/live-streak", auth, async (req, res) => {
  let ans = {};
   let yestDate = moment().startOf("days").subtract(1, "days");
   let todayDate = moment().startOf("days");
  try {
   
    ans = await LiveCount.findOneAndUpdate({
      $and: [ {userId: req.user.id}, {date: { $eq: yestDate }}]},
      { $inc: { count: 1 }, date: todayDate },
    );

    if(!ans){
          return res.status(200).send('0');
    } else {
          return res.status(200).send(ans.count.toString());
    }

  } catch(error) {
    console.error(error.message);
    res.status(400).send("Something went wrong!");
  }
});

//  ---------------------------------------------------------------------------

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
