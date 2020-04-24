const poisRouter = require('./routes/pois');
const authRouter = require('./routes/auth');

const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.use('/pois', poisRouter);
app.use('/auth', authRouter);

app.listen(port, () => console.log(`App listening on port ${port}`));