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
  tempElement.innerHTML = Math.round(response.data.main.temp);
  cityName.innerHTML = response.data.name;
  desElement.innerHTML = response.data.weather[0].description;
  humidElement.innerHTML = `Humidity: ${response.data.main.humidity} %`;
  windElement.innerHTML = `Wind Speed: ${Math.round(
    response.data.wind.speed
  )} km/h`;
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
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

function showFahTemp(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#curTemp");
  celLink.classList.remove("active");
  fahLink.classList.add("active");
  let fahTempLink = (celTemp * 9) / 5 + 32;
  tempElement.innerHTML = Math.round(fahTempLink);
}

function showCelTemp(event) {
  event.preventDefault();
  celLink.classList.add("active");
  fahLink.classList.remove("active");
  let tempElement = document.querySelector("#curTemp");
  tempElement.innerHTML = Math.round(celTemp);
}

let celTemp = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", inputSearch);

let fahLink = document.querySelector("#click-fahrenheit");
fahLink.addEventListener("click", showFahTemp);

let celLink = document.querySelector("#click-celcius");
celLink.addEventListener("click", showCelTemp);
search("Guam");
