const form = document.querySelector("#search-weather");
const recentSearches = document.querySelector("#recent-searches");
const todayWeather = document.querySelector("#today-weather");
// decalring the city so it can be use in a later function
const city = document.querySelector("input#city-name").value.trim();
// const forecastBox = $("#forecast");
//today forecast
const mainD = document.querySelector("#main-date");
const mainT = document.querySelector("#main-temp");
const mainW = document.querySelector("#main-wind-speed");
const mainH = document.querySelector("#main-humidity");
const mainU = document.querySelector("#main-uv");
//fiveday forecast

// day1
const day1D = document.querySelector("#date1-date");
const day1I = document.querySelector("#date1-icon");
const day1T = document.querySelector("#date1-temp");
const day1W = document.querySelector("#date1-wind-speed");
const day1H = document.querySelector("#date1-humidity");
// day2
const day2D = document.querySelector("#date2-date");
const day2I = document.querySelector("#date2-icon");
const day2T = document.querySelector("#date2-temp");
const day2W = document.querySelector("#date2-wind-speed");
const day2H = document.querySelector("#date2-humidity");
// day 3
const day3D = document.querySelector("#date3-date");
const day3I = document.querySelector("#date3-icon");
const day3T = document.querySelector("#date3-temp");
const day3W = document.querySelector("#date3-wind-speed");
const day3H = document.querySelector("#date3-humidity");
// day 4
const day4D = document.querySelector("#date4-date");
const day4I = document.querySelector("#date4-icon");
const day4T = document.querySelector("#date4-temp");
const day4W = document.querySelector("#date4-wind-speed");
const day4H = document.querySelector("#date4-humidity");
// day 5
const day5D = document.querySelector("#date5-date");
const day5I = document.querySelector("#date5-icon");
const day5T = document.querySelector("#date5-temp");
const day5W = document.querySelector("#date5-wind-speed");
const day5H = document.querySelector("#date5-humidity");

// not displaying ul till it searched
todayWeather.style.display = "none";

const apikey = "1fc4c93a4d98ec3c9065baaae6e129fe";
// Geo code endpoint

var geoCode = "http://api.openweathermap.org/geo/1.0/direct?";
// q={city name},{state code},{country code}&limit={limit}&appid={API key}

// One call endpoint
var oneCall = "https://api.openweathermap.org/data/2.5/onecall?";
// lat={lat}&lon={lon}&exclude={part}&appid={API key}
function searchWeather(city) {
  const params = new URLSearchParams({ q: city, appid: apikey });
  fetch(geoCode + params)
    .then((response) => response.json())
    .then(function (data) {
      const lat = data[0].lat;
      const lon = data[0].lon;

      const params = new URLSearchParams({
        lat: lat,
        lon: lon,
        units: "imperial",
        appid: apikey,
      });
      return fetch(oneCall + params);
    })
    .then((response) => response.json())
    .then(buildDash);
}
//trying to access the icons from openweathers website
// using the numbers provided from "icon"
function bgColor(icon) {
  debugger;
  if (icon === "01d" || "01n") {
    icon.src = "http://openweathermap.org/img/wn/01d@2x.png";
  }
  if (icon === "02d" || "02n") {
    icon = "http://openweathermap.org/img/wn/02d@2x.png";
  }
  if (icon === "03d" || "03n") {
    icon = "http://openweathermap.org/img/wn/03d@2x.png";
  }
  if (icon === "04d" || "04n") {
    icon = "http://openweathermap.org/img/wn/04d@2x.png";
  }
  if (icon === "09d" || "09n") {
    icon = "http://openweathermap.org/img/wn/09d@2x.png";
  }
  if (icon === "10d" || "10n") {
    icon = "http://openweathermap.org/img/wn/10d@2x.png";
  }
  if (icon === "11d" || "11n") {
    icon = "http://openweathermap.org/img/wn/11d@2x.png";
  }
  alert;
}

//building the dash board
function buildDash(weather) {
  todayWeather.style.display = "block";

  today(weather);
  day1(weather);
  day2(weather);
  day3(weather);
  day4(weather);
  day5(weather);
}

