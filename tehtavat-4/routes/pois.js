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
    if (isValidPoi(req.body)) {
        db.createPoi(req.body);
        res.status(201).send(req.body);   
    } else {
        res.status(400).send({400: 'POI-tiedot virheelliset'});
    }
})

const isValidPoi = obj => {
    let valid;
    const name = obj.name;
    const description = obj.description;
    const city = obj.city;
    const lat = obj.coordinates.lat;
    const lng = obj.coordinates.lng;
    if (Object.keys(obj).length != 4) {
        valid = false;    
    } else {
        if (name !== '' && city !=='' && description !== '') {
            if (isNaN(lat) || isNaN(lng)) {
                valid = false;
            } else {
                valid = true;
            }
        } else {
            valid = false;
        }
    }
    return valid;
}

module.exports = router;