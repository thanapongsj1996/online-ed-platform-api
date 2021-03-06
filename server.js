import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import { readdirSync } from 'fs'
const morgan = require('morgan')
require('dotenv').config()

// create express app
const app = express()

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => console.log('**** Database connected ****'))
.catch(err => console.log('Database connection error : ', err))

// apply middlewares
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

// route
readdirSync('./routes').map(r => {
    app.use('/api', require(`./routes/${r}`))
})

// port
const port = process.env.PORT || 8000

app.listen(port, () => console.log(`Server is running on port ${port}`))
