const apikey = "286abe3fbaaf7cd83c31cc4aca404ae7"
const units = "metric"
const CityElement = document.querySelector('[data-="City"]')
const loadingElement = document.querySelector('[data-="loading"]')
const CityOutputElement = document.querySelector('[data-="CityOutput"]')
const TemperatureElement =  document.querySelector('[data-="temperature"]')
const IconElement = document.querySelector('[data-="icon"]')
const HumidityElement = document.querySelector('[data-="humidity"]')
const DescriptionElement = document.querySelector('[data-="descrition"]')
const SpeedElement = document.querySelector('[data-="speed"]')

document.querySelector('[data-="Location"]').addEventListener("click", () => {
    clear()
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            let url3 = "https://api.openweathermap.org/data/2.5/onecall?lat=" + Math.floor(position.coords.latitude) 
            + "&lon=" + Math.floor(position.coords.longitude) + "&appid=" + apikey + "&units=" + units

            fetch(url3).then((responce) => responce.json())
            .then((data) => displayWeather2(data))
        })
    } else {
        loadingElement.classList.replace('loading', 'output');
    document.querySelector('[data-="error"]').innerHTML = "Geolocation is not supported by this browser.";
}})

CityElement.addEventListener("keyup", (event) => {
    if (event.key == "Enter") {
        clear()
        fetchWeather()
        CityElement.value = ""
}})

const fetchWeather = () => {
    let url = "https://api.openweathermap.org/data/2.5/weather?q=" 
    + CityElement.value + "&appid=" + apikey + "&units=" + units
    
    fetch(url).then((responce) => responce.json())
       .then((data) => displayWeather(data))
}
const displayWeather = (data) => {
    const {name}  = data;
    const {icon, description} = data.weather[0];
    const {temp, humidity} = data.main;
    const {speed} = data.wind;
    loadingElement.classList.replace('loading', 'output')
    CityOutputElement.innerText = name
    TemperatureElement.innerText = "Tempurature: " + temp + " °C"
    IconElement.src = "https://openweathermap.org/img/wn/" + icon + ".png"
    HumidityElement.innerText = "Humidity: " + humidity + "%"
    DescriptionElement.innerText  = "Description: " + description
    SpeedElement.innerText = "Wind Speed: " + speed + " mph"
}
const displayWeather2 = (data) => {
    const name  = data.timezone;
    const {icon, description} = data.current.weather[0];
    const temp = data.current.temp;
    const humidity = data.current.humidity
    const speed = data.current.wind_speed;
    loadingElement.classList.replace('loading', 'output')
    CityOutputElement.innerText = name
    TemperatureElement.innerText = "Tempurature: " + temp + " °C"
    IconElement.src = "https://openweathermap.org/img/wn/" + icon + ".png"
    HumidityElement.innerText = "Humidity: " + humidity + "%"
    DescriptionElement.innerText  = "Description: " + description
    SpeedElement.innerText = "Wind Speed: " + speed + " mph"
}

const clear = () => {
    loadingElement.classList.replace('output', 'loading')
    CityOutputElement.innerText = ""
    TemperatureElement.innerText = ""
    IconElement.src = ""
    HumidityElement.innerText = ""
    DescriptionElement.innerText  = ""
    SpeedElement.innerText = ""
}