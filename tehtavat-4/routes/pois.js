const express = require('express');
const router = express.Router();
const db = require('../db');
const checkAuth = require('../checkAuth');
const haversine = require('haversine');

router.get('/', (req, res) => {
    if (Object.keys(req.query).length == 4) {
        const list = countWithinRadius(db.getPoi(), req.query);
        res.status(200).send(list);
    } else {
        res.status(200).send(       
            db.getPoi()
        );
    }
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

router.post('/', checkAuth, (req, res) => {
    if (isValidPoi(req.body)) {
        db.createPoi(req.body);
        res.status(201).send(req.body);   
    } else {
        res.status(400).send({400: 'POI-tiedot virheelliset'});
    }
})

router.put('/:id', checkAuth, (req, res) => {
    const id = req.params.id;
    if (isValidPoi(req.body)) {
        try {
            const poi = db.getPoi(id);
            if (typeof poi != 'undefined') {
                db.setPoi(id, req.body);
                res.status(200).send(req.body);
            } else {
                db.createPoi(req.body);
                res.status(201).send(req.body);
            }
            
        } catch (e) {
            console.log('error');       
        }
    } else {
        res.status(400).send({400: 'POI-tiedot virheelliset'});        
    }
})

router.delete('/:id', checkAuth, (req, res) => {
    const id = req.params.id;
    try {
        const poi = db.getPoi(id);
        if (typeof poi != 'undefined') {
            db.deletePoi(id)
            res.status(204).send({204: 'poistettu'});
        } else {
            res.status(404).send({404: 'id:tä ei ole'});
        }
        
    } catch (e) {
        console.log('error');       
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

const countWithinRadius = (items, query) => {
    const radius = query.radius;
    console.log('items', items);
    console.log('query', query);
    const start = {
        latitude: query.lat,
        longitude: query.lng
    }
    let pois = [];

    items.forEach(item => {
        const end = {
            latitude: item.coordinates.lat,
            longitude: item.coordinates.lng
        }
        const distance = haversine(start, end, {unit: 'meter'}) / 1000;
        if (distance <= radius) {
            pois.push(item);
        }
    });

    if (pois.length > 0) {
        return pois;
    } else {
        return { msg: 'Kohteita ei löytynyt'}
    }
}

module.exports = router;