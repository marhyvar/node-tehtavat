const error_handler = (err, req, res, next) => {
    if (!err.statusCode || err.statusCode === 500) {
        res.status(500).send({
            error: 'Virhe palvelimella'
        })
     } else {
         res.status(err.statusCode).send({
             error: err.message
         })
    }
}

module.exports = error_handler