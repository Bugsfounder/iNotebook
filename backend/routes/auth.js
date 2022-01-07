const express = require('express');
const router = express.Router();
const User = require('../models/User')

// CREATE A USER USING: POST "/api/auth" DOESN'T REQUIRE AUTH

router.post('/', (req, res) => {
    console.log(req.body);
    const user = User(req.body);
    user.save();
    res.send(req.body);
});

module.exports = router;