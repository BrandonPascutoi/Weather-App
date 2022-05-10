const inputField = document.querySelector('.input')
const setButton = document.querySelector('.set');

setButton.addEventListener('click', () => {
  if (inputField.value != '') {
    let latitude = 0;
    let longitude = 0;
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${inputField.value}&limit=1&appid=7656a35e13a17983aeab7c7c4485a48d`)
      .then(response => response.json())
      .then(data => {
        latitude = data[0].lat;
        longitude = data[0].lon;
        console.log(latitude, longitude)
      }).then(fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=7656a35e13a17983aeab7c7c4485a48d`)
                .then(response => response.json())
                .then(data => console.log(data)));
  }
});