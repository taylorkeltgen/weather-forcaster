var currentCityEl = document.querySelector("#current-city");
var currentDateEl = document.querySelector("#current-date");
var currentIconEl = document.querySelector("#current-icon");
var cityNameEl = document.querySelector("#search-input");
var formEl = document.querySelector("#search-form");

var tempEl = document.querySelector("#current-temp");
var windEl = document.querySelector("#current-wind");
var humidEl = document.querySelector("#current-humid");
var uvIndexEl = document.querySelector("#current-uv");

var buttonEl = document.querySelector("#search-btn");

// var historyContainer = document.querySelector("#history-container");
// var historyBtnEl = document.createElement("button");
// historyBtnEl.classList = "btn btn-secondary width";

var searchCity = function (event) {
  event.preventDefault();
  var city = cityNameEl.value.trim();
  if (city) {
    cityNameEl.value = "";
    var apiUrl =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&appid=adbd75e9d0a0000592327dc386ddccc8&units=imperial";
    getWeather(apiUrl);
    getForcast(forecast);
  } else {
    alert("Enter a City Name!");
  }
};

var getWeather = function (apiUrl) {
  fetch(apiUrl).then(function (response) {
    // request was successful
    if (response.ok) {
      response.json().then(function (data) {
        console.log(data);
        var currentCityObj = {
          temp: getTemp(data),
          wind: getWind(data),
          humid: getHumidity(data),
          uvIndex: "",
        };
        setCityTitle(data);
        tempEl.textContent = currentCityObj.temp;
        windEl.textContent = currentCityObj.wind;
        humidEl.textContent = currentCityObj.humid;
      });
    } else {
      alert("There was a problem with your request!");
    }
  });
};

// Fetch the 5 day forcast
var getForcast = function (event) {
  var lat = 30.275331284249187;
  var lon = -97.74033054544547;
  var apiUrl =
    "https://api.openweathermap.org/data/2.5/onecall?lat=" +
    lat +
    "&lon=" +
    lon +
    "&exclude=minutely,hourly&appid=adbd75e9d0a0000592327dc386ddccc8&units=imperial";
  //fetch data from API
  fetch(apiUrl).then(function (response) {
    // request was successful
    if (response.ok) {
      response.json().then(function (data) {
        var forecast = data;
        console.log(forecast);
        for (var i = 0; i < 5; i++) {
          var forcastObj = {
            temp: data.daily[i].temp.day,
            wind: data.daily[i].wind_speed,
            humid: data.daily[i].humidity,
          };
          console.log(forcastObj);
        }
        return forcastObj;
      });
    } else {
      alert("There was a problem with your request!");
    }
  });
};

// Set all the searched city info into the title card
var setCityTitle = function (data) {
  currentCityEl.textContent = data.name;
  currentDateEl.textContent = moment().format("l");
  var iconCode = data.weather[0].icon;
  if (currentIconEl)
    $("<img>", {
      src: "http://openweathermap.org/img/wn/" + iconCode + "@2x.png",
      alt: "weather icon",
    }).appendTo(currentIconEl);
};

// Get the current temp of searched city
var getTemp = function (data) {
  var temp = data.main.temp;
  return temp;
};
// Get the current wind speed of searched city
var getWind = function (data) {
  var wind = data.wind.speed;
  return wind;
};
// Get the current humidity of searched city
var getHumidity = function (data) {
  var humid = data.main.humidity;
  return humid;
};

formEl.addEventListener("submit", searchCity);
