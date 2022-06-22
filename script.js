const inputField = document.querySelector('.input');
const setButton = document.querySelector('.set');
const defaultContainer = document.querySelector('.detail-container');
const resetPageButtons = document.querySelectorAll('.reset');
const navBar = document.querySelector('nav');
const errorContainer = document.querySelector('.error-container');

// All elements for weather details when API call is successful:
const weatherDetailsContainer = document.querySelector('.success-container');
const temperature = document.querySelector('.temperature');
const feelsLiketemperature = document.querySelector('.feels-like-temperature');
const weather = document.querySelector('.weather');
const humidity = document.querySelector('.humidity');
const windSpeed = document.querySelector('.wind-speed');
const weatherConditionsImage = document.querySelector('.weather-image');

/* This makes it so every 'My Weather' button and the 'Try Again' button (when error occurs), resets page back to default state. */
for (let i = 0; i < resetPageButtons.length; i++) {
  resetPageButtons[i].addEventListener('click', () => {
  navBar.style.transition = 'all 0.5s linear';
  navBar.style.background = '#c0b3bc';
  inputField.value = '';
  errorContainer.style.transition = 'all 0.25s linear';
  errorContainer.style.opacity = '0%';
  errorContainer.style.zIndex = '0';
  weatherDetailsContainer.style.transition = 'all 0.25s linear';
  weatherDetailsContainer.style.opacity = '0%';
  weatherDetailsContainer.style.zIndex = '0';
  defaultContainer.style.transition = 'all 0.25s linear';
  defaultContainer.style.opacity = '100%';
  defaultContainer.style.zIndex = '10';
  })
}

/* This gives the 'Set' button functionality. If no value is entered or an invalid entry is submitted, an error page is  transitioned into. If successful the page transitions successfully and the data is returned to the user. */

/* The data is retrieved by making a fetch request to a URL. The URL is the backend server which is hosted using a service. To understand how the data is received, see the JavaScript files in the 'server' folder. */
setButton.addEventListener('click', async () => {
  await fetch(`https://lackadaisical-inconclusive-cyclone.glitch.me/weather/${inputField.value}`).then(async response => {
    let data = await response.json();
    // If an invalid location is entered, the error screen is shown.
    if (data.Error == 'invalid location' || inputField.value === '') {
      defaultContainer.style.transition = 'all 0.25s linear';
      defaultContainer.style.opacity = '0%';
      defaultContainer.style.zIndex = '0';
      navBar.style.transition = 'all 0.5s linear';
      navBar.style.background = 'rgb(239, 154, 154)';
      weatherDetailsContainer.style.transition = 'all 0.25s linear';
      weatherDetailsContainer.style.opacity = '0%';
      weatherDetailsContainer.style.zIndex = '0';
      setTimeout(() => {
        errorContainer.style.transition = 'all 0.25s linear';
        errorContainer.style.opacity = '100%';
        errorContainer.style.zIndex = '10';
      }, 0250);
      navBar.style.transition = 'all 0.5s linear';
      navBar.style.background = 'rgb(239, 154, 154)';
      setTimeout(() => {
        errorContainer.style.transition = 'all 0.25s linear';
        errorContainer.style.opacity = '100%';
        errorContainer.style.zIndex = '10';
      }, 0250);
    } else {
      // If successful, show successful screen with data.
      defaultContainer.style.transition = 'all 0.25s linear';
      defaultContainer.style.opacity = '0%';
      defaultContainer.style.zIndex = '0';
      navBar.style.transition = 'all 0.5s linear';
      navBar.style.background = 'rgb(252, 196, 24)';
      errorContainer.style.transition = 'all 0.25s linear';
      errorContainer.style.opacity = '0%';
      errorContainer.style.zIndex = '0';
      weatherDetailsContainer.style.transition = 'all 0.25s linear';
      weatherDetailsContainer.style.opacity = '100%';
      weatherDetailsContainer.style.zIndex = '10';
      if (data.weather[0].main == 'Clear') {
        weatherConditionsImage.src = 'images/sunny-weather.png';
      } else if (data.weather[0].main == 'Clouds') {
        weatherConditionsImage.src = 'images/cloudy-weather.png';
      } else if (data.weather[0].main == 'Mist') {
        weatherConditionsImage.src = 'images/misty-weather.png';
      } else if (data.weather[0].main == 'Rain') {
        weatherConditionsImage.src = 'images/rainy-weather.png';
      } else if (data.weather[0].main == 'Snow') {
        weatherConditionsImage.src = 'images/snowy-weather.png';
      }
      temperature.innerHTML = `${Math.floor(data.main.temp)}°`;
      feelsLiketemperature.innerHTML = `Feels like: ${Math.floor(data.main.feels_like)}°`;
      weather.innerHTML = `Weather: ${data.weather[0].main}`;
      humidity.innerHTML = `Humidity: ${data.main.humidity}%`;
      windSpeed.innerHTML = `Wing Speed ${data.wind.speed}m/s`;
    }
  });
});