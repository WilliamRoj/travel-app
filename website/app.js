  const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip='
const apiKey = '&appid=8c7790b9840b7363b8f11b6a4051e0c0';

  
  document.getElementById('generate').addEventListener('click', performAction);
  
  function performAction(e){
    const newZip =  document.getElementById('zip').value;
    const newFeelings = document.getElementById('feelings').value;
    

        getFeelings(baseURL, newZip, apiKey)

        .then(function(data){
            console.log(data);
            postData('http://localhost:3030/add', {date:newDate, temp:data.main.temp, feelings:newFeelings});

        updateUI()
    })

  };

  //   Get example

 const getFeelings = async (baseURL, newZip, apiKey) =>{
    //console.log(data);
      const response = await fetch(baseURL+newZip+apiKey,) 
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
    const request = await fetch('http://localhost:3030/all');
    try{
      const allData = await request.json();
      document.getElementById('date').innerHTML = `Date - ${allData[0].date}`;
      document.getElementById('temp').innerHTML = `Temp - ${allData[0].temp}`;
      document.getElementById('content').innerHTML = `How i feel - ${allData[0].feelings}`;
  
    }catch(error){
      console.log("error", error);
    }
  }

/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth() + 1)+'.'+ d.getDate()+'.'+ d.getFullYear();