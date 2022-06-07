// new page weather -Done
// 2 Input bar lat/long
// When user hits enter/return
// Make api call to get weather for lat/long
// Current temp
// above freezing have a nice class of water
// below iceblock img
// 286abe3fbaaf7cd83c31cc4aca404ae7
// https://api.openweathermap.org/data/2.5/weather?q=Denver&appid=286abe3fbaaf7cd83c31cc4aca404ae7&units=metric
const apikey = "286abe3fbaaf7cd83c31cc4aca404ae7"
const units = "metric"

document.querySelector('[data-="Location"]').addEventListener("click", () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            let url3 = "https://api.openweathermap.org/data/2.5/onecall?lat=" + Math.floor(position.coords.latitude) + "&lon=" + Math.floor(position.coords.longitude) + "&appid=" + apikey + "&units=" + units
            console.log(url3)
            fetch(url3).then((responce) => responce.json())
            .then((data) => displayWeather2(data))
        })
    } else { 
    document.querySelector('[data-="error"]').innerHTML = "Geolocation is not supported by this browser.";
}})

document.querySelector('[data-="City"]').addEventListener("keyup", (event) => {
    if (event.key == "Enter") {fetchWeather()}
})

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
    document.querySelector('[data-="CityOutput"]').innerText = name
    document.querySelector('[data-="tempurature"]').innerText = "Tempurature: " + temp + " °C"
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
    console.log(name,icon,description,temp,humidity, speed)
    document.querySelector('[data-="CityOutput"]').innerText = name
    document.querySelector('[data-="tempurature"]').innerText = "Tempurature: " + temp + " °C"
    document.querySelector('[data-="icon"]').src = "https://openweathermap.org/img/wn/" + icon + ".png"
    document.querySelector('[data-="humidity"]').innerText = "Humidity: " + humidity + "%"
    document.querySelector('[data-="descrition"]').innerText  = "Description: " + description
    document.querySelector('[data-="speed"]').innerText = "Wind Speed: " + speed + " mph"
}