const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
    res.status(200).send(
        db.getPoi()
    );
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    try {
        const poi = db.getPoi(id);
        if (typeof poi != 'undefined') {
            res.status(200).send(poi);
        } else {
            res.status(404).send('id:tä ei ole');
        }
        
    } catch (e) {
        console.log('error');       
    }
})

module.exports = router;