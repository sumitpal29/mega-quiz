const express = require('express')
const bcrypt = require('bcryptjs');
const router = express.Router();
const Admin = require('../models/admin')

router.post('/api/admin-signup', async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword  = await bcrypt.hash(password, 10);
    console.log('pass', hashedPassword)
    const response = await Admin.create({
      username,
      password: hashedPassword,
    });

    console.log(response)
    res.status(201).send({ status: 'SUCCESS', data: {
      username
    }});
  } catch (err) {
    console.error(err);
    res.status(400).send({
      error: 'Admin creation failed'
    })
  }
});

router.get('/', (req, res) => {
  res.send('server is running');
})

module.exports = router;