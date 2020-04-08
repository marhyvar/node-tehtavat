const express = require('express')
//const cors =require('cors')
const app = express()
const port = 3000

app.use(express.static('public'))
app.use('/hello', express.static('hello'))
//app.use(cors())
app.use(express.json())
app.use(express.urlencoded ({ extended : true }))

app.get('/api', (req, res) => {
    res.send({msg: 'Hello, World!'})
})

app.get('/api/exercise', (req, res) => {
    res.status(200).json(req.query)
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

app.post('/api/login', (req, res) => {
    const name = req.body.user
    const password = req.body.pwd
    console.log(`${name} ${password}`)
    if (name == 'mark' && password == 'giraffe') {
        res.status(200).json({user: name})
    } else if (name == '' || password == '') {
        res.status(400).send('Name or password missing')
    } else {
        res.status(403).send('No access')
    }
})

app.listen(port, () => console.log(`App listening on port ${port}`))