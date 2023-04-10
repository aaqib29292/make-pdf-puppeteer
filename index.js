'use strict';

const express = require('express')
const corsHeader = require('./middlewares/cors')

const pdfRoute = require('./routes/feeReciptPDF')
const cors = require("cors")
const app = express();

app.options('*', corsHeader )

app.use(corsHeader)

app.use(cors())

app.use(express.json())

app.use('/', pdfRoute)
// app.get("/", (req, res) => {
//   res.send("Main page!");
// });
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log('server is running on port -', PORT))



