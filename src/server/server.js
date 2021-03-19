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

//   GET
app.get('/', function (req, res){
  res.sendFile("dist/index.html");
  });

    //post Route 
app.post('/clientData', async (req, res) =>{
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
    projectData['name'] = geoData.geonames[0].name;
    projectData['countryName'] = geoData.geonames[0].countryName;
    console.log('Data:', projectData)
    res.send(projectData);
  } catch (err) {
    console.log("error", err);
  }
});
  
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
// Exmple: https://pixabay.com/api/?key=20700415-2828a58847eba5b3aa52b5e90&q=yellow+flowers&image_type=photo
const pixabay = 'https://pixabay.com/api/?';
const pixabayApiKey = 'key=20700415-2828a58847eba5b3aa52b5e90&q=';
const type = '&image_type=photo';
  
app.get('/getPix', async (req, res) => {
  console.log(`Pixabay: ${projectData.name}`);
  const city = projectData.name;
  let pixabayURL = `${pixabay}${pixabayApiKey}${city}${type}`;
  console.log(`Pixabay URL is ${pixabayURL}`);
    try {
      let response = await fetch(pixabayURL);
      // failed datafrom API
        if (!response.ok) {
            console.log(`Error connecting to Pixabay API ${response.status}`);
            res.send(null);
        }
      let pixData = await response.json();
      projectData['image1'] = pixData.hits[0].webformatURL;
      projectData['image2'] = pixData.hits[1].webformatURL;
      projectData['image3'] = pixData.hits[2].webformatURL;
      res.send(pixData);
      console.log(image1, image2, image3);
      image1, image2, image3 = projectData;

      // If no photo was returned for city, get one for the country instead
      if (responseJSON.total == 0) {
       const country = projectData.countryName;
       console.log(`No photo for ${city}. Looking for ${country}.`);
       pixabayURL = `${pixabay}${country}${pixabayApiKey}${type}`;
       console.log(`Pixabay country URL is ${pixabayURL}`);
        response = await fetch(pixabayURL)
          // failed data from API
          if (!response.ok) {
              console.log(`Error connecting to Pixabay ${response.status}`)
              res.send(null)
          }
          responseJSON = await response.json()
      }

      res.send(responseJSON)
      // If failed connection to API, return null
  } catch (error) {
      console.log(`Error connecting to server: ${error}`)
      res.send(null)
  }
})

app.get('/getData', (req, res) => {
  console.log(projectData);
  res.send(projectData);
  res.json({message: 'Recieved'});
});