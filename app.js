//init the express server parameters
const express = require('express');
const app = express();
const db = require ('./db/connection');
const bodyParser = require('body-parser');

const PORT = 3000;


app.listen(PORT, function() {
    console.log(`The express is running on port ${PORT}`);
});


//body.parser here
app.use(bodyParser.urlencoded({extended: false}));

//db connection
db
.authenticate()
.then(() => {
    console.log('Connected to the database!');
})
.catch (err => {
    console.log('Database connect attempt error', err);
});

//It will show on the root path ('/') the response that i'm sending. Used to check if the path it's retrieving info.
//Also, 'routes'.
app.get('/', (req, res) => { 
    res.send('Working!');
});

//jobs routes
app.use('/jobs', require('./routes/jobs'));

