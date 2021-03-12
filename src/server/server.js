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

// -------------------------------------------------- //
  const baseURL = 'http://api.geonames.org/search?q=';
  const apiKey = '&william.ur';
  const rows = '&maxRows=10';
  
    
    document.getElementById('generate').addEventListener('click', performAction);
    
    function performAction(e){
      const newCity =  document.getElementById('city').value;
       getFeelings(baseURL, newCity, rows, apiKey)
        .then(function(data){
            console.log(data);
            postData('http://localhost:8000/add', {
              latitude:newLatitude, 
              longitude:data.main.longitude, 
              city:newCity});
       }) .then(function() {
        updateUI()
      });
    };
  
    //   Get example
  
   const getFeelings = async (baseURL, newCity, rows, apiKey) =>{
      //console.log(data);
        const response = await fetch(baseURL+newCity+rows+apiKey,) 
         try {
           const newData = await response.json();
           console.log(newData);
           return newData;
         }catch(error) {
         console.log("error", error);
         // appropriately handle the error
         }
     }
  
  // post Eample
      const postData = async ( url = '', data = {})=>{
          //console.log(data);
          const response = await fetch(url, {
          method: 'POST', // GET, POST, PUT, DELETE, etc. 
          credentials: 'same-origin', // Include, same -origin, omit
          headers: {
              'Content-Type': 'application/json',
          },
          // Body data type must match "Content-Type" header        
          body: JSON.stringify(data), // Body data type must match "Content-Type" Header
          });
      
          try {
              const newData = await response.json();
              console.log(newData);
              return newData;
          }catch(error) {
          console.log("error", error)
          // appropriately handle the error
          }
      }
  
  
    //////////////////////////
  
  
  
  
  // Update the UI
  const updateUI = async () => {
      const request = await fetch('http://localhost:8000/all');
      try{
        const allData = await request.json();
        document.getElementById('date').innerHTML = `Date - ${allData.latitude}`;
        document.getElementById('temp').innerHTML = `Temp - ${allData.longitude}`;
        document.getElementById('content').innerHTML = `How i feel - ${allData.country}`;
    
      }catch(error){
        console.log("error", error);
      }
    }