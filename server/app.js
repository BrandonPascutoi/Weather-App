// These import necessary modules and set some initial variables
require("dotenv").config();
const express = require("express");
const fetch = require("node-fetch");
const rateLimit = require("express-rate-limit");
var cors = require("cors");
const app = express();
const port = 3000;

const limiter = rateLimit({
  windowMs: 1000, // 1 second
  max: 1, // limit each IP to 1 requests per windowMs
});

//  apply to all requests
app.use(limiter);

// Allow CORS from any origin
app.use(cors());

// Routes

// Test route, visit localhost:3000 to confirm it's working
// should show 'Hello World!' in the browser
app.get("/", (req, res) => res.send("Hello World!"));

app.get("/api/search", async (req, res) => {
  try {
    const coordAPI = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=dublin&limit=1&appid=${process.env.API_KEY}`);

    const coordAPIResponse = await coordAPI.json();

    const coordAPIResults = {
      lat: coordAPIResponse[0].lat,
      lon: coordAPIResponse[0].lon
    }

    const weatherDataAPI = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${coordAPIResults.lat}&lon=${coordAPIResults.lon}&appid=${process.env.API_KEY}&units=metric`)

    weatherDataAPIResponse = await weatherDataAPI.json();

    res.send({
      success: true,
      results: weatherDataAPIResponse,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

// This spins up our sever and generates logs for us to use.
// Any console.log statements you use in node for debugging will show up in your
// terminal, not in the browser console!
app.listen(port, () => console.log(`Example app listening on port ${port}!`));