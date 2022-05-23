const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");

const fetchWeather = async (searchtext) => {
    const url = `https://api.openweathermap.org/geo/1.0/direct?q=${searchtext}&limit=1&appid=${process.env.WEATHER_API_KEY}`;
    try {
        const weatherStream = await fetch(url);
        const weatherJson = await weatherStream.json();
        return weatherJson;
    } catch (err) {
        return {Error: err.stack};
    }
}

router.get("/", (req, res) => {
    res.json({success: "Hello Weather!"});
});

router.get("/:searchtext", async (req, res) => {
    const searchtext = req.params.searchtext;
    const data = await fetchWeather(searchtext);
    res.json(data);
});

router.post("")

module.exports = router;