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

for (let i = 0; i < resetPageButtons.length; i++) {
  resetPageButtons[i].addEventListener('click', () => {
    navBar.style.transition = 'all 0.5s linear';
    navBar.style.background = '#c0b3bc';
    inputField.value = '';
    errorContainer.style.transition = 'all 0.25s linear';
    errorContainer.style.opacity = '0%';
    errorContainer.style.zIndex = '0';
    defaultContainer.style.transition = 'all 0.25s linear';
    defaultContainer.style.opacity = '100%';
    defaultContainer.style.zIndex = '10';
  })
}

setButton.addEventListener('click', () => {
  defaultContainer.style.transition = 'all 0.25s linear';
  defaultContainer.style.opacity = '0%';
  defaultContainer.style.zIndex = '0';
  fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${inputField.value}&limit=1&appid=7656a35e13a17983aeab7c7c4485a48d`).then(response => {
    if (response.status >= 200 && response.status <= 299) {
      return response.json();
    } else {
      throw Error(response.statusText);
    }
  }).then(data => {
    let coordinates = {
      lon: data[0].lat,
      lat: data[0].lon
    }
    return coordinates;
  }).catch((error) => {
    navBar.style.transition = 'all 0.5s linear';
    navBar.style.background = 'rgb(239, 154, 154)';
    setTimeout(() => {
      errorContainer.style.transition = 'all 0.25s linear';
      errorContainer.style.opacity = '100%';
      errorContainer.style.zIndex = '10';
    }, 0250);
  }).then(coordinates => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=7656a35e13a17983aeab7c7c4485a48d`).then(response => {
      if (response.status >= 200 && response.status <= 299) {
        return response.json();
      } else {
        throw Error(response.statusText);
      };
    }).then(data => {
      navBar.style.transition = 'all 0.5s linear';
      navBar.style.background = 'rgb(252, 196, 24)';
      errorContainer.style.transition = 'all 0.25s linear';
      errorContainer.style.opacity = '0%';
      errorContainer.style.zIndex = '0';
      weatherDetailsContainer.style.transition = 'all 0.25s linear';
      weatherDetailsContainer.style.opacity = '100%';
      weatherDetailsContainer.style.zIndex = '10';
      console.log(data);
      temperature.innerHTML = `${Math.floor(data.main.temp - 283.15)}°`;
      feelsLiketemperature.innerHTML = `Feels like: ${Math.floor(data.main.feels_like - 283.15)}°`;
      weather.innerHTML = `Weather: ${data.weather[0].main}`
    }).catch((error) => {
      navBar.style.transition = 'all 0.5s linear';
      navBar.style.background = 'rgb(239, 154, 154)';
      setTimeout(() => {
        errorContainer.style.transition = 'all 0.25s linear';
        errorContainer.style.opacity = '100%';
        errorContainer.style.zIndex = '10';
      }, 0250);
    })
  })
})