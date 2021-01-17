

  let baseURL = ''
  let apiKey = '';
//   const newFeelings = document.getElementById('feelings').value;
  
  document.getElementById('generate').addEventListener('click', performAction);
  
  function performAction(e){
    // const newZip =  document.getElementById('zip').value;
    const newFeelings = document.getElementById('feelings').value;
    

        getFeelings('/feelingsData')

        .then(function(data){
            console.log(data);
            postData('/addFeelings', {date:data.date, temp:data.temp, feelings:newFeelings});

        updateUI()
    })

  }
  //   Post example

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
       console.log("error", error);
       // appropriately handle the error
       }
   }

  //////////////////////////
  
  const getFeelings = async (url)=>{
    const res = await fetch(url)
    
    try {
  
      const data = await res.json();
      console.log(data)
      return data;
    }  catch(error) {
      console.log("error", error);
      // appropriately handle the error
    }
  }



// Update the UI
const updateUI = async () => {
    const request = await fetch('/all');
    try{
      const allData = await request.json();
      document.getElementById('date').innerHTML = allData[0].date;
      document.getElementById('temp').innerHTML = allData[0].temp;
      document.getElementById('content').innerHTML = allData[0].feelings;
  
    }catch(error){
      console.log("error", error);
    }
  }



/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();