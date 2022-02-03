const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const auth = require("../../middleware/auth");
const jwt = require("jsonwebtoken");
const config = require("config");

const Settings = require("../../models/Settings");

// @route    GET api/settings
// @desc     Get sound status
// @access   Private
router.get("/get-sound-status", auth, async (req, res) => {
  try {

    let ans = await Settings.find({
        userId: req.user.id
    })
    
    return res.status(200).send(ans)

  } catch (err) {
    return res.status(400).send({ errors: [{ msg: "Cannot fetch sound status" }] });
  }
});

// @route    POST api/settings
// @desc     Post sound status change to true
// @access   Private
router.post("/set-sound-on", auth, async (req, res) => {
    const { sound } = req.body

  try {

    let ans = await Settings.findOneAndUpdate({
        userId: req.user.id
    }, { sound: sound })
    
    return res.status(200).send(ans)

  } catch (err) {
    return res.status(400).send({ errors: [{ msg: "Cannot change sound status" }] });
  }
});

// @route    POST api/settings
// @desc     Post sound status change to false
// @access   Private
router.post("/set-sound-off", auth, async (req, res) => {
    const { sound } = req.body

  try {

    let ans = await Settings.findOneAndUpdate({
        userId: req.user.id
    }, { sound: sound })
    
    return res.status(200).send(ans)

  } catch (err) {
    return res.status(400).send({ errors: [{ msg: "Cannot change sound status" }] });
  }
});

module.exports = router