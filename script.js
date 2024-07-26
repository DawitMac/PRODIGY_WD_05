const apiKey = '00ce07f1fdd7cfef6ee08816fd8c8f87';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

const locationInput = document.getElementById('locationInput');
const searchButton = document.getElementById('searchButton');
const locationElement = document.getElementById('location');
const temperatureElement = document.getElementById('temperature');
const descriptionElement = document.getElementById('description');
const locationCurrent = document.getElementById('currentLocation');
const tempratureCurrent = document.getElementById('currentTemperature');
const descrioptionCurrent = document.getElementById('currentDescription');
const currentDate = document.getElementById("currentDate");


getCurrentLocationWeather();

  function fetchWeatherByCoordinates(latitude, longitude) {
    const apiFetch = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
    
    fetch(apiFetch)  
      .then(response => response.json())
      .then(data =>{
        const currentDateValue = new Date().toISOString().split('T')[0];
        currentDate.innerHTML = currentDateValue;
        locationCurrent.textContent = data.name;
        tempratureCurrent.textContent = `${Math.round(data.main.temp)}°C`;
        descrioptionCurrent.textContent = data.weather[0].description;
      })
      .catch(error => {
        console.log('Error fetching location data:', error);
      });
  }

  function getCurrentLocationWeather() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          fetchWeatherByCoordinates(latitude ,longitude);
        },
        error => {
          console.log('Error getting current location:', error);
        }
      );
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  }

searchButton.addEventListener('click', ()=>{
    const location = locationInput.value;
    if (location) {
        fetchWeather(location);
    }
});

function fetchWeather(location) {
    const url = `${apiUrl}?q=${location}&appid=${apiKey}&units=metric`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
          const currentDateValue = new Date().toISOString().split('T')[0];
          currentDate.innerHTML = currentDateValue;
            handleWeatherImage(data.main.temp);
            locationCurrent.textContent = data.name;
            tempratureCurrent.textContent = `${Math.round(data.main.temp)}°C`;
            descrioptionCurrent.textContent = data.weather[0].description;
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
}

function handleWeatherImage(weather){

  const image = document.querySelector(".image");
  
   if(weather > 25 ){
    image.src = "images/sun1.png"
   }
   else if(weather > 15 && weather < 26){
    image.src = "images/clouds.png"
   }
   else if(weather > 9 && weather < 16){
    image.src = "images/cloudy.png"
   }
   else if(weather < 10){
    image.src = "images/lighting.png"
   }
}