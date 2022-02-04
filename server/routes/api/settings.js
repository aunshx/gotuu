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

        return res.status(200).send(ans[0].reminder);
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
        { $set: { reminder: true } },
        {
            new: true,
        }
        );
        return res.status(200).send(ans);
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
          { $set: { reminder: false } },
          {
            new: true,
          }
        );
        return res.status(200).send(ans);
      }
    } catch (err) {
      return res
        .status(400)
        .send({ errors: [{ msg: "Cannot change reminder status" }] });
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