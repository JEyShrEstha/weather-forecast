import React, { useState } from "react";
import "./locationStyles.css";

const Homepage = ({ onCityFound }) => {
  const apikey = "UOxt5mUd7se5vLS3Il939GY5HoIYy9ba";

  const [city, SetCity] = useState("");

  const getLocation = (cityName) => {
    const url = `http://dataservice.accuweather.com/locations/v1/search?apikey=${apikey}&q=${cityName}`;
    fetch(url)
      .then((res) => res.json())
      .then((res) => res.find((loc) => loc.Type === "City"))
      .then((res) =>
        onCityFound({
          name: res.LocalizedName,
          country: res.Country.ID,
          loc_key: res.Key,
        })
      );
    SetCity("");
  };

  return (
    <div className="searchContainer">
      <input
        placeholder="Enter the city name"
        value={city}
        onChange={(e) => SetCity(e.target.value)}
      />
      <button onClick={() => getLocation(city)}>Search</button>
    </div>
  );
};

export default Homepage;
