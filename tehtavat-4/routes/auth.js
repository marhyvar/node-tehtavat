const tokenMaker = require('../tokens');
const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    const user = req.body.username;
    const pwd = req.body.password;
    if (user === "mark" && pwd === 'giraffe') {
        let token = tokenMaker.create(user)
        res.status(200).send({ token })
    } else {
        res.status(400).send({ 'error': 'Invalid credentials' });
    }
});

module.exports = router;