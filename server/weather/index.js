const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");

const fetchWeatherCoords = async (location) => {
    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=5&appid=${process.env.API_KEY}`;
    try {
      const data = await fetch(url);
      const dataJson = await data.json();
      return await {
        lon: dataJson[0].lon,
        lat: dataJson[0].lat
      };
    } catch {
      console.log(1);
    }
}
  
const fetchWeatherData = async (location) => {
    const coords = await fetchWeatherCoords(location)
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${process.env.API_KEY}&units=metric`;
    try {
      const data = await fetch(url);
      const dataJson = await data.json();
      return dataJson
    } catch {
      console.log(2);
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