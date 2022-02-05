const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const auth = require("../../middleware/auth");
const jwt = require("jsonwebtoken");
const random = require("random");
const config = require("config");
const { check, validationResult } = require("express-validator")

// const {sendEmail} = require('../../middleware/sendEmail')
const { sendEmail } = require("../../middleware/forgotPasswordResetEmail");
const {
  sendInitialConfirmationEmail,
} = require("../../middleware/initialConfirmationEmail");

const User = require("../../models/User");
const Security = require("../../models/Security");
const { verify } = require("crypto");

// @route    GET api/auth
// @desc     Get user by token
// @access   Private
router.get("/get-data", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .select("-password")
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    POST api/auth
// @desc     Authenticate user & get token
// @access   Public
router.post(
  "/login",
  check("email", "Please include a valid email").isEmail(),
  check("password", "Password is required").exists(),
  async (req, res) => {
    console.log('Hit')
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }


    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (!user) {

        return res
          .status(400)
          .send({ errors: [{ msg: "Invalid Credentials" }] });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {

        return res
          .status(400)
          .send({ errors: [{ msg: "Invalid Credentials" }] });
      }

      const payload = {
        user: {
          id: user._id,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: "5 days" },
        (err, token) => {
          if (err) throw err;
          res.send({ token });
        }
      );
    } catch (err) {
      console.log(err);
      res.status(500).send({ errors: [{ msg: "Bad Request" }] });
    }
  }
);


// @route    POST api/users
// @desc     Register user and send verification email
// @access   Public
router.post(
  "/register",
  check("name", "Name is required").notEmpty(),
  check("email", "Please include a valid email").isEmail(),
  check(
    "password",
    "Please enter a password with 6 or more characters"
  ).isLength({ min: 6 }),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .send({ errors: [{ msg: "User already exists" }] });
      }

      user = new User({
        name,
        email,
        password,
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const verifySalt = await bcrypt.genSalt(12)

      let verificationToken = await bcrypt.hash(user.id, verifySalt);

      let verify = new Security({
        email,
        verificationToken
      })

      await verify.save()

      let verifyLink =
        `http://localhost:3000/auth/register/verify/${verificationToken}`

        await sendInitialConfirmationEmail(email, name, verifyLink);

      // Return jsonwebtoken
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.send({ token });
        }
      );
    } catch (err) {
      console.log(err);
      res.status(500).send("Server error");
    }
  }
);

// @route    POST api/users
// @desc     Authenticate User
// @access   Public
router.post(
  "/register/verify/:token",
  async (req, res) => {

    try {
      let ans = await Security.findOne({ verificationToken: req.params.token })

      if(ans){
        let user = await User.updateOne(
          { _id: req.params.token },
          { $set: { verified: true } }
        );

        await Security.deleteOne({ verificationToken: req.params.id })

        return res.status(200).send("Email has been verified");
      } else {
        return res.status(400).send({ errors: [{ msg: 'Token has expired resend email' }] });
      }

    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server error");
    }
  }
);

// @route    GET api/auth
// @desc     Get user by token
// @access   Private
router.get("/get-data", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .select("-password")
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    POST api/users
// @desc     Send security code
// @access   Public
router.post(
  "/send-security-code",
  check("email", "Please include a valid email").isEmail(),
  async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }

    const { email } = req.body;

    try {
      let user = await User.findOne({ email });

      if (user) {
        const securityCode = await random.int(1000000, 9999999); 

        let ans = await Security.create({
          email,
          securityCode,
        });

        await sendEmail(email, securityCode);

        return res.status(200).send({
          msg: "Security code sent to registered email ID",
        });

      }

    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server error");
    }
  }
);

// @route    POST api/users
// @desc     Validate security code
// @access   Public
router.post(
  "/check-security-code",
  check("securityCode", "Security code should be 6 digits").isLength({ min: 6 }),
  async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }

    const { securityCode, email } = req.body;
    let date = new Date()

    try {

        let ans = await Security.findOne({
          $and: [{ securityCode: securityCode }, { email: email }, {createdAt: { $gte: date.getTime() - (1000 * 60 * 10) }}],
        }).select({ _id: 1 }).limit(1)

        if(ans){
          await ans.deleteOne({ _id: ans._id })
          return res.status(200).send({
            msg: "Validation Success",
          });
        } else {
          return res
            .status(400)
            .send({ errors: [{ msg: "Invalid Security Code" }] });
        }

    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server error");
    }
  }
);

// @route    POST api/users
// @desc     Change password
// @access   Public
router.post(
  "/change-password",
  check("password", "Password should be at least 6 digits").isLength({
    min: 6,
  }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }

    const { password, email } = req.body;

    try {
      const salt = await bcrypt.genSalt(10);

      let newPassword = await bcrypt.hash(password, salt);

      let ans = await User.updateOne({ 'email': email }, { $set: { 'password': newPassword } });

      console.log(ans);

      if (ans) {
        return res.status(200).send({
          msg: "Password Changed Successfully",
        });
      } else {
        return res
          .status(400)
          .send({ errors: [{ msg: "Could not change password" }] });
      }
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
