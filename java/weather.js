const apikey = "286abe3fbaaf7cd83c31cc4aca404ae7"
const units = "metric"

document.querySelector('[data-="Location"]').addEventListener("click", () => {
    clear()
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            let url3 = "https://api.openweathermap.org/data/2.5/onecall?lat=" + Math.floor(position.coords.latitude) + "&lon=" + Math.floor(position.coords.longitude) + "&appid=" + apikey + "&units=" + units
            fetch(url3).then((responce) => responce.json())
            .then((data) => displayWeather2(data))
        })
    } else {
    document.querySelector('[data-="loading"]').classList.replace('loading', 'output');
    document.querySelector('[data-="error"]').innerHTML = "Geolocation is not supported by this browser.";
}})

document.querySelector('[data-="City"]').addEventListener("keyup", (event) => {
    if (event.key == "Enter") {
        clear()
        fetchWeather()
        document.querySelector('[data-="City"]').value = ""
}})

const fetchWeather = () => {
    let url = "https://api.openweathermap.org/data/2.5/weather?q=" + document.querySelector('[data-="City"]').value + "&appid=" + apikey + "&units=" + units
    console.log(url)
    fetch(url).then((responce) => responce.json())
       .then((data) => displayWeather(data))
}
const displayWeather = (data) => {
    const {name}  = data;
    const {icon, description} = data.weather[0];
    const {temp, humidity} = data.main;
    const {speed} = data.wind;
    console.log(name,icon,description,temp,humidity, speed)
    document.querySelector('[data-="loading"]').classList.replace('loading', 'output')
    document.querySelector('[data-="CityOutput"]').innerText = name
    document.querySelector('[data-="temperature"]').innerText = "Tempurature: " + temp + " °C"
    document.querySelector('[data-="icon"]').src = "https://openweathermap.org/img/wn/" + icon + ".png"
    document.querySelector('[data-="humidity"]').innerText = "Humidity: " + humidity + "%"
    document.querySelector('[data-="descrition"]').innerText  = "Description: " + description
    document.querySelector('[data-="speed"]').innerText = "Wind Speed: " + speed + " mph"
}
const displayWeather2 = (data) => {
    const name  = data.timezone;
    const {icon, description} = data.current.weather[0];
    const temp = data.current.temp;
    const humidity = data.current.humidity
    const speed = data.current.wind_speed;
    document.querySelector('[data-="loading"]').classList.replace('loading', 'output')
    document.querySelector('[data-="CityOutput"]').innerText = name
    document.querySelector('[data-="temperature"]').innerText = "Tempurature: " + temp + " °C"
    document.querySelector('[data-="icon"]').src = "https://openweathermap.org/img/wn/" + icon + ".png"
    document.querySelector('[data-="humidity"]').innerText = "Humidity: " + humidity + "%"
    document.querySelector('[data-="descrition"]').innerText  = "Description: " + description
    document.querySelector('[data-="speed"]').innerText = "Wind Speed: " + speed + " mph"
}

const clear = () => {
    document.querySelector('[data-="loading"]').classList.replace('output', 'loading')
    document.querySelector('[data-="CityOutput"]').innerText = ""
    document.querySelector('[data-="temperature"]').innerText = ""
    document.querySelector('[data-="icon"]').src = ""
    document.querySelector('[data-="humidity"]').innerText = ""
    document.querySelector('[data-="descrition"]').innerText  = ""
    document.querySelector('[data-="speed"]').innerText = ""
}