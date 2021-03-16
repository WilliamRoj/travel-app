  
 document.getElementById('generate').addEventListener('click', performAction);
    
 function performAction(e){
   const newCity =  document.getElementById('city').value;
   const date = document.getElementById('start').value

// Create a new date instance dynamically with JS
   // let d = new Date();
// let newDate = (d.getMonth() + 1)+'.'+ d.getDate()+'.'+ d.getFullYear();
  await postData("/clientData", {
      city: newCity,
      date: date
    });

    await callServer('/getWeatherbit');
    await callServer('/getPix');

    const gatherData = await callServer('/getData');
    console.log(gatherData);
    
    updateUI();
 }

 // post 
async function postData(url, tData) {
  const response = await fetch(url, {
    method: "POST",
    mode: "cors",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(tData),
  });
}

// Get
const callServer = async (url) => {
  const param = {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const res = await fetch(url, param);
  try {
    const data = await res.json();
    return data;
  } catch {
    console.log(`Error: ${res.statusText}`);
  }
};

// Update the UI
  const updateUI = async () => {
      const request = await fetch('/getData');
      try{
        const allData = await request.json();
        document.getElementById('date').innerHTML = allData.description;
        document.getElementById('temp').innerHTML = allData.temp;
        document.getElementById('content').innerHTML = `How i feel - ${allData.country}`;
    
      }catch(error){
        console.log("error", error);
      }
    }

    export { callServer, updateUI };