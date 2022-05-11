const inputField = document.querySelector('.input');
const setButton = document.querySelector('.set');
const defaultContainer = document.querySelector('.detail-container');
const resetPageButtons = document.querySelectorAll('.reset');
const navBar = document.querySelector('nav');
const errorContainer = document.querySelector('.error-container');

for (let i = 0; i < resetPageButtons.length; i++) {
  resetPageButtons[i].addEventListener('click', () => {
    navBar.style.transition = 'all 0.5s linear';
    navBar.style.background = '#c0b3bc';
    inputField.value = '';
    errorContainer.style.transition = 'all 0.25s linear';
    errorContainer.style.opacity = '0%'
    errorContainer.style.transition = 'all 0.25s linear';
    errorContainer.style.opacity = '100%'
    setTimeout(() => {
      defaultContainer.style.display= 'flex';
      errorContainer.style.display = 'none';
    }, 0250);
  })
}

setButton.addEventListener('click', () => {
  defaultContainer.style.transition = 'all 0.25s linear';
  defaultContainer.style.opacity = '0%'
  setTimeout(() => {
    defaultContainer.style.display = 'none';
  }, 0250);
  let latitude = 0;
  let longitude = 0;
  fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${inputField.value}&limit=1&appid=7656a35e13a17983aeab7c7c4485a48d`)
    .then(response => {
      if (response.status >= 200 && response.status <= 299) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    }).then((data) => {
        latitude = data[0].lat;
        longitude = data[0].lon;
        console.log(latitude, longitude)
        navBar.style.transition = 'all 0.5s linear';
        navBar.style.background = 'rgb(252, 196, 24)';
      }).catch((error) => {
        navBar.style.transition = 'all 0.5s linear';
        navBar.style.background = 'rgb(239, 154, 154)';
        setTimeout(() => {
          errorContainer.style.display = 'flex';
          errorContainer.style.transition = 'all 5s linear';
          errorContainer.style.opacity = '100%'
        }, 0500);
      })
      /*.then(fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=7656a35e13a17983aeab7c7c4485a48d`)
                .then(response => response.json())
                .then(data => console.log(data)));*/
});