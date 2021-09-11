const express = require('express')
const bcrypt = require('bcryptjs');
const router = express.Router();
const Admin = require('../models/admin');
const STATUS = require('../constants/constant.status');

router.post('/api/admin-signup', async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword  = await bcrypt.hash(password, 10);
    const response = await Admin.create({
      username,
      password: hashedPassword,
    });
    res.status(201).send({ status: STATUS.SUCCESS, data: {
      username
    }});
  } catch (error) {
    console.error(error);
    res.status(400).send({
      status: STATUS.ERROR,
      error
    })
  }
});

router.get('/', (req, res) => {
  res.send('server is running');
})

module.exports = router;