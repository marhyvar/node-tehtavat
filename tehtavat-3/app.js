const express = require('express');
const morgan = require('morgan');
const fetch = require('node-fetch');
const query_validator = require('./query_validator');
const error_handler = require('./error_handler');
const app = express();
const port = 3000;
const url = 'https://www.ilmatieteenlaitos.fi/observation-data?station=101004'

app.use(morgan('dev'));
app.use(express.json())
app.use(express.urlencoded ({ extended : true }))
app.get('/weather', query_validator, (req, res, next) => {
    fetch(url)
        .then(res => res.json())
        .then(json => useData(json, req.query))
        .then(json => res.send(json))

});
app.use(error_handler);

app.listen(port, () => console.log(`App listening on port ${port}`));

const useData = (json, weather) => {
    let obj = {};
    if (Object.keys(weather).length === 0) {
        obj['temperature'] = getLatest(json, 't2m')
        obj['humidity'] = getLatest(json, 'Humidity');
        obj['wind'] = getLatest(json, 'WindSpeedMS');
        return obj;
    } else {
        const items = weather.observation;
        for (const key in items) {
            const value = items[key]
            obj[value] = getLatest(json, weatherItems[value])
        }
        return obj;
    }
}

const getLatest = (data, item) => 
    data[item][(data[item].length -1)][1] 

const weatherItems = {
    temperature: 't2m',
    humidity: 'Humidity',
    wind: 'WindSpeedMS'
}
