const express = require('express')
const bcrypt = require('bcryptjs');
const _isEmpty = require('lodash/isEmpty');

const Admin = require('../models/admin');
const STATUS = require('../constants/constant.status');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/api/admin-signup', async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword  = await bcrypt.hash(password, 10);
    const response = await Admin.create({
      username,
      password: hashedPassword,
    });
    res.status(201).send({ status: STATUS.SUCCESS, data: {
      username,
      message: 'User created successfully. Please login to access Admin dashboard'
    }});
  } catch (error) {
    console.error(error);
    res.status(400).send({
      status: STATUS.ERROR,
      error
    })
  }
});

router.post('/api/admin-login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await Admin.findOne({username});

    if (_isEmpty(user)) {
      return res.status(400).send({
        status: STATUS.ERROR,
        error: 'Invalid username or password'
      });
    }

    if (bcrypt.compare(password, user.password)) {
      // username and password matched
      const token = await user.generateAuthToken();
      return res.status(200).send({
        status: STATUS.SUCCESS,
        data: {
          token,
          username: user.username,
        }
      });
    }
  } catch (error) {
    console.error(error);
    res.status(400).send({
      status: STATUS.ERROR,
      error
    });
  }
});

// logout
router.post("/api/admin/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((ob) => {
      // filter out which is matched
      return ob.token !== req.token;
    });
    await req.user.save();
    res.send({
      status: STATUS.SUCCESS,
      message: "Logged-out successfully",
    });
  } catch (e) {
    res.status(500).send(e);
  }
});

// logout-all
router.post("/api/admin/logout-all", auth, async (req, res) => {
  try {
    req.user && (req.user.tokens = []);
    await req.user.save();
    res.send({
      status: STATUS.SUCCESS,
      message: "Logged-out from all sessions",
    });
  } catch (e) {
    res.status(500).send(e);
  }
});

router.post("/api/admin/verify", auth, async (req, res) => {
  const { admin } = req;
  const { token } = req.body;
  const { username, _id } = admin;
  res.send({
    status: STATUS.SUCCESS,
    data: {
      username,
      _id,
      token
    }
  });
});

router.get('/', (req, res) => {
  res.send('server is running');
})

module.exports = router;