function today(weather) {
  //display date, time, and icon
  let today = new Date().toLocaleDateString();
  let icon = weather.current.weather[0].icon;
  // bgColor(icon);
  mainD.innerHTML = `${city} (${today}) ${icon}`;
  //displaying temp
  var temp = weather.current.temp;
  mainT.innerHTML = `Temp: ${temp}°F`;
  //displaying wind
  var wind = weather.current.wind_speed;
  mainW.innerHTML = `Wind: ${wind} MPH`;

  var humid = weather.current.humidity;
  mainH.innerHTML = `Humidity: ${humid} %`;
  //displaying uvi

  uviColor(weather);
}
function uviColor(weather) {
  var uvi = weather.current.uvi;
  if (uvi < 4) {
    mainU.style.backgroundColor = "green";
  } else if (uvi < 8) {
    uvi.style.backgroundcolor = "yellow";
  } else {
    uvi.style.backgroundcolor = "red";
  }
  mainU.innerHTML = `UV Index: ${uvi} `;
}

function day1(weather) {
  // let date = new Date().setDate(new Date().getDate() + 1);
  // day1D.innerHTML = `${date}`;
  //getting date
  var icon = weather.daily[0].weather[0].icon;
  bgColor(icon);
  // bgColor(icon);
  day1I.innerHTML = `${icon}`;
  //display icon
  var temp = weather.daily[0].temp.day;
  day1T.innerHTML = `Temp: ${temp}°F`;
  //displaying temp
  var wind = weather.daily[0].wind_speed;
  day1W.innerHTML = `Wind: ${wind} MPH`;
  //displaying wind
  var humid = weather.daily[0].humidity;
  day1H.innerHTML = `Humidity: ${humid} %`;
}
function day2(weather) {
  // let today = new Date().toLocaleDateString();
  // day2D.innerHTML = `${today}`;
  var icon = weather.daily[1].weather[0].icon;
  bgColor(icon);
  day2I.innerHTML = `${icon}`;
  // display icon
  var temp = weather.daily[1].temp.day;
  day2T.innerHTML = `Temp: ${temp}°F`;
  //displaying temp
  var wind = weather.daily[1].wind_speed;
  day2W.innerHTML = `Wind: ${wind} MPH`;
  //displaying wind
  var humid = weather.daily[1].humidity;
  day2H.innerHTML = `Humidity: ${humid} %`;
}
function day3(weather) {
  // let today = new Date().toLocaleDateString();
  // day3D.innerHTML = `${today}`;
  var icon = weather.daily[2].weather[0].icon;
  bgColor(icon);
  // display icon
  day3I.innerHTML = `${icon}`;
  var temp = weather.daily[2].temp.day;
  day3T.innerHTML = `Temp: ${temp}°F`;
  //displaying temp
  var wind = weather.daily[2].wind_speed;
  day3W.innerHTML = `Wind: ${wind} MPH`;
  //displaying wind
  var humid = weather.daily[2].humidity;
  day3H.innerHTML = `Humidity: ${humid} %`;
}
function day4(weather) {
  // let today = new Date().toLocaleDateString();
  // day4D.innerHTML = `${today}`;
  var icon = weather.daily[3].weather[0].icon;
  day4I.innerHTML = `${icon}`;
  bgColor(icon);
  var temp = weather.daily[3].temp.day;
  // display icon
  day4T.innerHTML = `Temp: ${temp}°F`;
  //displaying temp
  var wind = weather.daily[3].wind_speed;
  day4W.innerHTML = `Wind: ${wind} MPH`;
  //displaying wind
  var humid = weather.daily[3].humidity;
  day4H.innerHTML = `Humidity: ${humid} %`;
}
function day5(weather) {
  // let today = new Date().toLocaleDateString();
  // day5D.innerHTML = `${today}`;
  var icon = weather.daily[4].weather[0].icon;
  bgColor(icon);
  day5I.innerHTML = `${icon}`;
  //display icon
  var temp = weather.daily[4].temp.day;
  day5T.innerHTML = `Temp: ${temp}°F`;
  //displaying temp
  var wind = weather.daily[4].wind_speed;
  day5W.innerHTML = `Wind: ${wind} MPH`;
  //displaying wind
  var humid = weather.daily[4].humidity;
  day5H.innerHTML = `Humidity: ${humid} %`;
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  // Retrieve the city name from the input#city-name element
  // and we trim off any extra whitespace
  const city = document.querySelector("input#city-name").value.trim();
  searchWeather(city);

  // Fetch weather data
  // Where are we going to source our data
  // What does the api need to find our city
  // populate our weather details
});
recentSearches.addEventListener("click", function (e) {
  const target = e.target;
  if (!target.matches("button")) return;
  // Retrieve the city name from the button.textContent
  // Fetch weather data
  // populate our weather details
});
