const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");

const fetchWeatherData = async (location) => {
    try {
      const coordsUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=5&appid=${process.env.API_KEY}`;
      const coordsData = await fetch(coordsUrl);
      const coordsDataJson = await coordsData.json();
      let coords = {
        lon: coordsDataJson[0].lon,
        lat: coordsDataJson[0].lat
      };
      const weatherDataUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${process.env.API_KEY}&units=metric`; 
      const weatherData = await fetch(weatherDataUrl);
      const weatherDataJson = await weatherData.json();
      return weatherDataJson;
    } catch (err) {
      return {Error: 'invalid location'};
    }
}

router.get("/", (req, res) => {
    res.json({success: "Hello Weather!"});
})
  
router.get('/:searchtext', async (req, res) => {
    const searchtext = req.params.searchtext;
    const data = await fetchWeatherData(searchtext);
    res.json(data);
});
  
router.post('/', async (req, res) => {
    const searchtext = req.body.searchtext
    const data = await fetchWeatherData(searchtext)
    res.json(data);
})

module.exports = router;