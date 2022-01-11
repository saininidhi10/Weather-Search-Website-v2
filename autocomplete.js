var express = require('express');

var router = express.Router();
const axios = require('axios').default;
const API_KEY = "AIzaSyBbiLq0UZ-44e33kuXy9k6qDRcaloIUDHU";

function getValues(data){
    termsList = [];
    try{
        for(let i=0; i<data.predictions.length; i++) {
            let terms = [data.predictions[i].terms[0].value,data.predictions[i].terms[1].value];
            termsList.push(terms);
        }
    
        return termsList;
    }
    catch{
        return termsList;
    }
}

router.get('/',function(req,res){
    var city = req.query.city;
    axios.get("https://maps.googleapis.com/maps/api/place/autocomplete/json?input="+city.replace(" ","+")+"&types=(cities)&key="+API_KEY)
    .then(function(response){
        autocompleteValues = getValues(response.data);
        res.json(autocompleteValues);
    })
    .catch(function(error){
        res.json([]);
    })
});

module.exports = router;