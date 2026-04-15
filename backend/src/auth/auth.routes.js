const express = require('express');


const router = express.Router();

// login route
router.get("/login", (req, res) => {
    res.send("This is the login route");
});

router.get("/signin", (req, res) => {
    res.send("This is the signin route");
});

router.get("/googleSignin", (req, res) => {
    res.send("This is the google signin route");
});

module.exports = router;