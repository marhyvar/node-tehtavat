const express = require('express');
const morgan = require('morgan')
const app = express();
const port = 3000;

app.use(morgan('dev'));
app.get('/weather', (req, res) => {
    res.status(200).send('weather');
});

app.listen(port, () => console.log(`App listening on port ${port}`));