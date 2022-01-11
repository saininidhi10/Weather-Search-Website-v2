var express = require('express');

var router = express.Router();
const axios = require('axios').default;
const GOOGLE_API_KEY = "AIzaSyBbiLq0UZ-44e33kuXy9k6qDRcaloIUDHU";
const API_KEY = 'FTSNQ16Zr6bjMxZGVQIiwSmhHgzpmZAF';
// const API_KEY = 'kiJKS7r7r7c3YTbhP7OReSjmNeS7ZSf1';

router.get('/',function(req,res){
    var address = req.query.address;
    var lat_long = req.query.latlong;
    if(lat_long === '') {
        axios.get("https://maps.googleapis.com/maps/api/geocode/json?address="+address+"&key="+GOOGLE_API_KEY)
        .then(function(response){
            lat_long = response.data.results[0].geometry.location.lat + ',' + response.data.results[0].geometry.location.lng;
            var url = 'https://api.tomorrow.io/v4/timelines?location='+lat_long+'&fields=temperature,temperatureApparent,temperatureMin,temperatureMax,windSpeed,windDirection,humidity,pressureSeaLevel,uvIndex,weatherCode,precipitationProbability,precipitationIntensity,precipitationType,visibility,cloudCover,sunriseTime,sunsetTime&timesteps=current,1d,1h&units=imperial&timezone=America/Los_Angeles&apikey='+API_KEY;
            return axios.get(url);
        })
        .then(function(response){
            var results = response.data;
            var result_curr = results.data.timelines[0].intervals[0].values;
            var result_1d = results.data.timelines[1].intervals;
            var results_1h = results.data.timelines[2].intervals;
            var final_result = {};
            final_result.curr = result_curr;
            final_result.days = result_1d;
            final_result.hours = results_1h;
            final_result.latlon = lat_long;

            res.json(final_result)
        })
        .catch(function(error){
            res.json({});
        })
    }
    else{
        var url = 'https://api.tomorrow.io/v4/timelines?location='+lat_long+'&fields=temperature,temperatureApparent,temperatureMin,temperatureMax,windSpeed,windDirection,humidity,pressureSeaLevel,uvIndex,weatherCode,precipitationProbability,precipitationIntensity,precipitationType,visibility,cloudCover,sunriseTime,sunsetTime&timesteps=current,1d,1h&units=imperial&timezone=America/Los_Angeles&apikey='+API_KEY;
        axios.get(url)
        .then(function(response){
            var results = response.data;
            var result_curr = results.data.timelines[0].intervals[0].values;
            var result_1d = results.data.timelines[1].intervals;
            var results_1h = results.data.timelines[2].intervals;
            var final_result = {};
            final_result.curr = result_curr;
            final_result.days = result_1d;
            final_result.hours = results_1h;
            final_result.latlon = lat_long;
            res.json(final_result)
        })
        .catch(function(error){
            res.json({})
        })
    }
});

module.exports = router;