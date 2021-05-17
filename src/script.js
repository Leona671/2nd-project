function formatDate(timestamp) {
  let now = new Date(timestamp);
  let time = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Sunday",
  ];
  let day = days[now.getDay()];
  return ` ${day} ${time}`;
}

function forecastDate(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return days[day];
}
function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
            <div class="col-2">
              <div class="forecast-date">
              ${forecastDate(forecastDay.dt)}
            </div>
              <img src="http://openweathermap.org/img/wn/${
                forecastDay.weather[0].icon
              }@2x.png" alt="">
              <div class="max-min-temp">
                <span class="max-temp">
                  ${Math.round(forecastDay.temp.max)}°
                </span> 
                <span class="min-temp">
                  ${Math.round(forecastDay.temp.min)}°
                </span>
            </div>
            </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "3cf67e2364f74bd0e36b75c947252e39";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}
function displayTemp(response) {
  console.log(response.data);
  let tempElement = document.querySelector("#curTemp");
  let cityName = document.querySelector("#curPlace");
  let desElement = document.querySelector("#des");
  let humidElement = document.querySelector("#humid");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#curDate");
  let iconElement = document.querySelector("#icon");

  celTemp = response.data.main.temp;
  tempElement.innerHTML = `${Math.round(response.data.main.temp)} ° F`;
  cityName.innerHTML = response.data.name;
  desElement.innerHTML = `How it looks: ${response.data.weather[0].description}`;
  humidElement.innerHTML = `Humidity: ${response.data.main.humidity} %`;
  windElement.innerHTML = `Wind Speed: ${Math.round(
    response.data.wind.speed
  )} m/h`;
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  getForecast(response.data.coord);
}
function search(city) {
  let apiKey = "3cf67e2364f74bd0e36b75c947252e39";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemp);
}
function inputSearch(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#search-city");
  search(cityInputElement.value);
}

let celTemp = null;
let form = document.querySelector("#search-form");
form.addEventListener("submit", inputSearch);

search("Guam");
