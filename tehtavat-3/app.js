const express = require('express');
const morgan = require('morgan');
const fetch = require('node-fetch');
const query_validator = require('./query_validator');
const error_handler = require('./error_handler');
const weather = require('./weather');
const app = express();
const port = 3000;
const url = 'https://www.ilmatieteenlaitos.fi/observation-data?station=101004'

app.use(morgan('dev'));
app.use(express.json())
app.use(express.urlencoded ({ extended : true }))
app.get('/weather', query_validator, (req, res, next) => {
    fetch(url)
        .then(res => res.json())
        .then(json => weather.useData(json, req.query))
        .then(json => res.send(json))

});
app.use(error_handler);

app.listen(port, () => console.log(`App listening on port ${port}`));


