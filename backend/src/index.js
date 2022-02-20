const express = require('express')
const mongoose = require('mongoose');
const routes = require('./routes')
const cors = require('cors')

const app = express()

const pass = process.env.PASSWORD
const dbName = process.env.DB_NAME
const port = process.env.PORT

mongoose.connect(`mongodb+srv://alvi:${pass}@mycluster.tfj24.mongodb.net/
${dbName}?retryWrites=true&w=majority`)

mongoose.connection.on('connected', function () {
    console.log('Connected to Database '+dbName);
})

mongoose.connection.on('error', (err) => {
    console.log('Database error '+err);
})

app.use(cors({
    origin: 'https://crud-mongo-db.vercel.app/'
}))
app.use(express.json())
app.use(routes)
app.listen(port, () => {
    console.log('Ouvindo na porta '+port)
})