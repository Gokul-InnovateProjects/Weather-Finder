import "./App.css";
import { 
  useCallback, useState, useEffect, useRef } from "react";

const API_KEY="200ad8c5af66fec4b8fda113e3a3399a";
const API_URL="https://api.openweathermap.org/data/2.5/weather";

function App(){
  const [city, setCity] = useState("Namakkal");
  const [weatherData, setWeatherData] = useState(null);
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  },[]);

  const fetchWeather = useCallback(() => {
    fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`)
      .then((res)=>res.json())
      .then((data)=>setWeatherData(data))
      .catch((err)=>console.error("Failed to fetch"));
  },[city]);

  return (
    <div className="App">
      <h1>Weather Finder</h1>
      <div className="container">
        <input
          type="text"
          ref={inputRef}
          value={city}
          onChange={(e)=>setCity(e.target.value)}
        />
        <button onClick={fetchWeather}>Get Weather</button>
        {weatherData && weatherData.main ? (
          <div>
            <h2>{weatherData.name}</h2>
            <p>Temperature: {weatherData.main.temp}°C</p>
            <p>Weather: {weatherData.weather[0].description}</p>
            <p>Wind Speed: {weatherData.wind.speed} m/s</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default App;
