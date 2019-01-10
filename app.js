//B asic required imports for NodeJS
var express = require('express');
var bodyparser = require('body-parser');
var cors = require('cors');

//Create an instance of the files required
var app = module.exports = express();
app.use(bodyparser.json());
app.use(cors());

//GET call to return jason that  formats natural and unit states
app.get('/:dateval', (req, res, next) => {
    
    //get request data for date
var dateval = req.params.dateval;
var dateformatoption = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
};
if(isNaN(dateval)){
    var naturalDate = new Date(dateval);
    naturalDate = naturalDate.toLocaleDateString("en-us", dateformatoption);
    var unixDate = new Date(dateval).getTime()/1000;
} else {
    var unixDate = dateval;
    var naturalDate = new Date(dateval * 1000);
    naturalDate = naturalDate.toLocaleDateString("en-us", dateformatoption);
}
     res.json({unix: unixDate, natural: naturalDate});
});


app.listen(3001, () => {
    console.log(`Timestamp Server started on port 3001`);
});