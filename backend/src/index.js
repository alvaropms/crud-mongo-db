const express = require('express')
const mongoose = require('mongoose');
const routes = require('./routes')
const cors = require('cors')

const app = express()

const pass = 'cSYMFehVU5PkHr2d'
const dbName = 'myFirstDb'
const port = 3333

mongoose.connect(`mongodb+srv://alvi:${pass}@mycluster.tfj24.mongodb.net/
${dbName}?retryWrites=true&w=majority`)

mongoose.connection.on('connected', function () {
    console.log('Connected to Database '+dbName);
})

mongoose.connection.on('error', (err) => {
    console.log('Database error '+err);
})

app.use(cors())
app.use(express.json())
app.use(routes)
app.listen(port, () => {
    console.log('Ouvindo na porta '+port)
})