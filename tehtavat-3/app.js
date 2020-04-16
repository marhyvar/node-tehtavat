const express = require('express');
const morgan = require('morgan');
const query_validator = require('./query_validator');
const error_handler = require('./error_handler');
const app = express();
const port = 3000;

app.use(morgan('dev'));
app.get('/weather', query_validator, (req, res) => {
    res.status(200).send(req.query.observation);
});
app.use(error_handler);

app.listen(port, () => console.log(`App listening on port ${port}`));