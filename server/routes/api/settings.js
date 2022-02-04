const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const auth = require("../../middleware/auth");
const jwt = require("jsonwebtoken");
const config = require("config");

const Settings = require("../../models/Settings");

// ----------------------------- REMINDER --------------------------------
// @route    GET api/settings
// @desc     Get reminder status
// @access   Private
router.get("/get-reminder-status", auth, async (req, res) => {
    let ans = {};
    try {
      let settingsExist = await Settings.findOne({
        userId: req.user.id,
      });

      if (!settingsExist) {
        let newReminderSetting = new Settings({
          userId: req.user.id,
        });

        await newReminderSetting.save();
        return res.status(200).send(newReminderSetting);
      } else {
        ans = await Settings.find({
          userId: req.user.id,
        });

        return res.status(200).send(ans[0]);
      }
    } catch (err) {
      return res
        .status(400)
        .send({ errors: [{ msg: "Cannot fetch reminder status" }] });
    }
});

// @route    POST api/settings
// @desc     Post reminder status change to true
// @access   Private
router.post("/set-reminder-on", auth, async (req, res) => {
    let ans = {}
  try {

    let settingsExist = await Settings.findOne({
        userId: req.user.id
    })

    if(!settingsExist){
        let newReminderSetting = new Settings({
            userId: req.user.id,
            reminder: true
        })

        await newReminderSetting.save()
        return res.status(200).send(newReminderSetting);
    } else {
        ans = await Settings.updateOne(
          { userId: req.user.id },
          {
            $set: {
              reminder: true,
              reminderFifteenMin: true,
              reminderThirtyMin: true,
              reminderOneHour: true,
              reminderTwoHour: true,
              reminderThreeHour: true,
            },
          }
        );

        let ans2 = await Settings.find({
          userId: req.user.id
        })

        return res.status(200).send(ans2);
    }    

  } catch (err) {
    return res.status(400).send({ errors: [{ msg: "Cannot change reminder status" }] });
  }
});

// @route    POST api/settings
// @desc     Post reminder status change to false
// @access   Private
router.post("/set-reminder-off", auth, async (req, res) => {
    let ans = {};
    try {

      let settingsExist = await Settings.findOne({
        userId: req.user.id,
      });

      if (!settingsExist) {
        let newReminderSetting = new Settings({
          userId: req.user.id,
          reminder: false,
        });

        await newReminderSetting.save();
        return res.status(200).send(newReminderSetting);
      } else {
        ans = await Settings.updateOne(
          { userId: req.user.id },
          {
            $set: {
              reminder: false,
              reminderFifteenMin: false,
              reminderThirtyMin: false,
              reminderOneHour: false,
              reminderTwoHour: false,
              reminderThreeHour: false,
            },
          }
        );

        let ans2 = await Settings.find({
          userId: req.user.id,
        });

        return res.status(200).send(ans2);
      }
    } catch (err) {
      return res
        .status(400)
        .send({ errors: [{ msg: "Cannot change reminder status" }] });
    }
});

// ---------------------------- 15 Min ------------------------------
// @route    POST api/settings
// @desc     Post reminder status change to true
// @access   Private
router.post("/set-reminder-fifteen-min-on", auth, async (req, res) => {
    let ans = {}
  try {
        ans = await Settings.updateOne(
        { userId: req.user.id },
        { $set: { reminderFifteenMin: true } },
        {
            new: true,
        }
        );
        return res.status(200).send(ans);

  } catch (err) {
    return res.status(400).send({ errors: [{ msg: "Cannot change 15 min status" }] });
  }
});

// @route    POST api/settings
// @desc     Post reminder status change to false
// @access   Private
router.post("/set-reminder-fifteen-min-off", auth, async (req, res) => {
      let ans = {};
      try {
        ans = await Settings.updateOne(
          { userId: req.user.id },
          { $set: { reminderFifteenMin: false } },
          {
            new: true,
          }
        );
        return res.status(200).send(ans);
      } catch (err) {
        return res
          .status(400)
          .send({ errors: [{ msg: "Cannot change 15 min status" }] });
      }
});

// ---------------------------- 30 Min ------------------------------
// @route    POST api/settings
// @desc     Post reminder status change to true
// @access   Private
router.post("/set-reminder-thirty-min-on", auth, async (req, res) => {
    let ans = {}
  try {
        ans = await Settings.updateOne(
          { userId: req.user.id },
          { $set: { reminderThirtyMin: true } },
          {
            new: true,
          }
        );
        return res.status(200).send(ans);

  } catch (err) {
    return res.status(400).send({ errors: [{ msg: "Cannot change 30 min status" }] });
  }
});

// @route    POST api/settings
// @desc     Post reminder status change to false
// @access   Private
router.post("/set-reminder-thirty-min-off", auth, async (req, res) => {
      let ans = {};
      try {
        ans = await Settings.updateOne(
          { userId: req.user.id },
          { $set: { reminderThirtyMin: false } },
          {
            new: true,
          }
        );
        return res.status(200).send(ans);
      } catch (err) {
        return res
          .status(400)
          .send({ errors: [{ msg: "Cannot change 30 min status" }] });
      }
});

