  
 document.getElementById('generate').addEventListener('click', performAction);
    
 function performAction(e){
   const newCity =  document.getElementById('city').value;
    getGeo(baseURL, newCity, rows, apiKey)
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