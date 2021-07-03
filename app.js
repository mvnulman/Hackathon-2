//init the express server parameters
const express = require('express');
const exphbs = require('express-handlebars')
const app = express();
const db = require ('./db/connection');
const bodyParser = require('body-parser');
const path = require('path');
const Jobs = require('./models/Job');
const Job = require('./models/Job');

const PORT = 3000;


app.listen(PORT, function() {
    console.log(`The express is running on port ${PORT}`);
});


//body.parser here
app.use(bodyParser.urlencoded({extended: false}));

// handle bars
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout:'main'}));
app.set('view engine', 'handlebars');

// static folder
app.use(express.static(path.join(__dirname, 'public')));

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
    
    Job.findAll({order: [
      ['createdAt', 'DESC']  
    ]})
    .then(jobs => {

        res.render('index', {
           jobs 
        });

    });

});

//jobs routes
app.use('/jobs', require('./routes/jobs'));

