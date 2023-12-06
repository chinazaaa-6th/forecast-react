import React, { useState } from "react";
import axios from "axios";
import "./App.css";
function App() {
  const [query, seeQuery] = useState("");
  const [text, showText] = useState(false);
  const [weather, setWeather] = useState({});

  function showDetail(response) {
    showText(true);
    setWeather({
      temperature: response.data.temperature.current,
      wind: response.data.wind.speed,
      humidity: response.data.temperature.humidity,
      description: response.data.condition.description,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    let url = `http://api.shecodes.io/weather/v1/current?query=${query}&key=32fob4398470td4a73fb1e1ffb79ad6a&units=metric`;
    axios.get(url).then(showDetail);
  }
  function setCity(event) {
    seeQuery(event.target.value);
  }
  let form = (
    <form onSubmit={handleSubmit}>
      <input type="search" placeholder="Enter a city..." onChange={setCity} />
      <input type="submit" value="Search" />
    </form>
  );

  if (text) {
    return (
      <div className="App">
        {form}
        <ul>
          <li>Temperature: {Math.round(weather.temperature)}°C</li>
          <li>Description: {weather.description}</li>
          <li>Humidity: {weather.humidity}%</li>
          <li>Wind: {weather.wind}km/h</li>
        </ul>
      </div>
    );
  } else {
    return form;
  }
}
export default App();
