// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require('body-parser')

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

const port = 8000;

// Setup Server
const server = app.listen(port, listening);
 function listening(){
    // console.log(server);
    console.log(`running on localhost: ${port}`);
  };

  const feelingsData = {
        date: 'January',
        temp: '-20' 
  }

  app.get('/feelingsData', getFeelingsData)

  function getFeelingsData(req, res){
      res.send(feelingsData)
  }

  const data = [];

  app.get('/all', getData)

  function getData(req,res){
      res.send(projectData)
      console.log(projectData)
  }

  //post Route

  app.post('/addFeelings', addFeelings);

  function addFeelings(req,res){
      newEntry = {
          date: req.body.date,
          temp: req.body.temp,
          feelings: req.body.feelings
      }

      data.pust(newEntry)
      res.send(projectData)
      console.log(projectData)
  }