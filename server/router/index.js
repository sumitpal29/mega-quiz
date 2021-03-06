const bcrypt = require('bcryptjs');
const express = require('express')

const _get = require('lodash/get');
const _keys = require('lodash/keys');
const _isEmpty = require('lodash/isEmpty');

const auth = require('../middleware/auth');
const Admin = require('../models/admin');
const STATUS = require('../constants/constant.status');

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
    res.status(400).send({
      status: STATUS.ERROR,
      error: error.message
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
          _id: _get(user, '_id'),
          games: _get(user, 'games', []),
        }
      });
    }
  } catch (error) {
    res.status(400).send({
      status: STATUS.ERROR,
      error
    });
  }
});

// logout
router.post("/api/admin/logout", auth, async (req, res) => {
  try {
    req.admin.tokens = req.admin.tokens.filter((ob) => {
      // filter out which is matched
      return ob.token !== req.token;
    });
    await req.admin.save();
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
    req.admin && (req.admin.tokens = []);
    await req.admin.save();
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
  const { username, _id, games = [] } = admin;
  res.send({
    status: STATUS.SUCCESS,
    data: {
      username,
      _id,
      token,
      games
    }
  });
});

router.post("/api/admin/update-game", auth, async (req, res) => {
  const allowedProps = ["games"]
  const props = _keys(_get(req.body, 'updates', {}));
  
  const isValidUpdate = props.every((prop) => allowedProps.includes(prop));

  if (!isValidUpdate) return res.status(400).send({
    status: STATUS.ERROR,
    message: "You are not allowed to update above properties",
  });

  try {
    const { admin } = req;

    props.forEach((prop) => {
      admin[prop] = req.body.updates[prop];
    });

    await admin.save().then((_data) => res.status(200).send(_data));
  } catch (e) {
    res.status(404).send({
      status: STATUS.ERROR,
      message: e.message,
    });
  }
})

router.get('/', (req, res) => {
  res.send('server is running');
})

module.exports = router;