// ---------------------------- 1 Hour ------------------------------
// @route    POST api/settings
// @desc     Post reminder status change to true
// @access   Private
router.post("/set-reminder-one-hour-on", auth, async (req, res) => {
    let ans = {}
  try {
        ans = await Settings.updateOne(
          { userId: req.user.id },
          { $set: { reminderOneHour: true } },
          {
            new: true,
          }
        );
        return res.status(200).send(ans);

  } catch (err) {
    return res.status(400).send({ errors: [{ msg: "Cannot change 1 hour status" }] });
  }
});

// @route    POST api/settings
// @desc     Post reminder status change to false
// @access   Private
router.post("/set-reminder-one-hour-off", auth, async (req, res) => {
      let ans = {};
      try {
        ans = await Settings.updateOne(
          { userId: req.user.id },
          { $set: { reminderOneHour: false } },
          {
            new: true,
          }
        );
        return res.status(200).send(ans);
      } catch (err) {
        return res
          .status(400)
          .send({ errors: [{ msg: "Cannot change 1 hour status" }] });
      }
});

// ---------------------------- 2 Hours ------------------------------
// @route    POST api/settings
// @desc     Post reminder status change to true
// @access   Private
router.post("/set-reminder-two-hour-on", auth, async (req, res) => {
    let ans = {}
  try {
        ans = await Settings.updateOne(
          { userId: req.user.id },
          { $set: { reminderTwoHour: true } },
          {
            new: true,
          }
        );
        return res.status(200).send(ans);

  } catch (err) {
    return res.status(400).send({ errors: [{ msg: "Cannot change 2 hours status" }] });
  }
});

// @route    POST api/settings
// @desc     Post reminder status change to false
// @access   Private
router.post("/set-reminder-two-hour-off", auth, async (req, res) => {
      let ans = {};
      try {
        ans = await Settings.updateOne(
          { userId: req.user.id },
          { $set: { reminderTwoHour: false } },
          {
            new: true,
          }
        );
        return res.status(200).send(ans);
      } catch (err) {
        return res
          .status(400)
          .send({ errors: [{ msg: "Cannot change 2 hours status" }] });
      }
});

// ---------------------------- 3 Hours ------------------------------
// @route    POST api/settings
// @desc     Post reminder status change to true
// @access   Private
router.post("/set-reminder-three-hour-on", auth, async (req, res) => {
    let ans = {}
  try {
        ans = await Settings.updateOne(
          { userId: req.user.id },
          { $set: { reminderThreeHour: true } },
          {
            new: true,
          }
        );
        return res.status(200).send(ans);

  } catch (err) {
    return res.status(400).send({ errors: [{ msg: "Cannot change 3 hours status" }] });
  }
});

// @route    POST api/settings
// @desc     Post reminder status change to false
// @access   Private
router.post("/set-reminder-three-hour-off", auth, async (req, res) => {
      let ans = {};
      try {
        ans = await Settings.updateOne(
          { userId: req.user.id },
          { $set: { reminderThreeHour: false } },
          {
            new: true,
          }
        );
        return res.status(200).send(ans);
      } catch (err) {
        return res
          .status(400)
          .send({ errors: [{ msg: "Cannot change 3 hours status" }] });
      }
});


// ----------------------------- SOUND ------------------------------------
// @route    GET api/settings
// @desc     Get sound status
// @access   Private
router.get("/get-sound-status", auth, async (req, res) => {
    let ans = {};
    try {
      let settingsExist = await Settings.findOne({
        userId: req.user.id,
      });

      if (!settingsExist) {
        let newSoundSetting = new Settings({
          userId: req.user.id,
        });

        await newSoundSetting.save();
        return res.status(200).send(newSoundSetting);
      } else {
        ans = await Settings.find({
          userId: req.user.id,
        });

        return res.status(200).send(ans[0].sound);
      }
    } catch (err) {
      return res
        .status(400)
        .send({ errors: [{ msg: "Cannot fetch sound status" }] });
    }
});

// @route    POST api/settings
// @desc     Post sound status change to true
// @access   Private
router.post("/set-sound-on", auth, async (req, res) => {
    let ans = {}
  try {

    let settingsExist = await Settings.findOne({
        userId: req.user.id
    })

    if(!settingsExist){
        let newSoundSetting = new Settings({
            userId: req.user.id,
            sound: true
        })

        await newSoundSetting.save()
        return res.status(200).send(newSoundSetting);
    } else {
        ans = await Settings.updateOne(
        { userId: req.user.id },
        { $set: { sound: true } },
        {
            new: true,
        }
        );
        return res.status(200).send(ans);
    }    

  } catch (err) {
    return res.status(400).send({ errors: [{ msg: "Cannot change sound status" }] });
  }
});

// @route    POST api/settings
// @desc     Post sound status change to false
// @access   Private
router.post("/set-sound-off", auth, async (req, res) => {
    let ans = {};
    try {

      let settingsExist = await Settings.findOne({
        userId: req.user.id,
      });

      if (!settingsExist) {
        let newSoundSetting = new Settings({
          userId: req.user.id,
          sound: false,
        });

        await newSoundSetting.save();
        return res.status(200).send(newSoundSetting);
      } else {
        ans = await Settings.updateOne(
          { userId: req.user.id },
          { $set: { sound: false } },
          {
            new: true,
          }
        );
        return res.status(200).send(ans);
      }
    } catch (err) {
      return res
        .status(400)
        .send({ errors: [{ msg: "Cannot change sound status" }] });
    }
});

module.exports = router