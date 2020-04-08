const express = require('express')
const app = express()
const port = 3000

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded ({ extended : true }))

app.get('/api/exercise', (req, res) => {
    res.status(200).send(req.query)
})

app.post('/api/exercise', (req, res) => {
    let text = '<h1>Hello from Express!</h1><h2>POST parameters</h2>\
    <p>I received these parameters: </p><ul>'
    for (const key in req.body) {
        text += `<li>${key}: ${req.body[key]}</li>`
        }
    text +='</ul>'
    res.status(200).send(text)
})

app.listen(port, () => console.log(`App listening on port ${port}`))