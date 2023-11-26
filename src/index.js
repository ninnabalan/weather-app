//  display temperature
function displayTemperature(response) {
    let temperatureElement = document.querySelector("#temperature");
    let temperature = Math.round(response.data.temperature.current);
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windSpeedElement = document.querySelector("#wind-speed");
    let iconElement = document.querySelector("#icon");
    iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class = "weather-app-icon"/>`;
    document.querySelector(
        ".current-temperature-value"
    ).innerText = `${temperature}`;
    descriptionElement.innerHTML = response.data.condition.description;
    humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
    windSpeedElement.innerHTML = `${response.data.wind.speed}km/h`;
    console.log(response.data.condition.description);
    getForecast(response.data.city
    );
}

// weather by city
function search(city) {
    let cityElement = document.querySelector("#city");
    cityElement.innerHTML = capitalizeFirstLetter(city);

    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=0cb5bbfeo59e4297fc00a8560ft0af03&units=metric`;

    axios.get(apiUrl).then(function (response) {
        displayTemperature(response);
    });
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

//  date
function formatDate(date) {
    let minutes = date.getMinutes();
    let hours = date.getHours();
    let day = date.getDay();

    if (minutes < 10) {
        minutes = `0${minutes}`;
    }

    if (hours < 10) {
        hours = `0${hours}`;
    }

    let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];

    let formattedDay = days[day];
    return `${formattedDay} ${hours}:${minutes}`;
}

let currentDateElement = document.querySelector("#current-date");
let currentDate = new Date();
currentDateElement.innerHTML = formatDate(currentDate);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", function (event) {
    event.preventDefault();
    let searchInputElement = document.querySelector("#search-input");
    search(searchInputElement.value);
});

function formatDate(timestap) {
    let date = new Date(timestap * 1000);
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    return days[date.getDay()];

}

function getForecast(city) {
    let apiKey = "0cb5bbfeo59e4297fc00a8560ft0af03";
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
    axios(apiUrl).then(displayForecast);
}

function displayForecast(response) {
    console.log(response.data);
    let forecastElement = document.querySelector("#forecast");
    let forecastHtml = "";


    response.data.daily.forEach(function (day, index) {
        if (index < 5) {
            forecastHtml = forecastHtml + `
            <div class="row">
                <div class="col-2">
                    <div class="weather-forecast-date">${formatDate(day.time)}</div>
                    <div> 
                        <img src="${day.condition.icon_url}" class="weather-forecast-icon"/>
                    </div>
                    <div class="weather-forecast-temperatures">
                        <span class="weather-forecast-temperature-max">${Math.round(day.temperature.maximum)}°</span>
                        <span class="weather-forecast-temperature-min">${Math.round(day.temperature.minimum)}°</span>
                    </div>
                </div>
            </div>
        `;
        }
    });

    forecastElement.innerHTML = forecastHtml;



}








let defaultCity = "Vienna";
search(defaultCity);

