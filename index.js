'use strict';

const express = require('express')
const corsHeader = require('./middlewares/cors')

const pdfRoute = require('./routes/feeReciptPDF')

const app = express();

app.options('*', corsHeader )

app.use(corsHeader)

app.use(express.json())

app.use('/api/pdf', pdfRoute)

app.listen(8080, () => console.log('server is running on port -', 8080))

module.export = app


