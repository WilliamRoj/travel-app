// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

app.use(express.static('dist'))

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
    console.log('server running');
    console.log(`running on localhost: ${port}`);
  };
// --------------------

// -----------------Geonames API--------------------------------- //
const baseURL = 'http://api.geonames.org/search?q=';
const apiKey = '&william.ur';
const rows = '&maxRows=10';

let projectData = {};

//   GET
  app.get('/all', sendData);
    function sendData(req, res){
        res.send(projectData);
    }

    //post Route 
  app.post('/add', async (req, res) =>{
    const data = req.body;
    projectData = data;
    console.log(projectData);
    const newCity =  document.getElementById('city').value;
    const geonamesUrl = await fetch(`${baseURL}${newCity}${apiKey}${rows}`, {
      method: 'POST'
  });

  try {
      const geoData = await geonamesUrl.json();
      projectData['long'] = geoData.geonames[0].lng;
      projectData['lat'] = geoData.geonames[0].lat;
      projectData['countryName'] = geoData.geonames[0].countryName;
      console.log('Data:', projectData)
      res.send(projectData);
  } catch (err) {
      console.log("error", err);
  }
  
//---------WeatherBit API----------------
// Example: https://api.weatherbit.io/v2.0/current?lat=35.7796&lon=-78.6382&key=API_KEY&include=minutely
// https://api.weatherbit.io/v2.0/forecast/daily?city=Raleigh,NC&key=API_KEY
const weatherBit = 'https://api.weatherbit.io/v2.0/forecast/daily?';
const bitApiKey = '111feafbd5c04e238b81fb2462059b0b';
const imperial = '&units=I';
const language = '&lang=en';
  

  app.get('/getWeatherbit', async (req, res) => {
    console.log(`latitude is ${projectData.lat}`);
    console.log(`longitude is ${projectData.long}`);
    const lat = projectData.lat;
    const long = projectData.long;
    const weatherbitURL = `${weatherBit}lat=${lat}&lon=${long}&API_KEY${bitApiKey}${language}${imperial}`;
    console.log(`Weatherbit URL is ${weatherbitURL}`);
    try {
        const response = await fetch(weatherbitURL);
        
        //failed data from API,
        if (!response.ok) {
            console.log(`Error connecting to Weatherbit API ${response.status}`);
            res.send(null);
        }
        const weatherbitData = await response.json();
        projectData['icon'] = weatherbitData.data[0].weather.icon;
        projectData['description'] = weatherbitData.data[0].weather.description;
        projectData['temp'] = weatherbitData.data[0].temp;
        res.send(weatherbitData);
        console.log(weatherbitData);
        // If error to connection to API
    } catch (error) {
        console.log(`Error connecting to server: ${error}`);
        res.send(null);
    }
})

//---------Pixabay API----------------
  
  // Update the UI
  // const updateUI = async () => {
  //     const request = await fetch('http://localhost:8000/all');
  //     try{
  //       const allData = await request.json();
  //       document.getElementById('date').innerHTML = `Date - ${allData.latitude}`;
  //       document.getElementById('temp').innerHTML = `Temp - ${allData.longitude}`;
  //       document.getElementById('content').innerHTML = `How i feel - ${allData.country}`;
    
  //     }catch(error){
  //       console.log("error", error);
  //     }
  //   }