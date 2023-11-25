function displayTemperature(response) {
    let temperatureElement = document.querySelector("#temperature");
    let temperature = Math.round(response.data.temperature.current);
    document.querySelector(
        ".current-temperature-value"
    ).innerText = `${temperature}`;
}


function search(event) {
    event.preventDefault();
    let searchInputElement = document.querySelector("#search-input");
    let cityElement = document.querySelector("#city");
    cityElement.innerHTML = capitalizeFirstLetter(searchInputElement.value);

    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${searchInputElement.value}&key=0cb5bbfeo59e4297fc00a8560ft0af03&units=metric`;

    axios.get(apiUrl).then(function (response) {
        displayTemperature(response);
    });
}
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


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

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

let currentDateELement = document.querySelector("#current-date");
let currentDate = new Date();

currentDateELement.innerHTML = formatDate(currentDate);


