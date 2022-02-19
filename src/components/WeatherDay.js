import React from "react";
import "./weatherDay.css";

const WeatherDay = ({ max, weatherType, weatherKey }) => {
  return (
    <div className="weather_main">
      <div className="max_temp">{max}&deg;C</div>
      <div className="icon">
        <img
          alt="weatherIcon"
          src={`https://developer.accuweather.com/sites/default/files/${weatherKey}-s.png`}
        />
      </div>
      <div className="weather_type">{weatherType}</div>
    </div>
  );
};

export default WeatherDay;