import React, { useState, useEffect } from "react";
import "./locationStyles.css";
import Homepage from "./Homepage";
import WeatherDay from "./WeatherDay";

const HandleLocation = () => {
  const apikey = "UOxt5mUd7se5vLS3Il939GY5HoIYy9ba";

  const [locationKey, setLocationKey] = useState("");
  const [weatherInfo, setWeatherInfo] = useState();
  const [location, setLocation] = useState("");

  const iconNum = (num) => {
    const stringNum = num + "";
    const stringLen = stringNum.length;

    if (stringLen === 1) {
      return "0" + stringNum;
    } else {
      return stringNum;
    }
  };

  const fahrenheitToCelsius = (fahrenheit) =>
    (((fahrenheit - 32) * 5) / 9).toFixed(2);

  useEffect(() => {
    if (locationKey) {
      fetch(
        `http://dataservice.accuweather.com/forecasts/v1/daily/1day/${locationKey}?apikey=${apikey}`
      )
        .then((res) => res.json())
        .then((res) => {
          setWeatherInfo(
            res.DailyForecasts.map((df) => {
              return {
                max: fahrenheitToCelsius(df.Temperature.Maximum.Value),
                weatherType: df.Day.IconPhrase,
                weatherKey: iconNum(df.Day.Icon),
              };
            })
          );
        });
    }
  }, [locationKey]);

  return (
    <div>
      <Homepage
        onCityFound={(cityInfo) => {
         setLocationKey(cityInfo.loc_key);
          setLocation(cityInfo.name + ", " + cityInfo.country);
        }}
      />
      <div className="main">
        {!!weatherInfo &&
          weatherInfo.map((i, index) => (
            <div className="info" key={index}>
              <h1 className="header">{location}</h1>
              <WeatherDay
                max={i.max}
                weatherType={i.weatherType}
                weatherKey={i.weatherKey}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default HandleLocation;
