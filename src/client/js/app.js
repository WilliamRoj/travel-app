  
  app.get('/all', sendData);


  //   GET
    function sendData(req, res){
        res.send(projectData);
    }
  
  
    //post Route
  
  app.post('/add', data);
      function data(req, res){
        // console.log(res.body);
          newEntry = {
            latitude: req.body.latitude,
            longitude: req.body.longitude,
            country: req.body.country
          }
      projectData = newEntry;
    }