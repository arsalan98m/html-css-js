/**
 * Weather App
 * DONE: Complete getWeatherData() to return json response Promise
 * DONE: Complete searchCity() to get user input and get data using getWeatherData()
 * DONE: Complete showWeatherData() to set the data in the the html file from response
 */

// API_KEY for maps api
let API_KEY = "cfbee5fb86ad2acd8c1912188c7624ca";

/**
 * Retrieve weather data from openweathermap
 * HINT: Use fetch()
 * HINT: URL should look like this:
 * https://api.openweathermap.org/data/2.5/weather?q=detroit&appid=a8e71c9932b20c4ceb0aed183e6a83bb&units=imperial
 */
getWeatherData = (city) => {
  const URL = "https://api.openweathermap.org/data/2.5/weather";
  //HINT: Use template literals to create a url with input and an API key
  const FULL_URL = `${URL}?q=${city}&appid=${API_KEY}&units=imperial`;
  //CODE GOES HERE
  const weatherPromise = fetch(FULL_URL);
  return weatherPromise.then((resonse) => {
    return resonse.json();
  });
};

console.log(getWeatherData("karachi"));

/**
 * Retrieve city input and get the weather data
 * HINT: Use the promise returned from getWeatherData()
 */
searchCity = () => {
  const city = document.getElementById("city-input").value;
  // CODE GOES HERE
  getWeatherData(city)
    .then((data) => {
      showWeatherData(data);
      console.log(data);
    })
    .catch((error) => {
      console.log(error);
    });
};

/**
 * Show the weather data in HTML
 * HINT: make sure to console log the weatherData to see how the data looks like
 */
showWeatherData = (weatherData) => {
  //CODE GOES HERE
  document.getElementById("city-name").innerText = weatherData.name;
  document.getElementById("weather-type").innerText =
    weatherData.weather[0].main;
  document.getElementById("temp").innerText = FtoC(
    weatherData.main.temp
  ).toFixed(2);
  document.getElementById("min-temp").innerText = Math.ceil(
    FtoC(weatherData.main.feels_like)
  );
  document.getElementById("max-temp").innerText = weatherData.main.humidity;
};

function FtoC(F) {
  return ((F - 32) * 5) / 9;
}
