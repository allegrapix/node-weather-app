console.log('Client side js file is loaded');

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const errorMsg = document.querySelector('.error');
const locationPlaceholder = document.querySelector('.location');
const weatherInfo = document.querySelector('.weather-info')
const weatherCard = document.querySelector('.card-weather');
const temperature = document.querySelector('.temperature');
const info = document.querySelector('.info');
weatherCard.style.display = "none";

weatherForm.addEventListener('submit', (e) => {
  weatherCard.style.display = "flex";
  e.preventDefault();
  const location = search.value;
  if(location) {
    fetch(`/weather?address=${location}`)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      if(data.error) {
        showError();
        errorMsg.innerHTML =  data.error;
      } else {
        showWeather();
        locationPlaceholder.innerHTML = data.location;
        const tempRound = Math.round(data.forecast.currently.temperature)
        temperature.innerHTML = `${tempRound}°C`;
        info.innerHTML = data.forecast.daily.data[0].summary;

      }
    });   
  } else {
    showError();
    errorMsg.innerHTML = 'You must provide a location';
  }
});

const showError = () => {
  errorMsg.style.display = "flex";
  locationPlaceholder.style.display = "none";
  weatherInfo.style.display = "none";
}

const showWeather = () => {
  errorMsg.style.display = "none";
  locationPlaceholder.style.display = "flex";
  weatherInfo.style.display = "flex";
}
