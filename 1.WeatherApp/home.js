
const weather_api_url = "https://api.openweathermap.org/data/2.5/weather";
const api_key = "c405f8e04f211ed3c8b63c62114f905a";

async function handleSearch() {
    const passedCity = document.getElementById("city_input").value
    if (passedCity.trim().length === 0) {
        console.log("Passed city cant be empty");
        return;
    }

    const params = new URLSearchParams(
        {
            "q": passedCity,
            "units": "metric",
            "appid": api_key
        }
    )

    const response = await fetch(`${weather_api_url}?${params.toString()}`);
    const data = await response.json();
    console.log(data);
    const weatherImages = ["clear", "clouds", "drizzle", "mist", "rain", "snow"];
    let weatherMain = data.weather[0].main.toLowerCase() ?? "clear";
    weatherMain = weatherImages.includes(weatherMain) ? weatherMain : "clear";


    document.getElementById("weather-icon").src = `images/${weatherMain}.png`
    document.getElementById("city").textContent = data.name ?? "{NAME}";
    document.getElementById("temp").textContent = (data.main.temp ?? "{TEMP}") + "°c";
    document.getElementById("wind").textContent = (data.wind.speed ?? "{WIND}") + " km/h"
    document.getElementById("humidity").textContent = (data.main.humidity ?? "{HUMIDITY}") + " %"
}