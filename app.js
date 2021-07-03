//init the express server parameters
const express = require('express');
const exphbs = require('express-handlebars')
const app = express();
const db = require ('./db/connection');
const bodyParser = require('body-parser');
const path = require('path');
const Jobs = require('./models/Job');
const Job = require('./models/Job');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

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

    let search = req.query.job;
    let query  = '%'+search+'%'; // PH -> PHP, Word -> Wordpress, press -> Wordpress

    if(!search) {
        Job.findAll({order: [
          ['createdAt', 'DESC']
        ]})
        .then(jobs => {
      
          res.render('index', {
            jobs
          });
      
        })
        .catch(err => console.log(err));
      } else {
        Job.findAll({
          where: {title: {[Op.like]: query}},
          order: [
            ['createdAt', 'DESC']
        ]})
        .then(jobs => {
          console.log(search);
          console.log(search);
      
          res.render('index', {
            jobs, search
          });
      
        })
        .catch(err => console.log(err));
      }
    
      
    });

//jobs routes
app.use('/jobs', require('./routes/jobs'));

