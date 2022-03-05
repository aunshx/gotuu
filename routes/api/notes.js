const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");
const moment = require("moment");
const mongoose = require("mongoose");
const User = require("../../models/User");
const Notes = require("../../models/Notes");
const { getMonthInString } = require("../../middleware/getMonthInString");

// @route    POST api/notes
// @desc     Get note
// @access   Private

router.post(
  "/get-note",
  auth,
  async (req, res) => {

    const { eventId } = req.body;

    try {
      let event = await Notes.findOne({ eventId })

      return res.status(200).send(event);
    } catch (error) {
      console.error(error.message);
      res.status(400).send("Something went wrong!");
    }
  }
);

// @route    POST api/notes
// @desc     Create a note
// @access   Private

router.post(
  "/create-note",
  auth,
  async (req, res) => {

    const { eventId } = req.body;

    let ans = {};
    try {
      let event = await Notes.findOne({ eventId })

      if (event) {
        return res
          .status(400)
          .send({ errors: [{ msg: "Note already exists" }] });
      }

      event = new Notes({
          userId: req.user.id,
          eventId
      })

      ans = await event.save()

      return res.status(200).send(ans._id);
    } catch (error) {
      console.error(error.message);
      res.status(400).send("Something went wrong!");
    }
  }
);

// @route    DELETE api/notes
// @desc     Delete a note
// @access   Private

router.delete(
  "/delete-note",
  auth,
  async (req, res) => {

    const { noteId } = req.body;

    let ans = {};
    try {
      let event = await Notes.deleteOne({ _id: noteId })

      return res.status(200).send('Note deleted successfully!');
    } catch (error) {
      console.error(error.message);
      res.status(400).send("Something went wrong!");
    }
  }
);

// @route    POST api/notes
// @desc     Write a note - title
// @access   Private

router.post(
  "/insert-data-note-title",
  auth,
  async (req, res) => {

    const { noteId, title } = req.body;

    try {

      let ans = await Notes.updateOne({ _id: noteId }, { $set: { "title": title } });

      return res.status(200).send(ans);
    } catch (error) {
      console.error(error.message);
      res.status(400).send("Something went wrong!");
    }
  }
);

// @route    POST api/notes
// @desc     Write a note - body
// @access   Private

router.post(
  "/insert-data-note-body",
  auth,
  async (req, res) => {

    const { noteId, body } = req.body;

    try {

      let ans = await Notes.updateOne({ _id: noteId }, { $set: { "body": body } });

      return res.status(200).send(ans);
    } catch (error) {
      console.error(error.message);
      res.status(400).send("Something went wrong!");
    }
  }
);

// @route    POST api/notes
// @desc     Completion to INCOMPLETE
// @access   Private

router.post(
  "/change-note-to-incomplete",
  auth,
  async (req, res) => {

    const { noteId } = req.body;

    try {

      let ans = await Notes.updateOne(
        { _id: noteId },
        { $set: { completed: false } }
      );

      return res.status(200).send(ans);
    } catch (error) {
      console.log(error)
      res.status(400).send({ errors: [ { msg: 'Something went wrong' } ] });
    }
  }
);

// @route    POST api/notes
// @desc     Completion to COMPLETE
// @access   Private

router.post(
  "/change-note-to-complete",
  auth,
  async (req, res) => {

    const { noteId } = req.body;

    try {

      let ans = await Notes.updateOne(
        { _id: noteId },
        { $set: { completed: true } }
      );

      return res.status(200).send(ans);
    } catch (error) {
      console.log(error)
      res.status(400).send({ errors: [ { msg: 'Something went wrong' } ] });
    }
  }
);


module.exports  = router
