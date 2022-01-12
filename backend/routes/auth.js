const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleWare/fetchuser');

const JWT_SECRET = 'manishaisagoodg$irl';

// ROUTE 1: CREATE A USER USING: POST "/api/auth/createuser". No Login Required
router.post('/createuser', [
    body('name', "Enter a Valid Name").isLength({ min: 3 }),
    body('email', "Enter a Valid Email").isEmail(),
    body('password', "Enter a Valid Password").isLength({ min: 5 }),
    body('phone', "Enter a Valid Phone").isMobilePhone()
],
    // MAKE FUNTIIN ASYNC BECAUSE WE HAVE TO WAIT INSIDE THIS FUNCTION FOR CREATE USER AND OTHER THIS LIKE THSI
    async (req, res) => {
        // IF THERE IS ERRORS, RETURN BAD REQUEST AND THE ERRORS 
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        // CHECK WHETHER THE USER WITH THE SAME EMAIL EXISTS ALREADY
        try {
            let user = await User.findOne({ email: req.body.email });
            if (user) {
                return res.status(400).json({ error: "Email Already Exists" })
            }

            const salt = await bcrypt.genSalt(10)
            const seqPass = await bcrypt.hash(req.body.password, salt);
            // CREATE A NEW USER AND INSERT INTO DATABASE NOTE:- WAIT FOR CREATE USING AWAIT
            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
                password: seqPass
            });
            const data = {
                user: {
                    id: user.id
                }
            }
            const authToken = jwt.sign(data, JWT_SECRET);
            res.json({ authToken });

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error Occured");
        }
    });


// ROUTE 2: AUTHENTICATE A USER USING: POST "/api/auth/login". No Login Required
router.post('/login', [
    body('email', "Email Not Available in The DataBase").isEmail(),
    body('password', "Password cannot be blank").exists()
], async (req, res) => {
    // IF THERE IS ERRORS, RETURN BAD REQUEST AND THE ERRORS 
    const errors = validationResult(req);
    let success = false
    if (!errors.isEmpty()) {
        success = false
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            success = false
            return res.status(400).json({ error: "Please Try to login with correct credentials" });
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            success = false
            return res.status(400).json({ error: "Please try to login with correct credentials" });
        }

        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({ success, authToken });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error Occured");
    }
});


// ROUTE 3: GET LOGGEDIN USER DETAILS USING: POST "/api/auth/getuser". Login Required

router.post('/getuser', fetchuser, async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error Occured");
    }
})


module.exports = router;