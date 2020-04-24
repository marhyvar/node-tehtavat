const tokens = require('./tokens');

const checkAuth = (req, res, next) => {
    const header = req.headers.authorization;
    console.log(header);
    if (typeof header != 'undefined') {
        const token = header.split(' ')[1];
        let verified = tokens.verify(token);
        console.log('verified: ', verified);
        if (verified) {
            next();
        } else {
            res.status(401).send({401: 'not authorized'});
        }
    } else {
        res.status(401).send({401: 'not authorized'});
    }
};

module.exports = checkAuth;