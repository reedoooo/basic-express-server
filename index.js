'use strict';

const app = require('./src/server');
require('dotenv').config();

const serverUrl = process.env.PORT || 3001;

app.start(serverUrl);

// app.listen(serverUrl, () => {
//   console.log(`Server is running, listening on ${serverUrl}`)
// })