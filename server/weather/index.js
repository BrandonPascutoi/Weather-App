// Dependencies.
const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");

// Function that fetches weather data from API.
const fetchWeatherData = async (location) => {
    try {
      // This uses a geocoding API to convert a location (provided by user on client side) into co-ordinates.
      const coordsUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=5&appid=${process.env.API_KEY}`;
      const coordsData = await fetch(coordsUrl);
      // converts data to JSON.
      const coordsDataJson = await coordsData.json();
      console.log(coordsDataJson);
      let coords = {
        lon: coordsDataJson[0].lon,
        lat: coordsDataJson[0].lat
      };
      // This converts the previously acquired co-ordinates and sends them to the API. The API then returns the weather data.
      const weatherDataUrl = `http://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${process.env.API_KEY}&units=metric`; 
      const weatherData = await fetch(weatherDataUrl);
      // Converts data to JSON.
      const weatherDataJson = await weatherData.json();
      // If successful, the data is returned.
      return weatherDataJson;
    } catch (err) {
      // If an invalid location is entered, an error is returned.
      return {Error: err.message};
    }
}

// Test Route
router.get("/", (req, res) => {
    res.json({success: "Hello Weather!"});
})
  
// Route to retrieve data. 'searchtext' is a placeholder and can be replaced with a location. Example if running server locally (paste in browser for demonstration): http://localhost:3000/weather/dublin
router.get('/:searchtext', async (req, res) => {
    const searchtext = req.params.searchtext;
    const data = await fetchWeatherData(searchtext);
    res.json(data);
});

// Route for post request.
router.post('/', async (req, res) => {
    const searchtext = req.body.searchtext
    const data = await fetchWeatherData(searchtext)
    res.json(data);
})

module.exports = router;