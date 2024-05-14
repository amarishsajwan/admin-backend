const mongoose = require('mongoose')
const constants = require('../utils/constants')

mongoose.connect(constants.BASE_MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection
    .on('connected', () =>{
        console.log('connected to database' )})
    .on('error', err => console.log('database error: ' + err));
