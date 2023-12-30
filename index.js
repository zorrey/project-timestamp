require('dotenv').config();
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});



app.get("/api/:timestamp", (req, res) => {
  let time = req.params.timestamp;
  let newdate = new Date(time);
  if(newdate.getTime() > 0)
   {
   console.log(newdate);
    res.json({unix: newdate.valueOf() , utc: newdate.toUTCString() });
   }
  else{
    if( time.match(/^[0-9]{5,}$/) != null ){
      time = +time
      let unixDate = new Date(time);
      res.json({unix: time , utc: unixDate.toUTCString() });
    }
    else
      res.json({error: "Invalid Date" });}
    
  });

  app.get("/api/", function (req, res) {
    let newdate = new Date();
    res.json({unix: newdate.valueOf() , utc: newdate.toUTCString() });
  });



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
