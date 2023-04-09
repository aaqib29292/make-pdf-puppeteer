'use strict';

const express = require('express')
const corsHeader = require('./middlewares/cors')

const pdfRoute = require('./routes/feeReciptPDF')

const app = express();

app.options('*', corsHeader )

app.use(corsHeader)

app.use(express.json())

app.use('/api/pdf', pdfRoute)

const PORT = process.env.PORT || 8081;

app.listen(PORT, () => console.log('server is running on port -', PORT))

module.export = app


