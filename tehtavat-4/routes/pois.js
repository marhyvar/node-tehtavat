const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
    res.status(200).send(
        db.getPoi()
    );
});

module.exports = router;