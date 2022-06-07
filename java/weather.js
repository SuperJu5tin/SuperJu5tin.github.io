const apikey = "286abe3fbaaf7cd83c31cc4aca404ae7"
const units = "metric"
const loading = document.querySelector('[data-="loading"]')
const CityOutput = document.querySelector('[data-="CityOutput"]')
const temperature = document.querySelector('[data-="temperature"]')
const icon1 = document.querySelector('[data-="icon"]')
const humidity1 = document.querySelector('[data-="humidity"]')
const description1 = document.querySelector('[data-="descrition"]')
const speed1 = document.querySelector('[data-="speed"]')



document.querySelector('[data-="Location"]').addEventListener("click", () => {
    loading.classList.replace('output', 'loading')
    CityOutput.innerText = ""
    temperature.innerText = ""
    icon1.src = ""
    humidity1.innerText = ""
    description1.innerText  = ""
    speed1.innerText = ""
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            let url3 = "https://api.openweathermap.org/data/2.5/onecall?lat=" + Math.floor(position.coords.latitude) + "&lon=" + Math.floor(position.coords.longitude) + "&appid=" + apikey + "&units=" + units
            fetch(url3).then((responce) => responce.json())
            .then((data) => displayWeather2(data))
        })
    } else {
        loading.classList.replace('loading', 'output');
    document.querySelector('[data-="error"]').innerHTML = "Geolocation is not supported by this browser.";
}})

document.querySelector('[data-="City"]').addEventListener("keyup", (event) => {
    if (event.key == "Enter") {
        loading.classList.replace('output', 'loading')
        CityOutput.innerText = ""
        temperature.innerText = ""
        icon1.src = ""
        humidity1.innerText = ""
        description1.innerText  = ""
        speed1.innerText = ""
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
    loading.classList.replace('loading', 'output')
    CityOutput.innerText = name
    temperature.innerText = "Tempurature: " + temp + " °C"
    icon1.src = "https://openweathermap.org/img/wn/" + icon + ".png"
    humidity1.innerText = "Humidity: " + humidity + "%"
    description1.innerText  = "Description: " + description
    speed1.innerText = "Wind Speed: " + speed + " mph"
}
const displayWeather2 = (data) => {
    const name  = data.timezone;
    const {icon, description} = data.current.weather[0];
    const temp = data.current.temp;
    const humidity = data.current.humidity
    const speed = data.current.wind_speed;
    loading.classList.replace('loading', 'output')
    CityOutput.innerText = name
    temperature.innerText = "Tempurature: " + temp + " °C"
    icon1.src = "https://openweathermap.org/img/wn/" + icon + ".png"
    humidity1.innerText = "Humidity: " + humidity + "%"
    description1.innerText  = "Description: " + description
    speed1.innerText = "Wind Speed: " + speed + " mph"
}