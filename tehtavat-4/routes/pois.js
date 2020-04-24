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
            res.status(404).send({404: 'id:tä ei ole'});
        }
        
    } catch (e) {
        console.log('error');       
    }
})

router.post('/', (req, res) => {
    const name = req.body.name;
    const description = req.body.description;
    const city = req.body.city;
    const lat = req.body.coordinates.lat;
    const lng = req.body.coordinates.lng;
    if (Object.keys(req.body).length != 4) {
        res.status(400).send({400: 'POI-tiedot virheelliset'});    
    } else {
        if (name !== '' && city !=='' && description !== '') {
            if (isNaN(lat) || isNaN(lng)) {
                res.status(400).send({400: 'POI-tiedot virheelliset'});
            } else {
                db.createPoi(req.body);
                res.status(201).send(req.body);
            }
        } else {
            res.status(400).send({400: 'POI-tiedot virheelliset'});
        }
    }
})

module.exports = router;