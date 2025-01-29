import React, { useEffect, useState } from "react";

const WeatherBody = () => {
  const API_KEY = import.meta.env.VITE_API_KEY;
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState({});

  const api_key = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

  async function getData() {
    const response = await fetch(api_key);
    const data = await response.json();
    setWeatherData(data);
  }

  let checkData = false;
  let checkLength = false;

  if (Object.keys(weatherData).length == 0) {
    checkLength = false;
  } else {
    checkLength = true;
  }

  if (
    weatherData.cod === "400" ||
    weatherData.cod === "404" ||
    Object.keys(weatherData).length == 0
  ) {
    checkData = false;
  } else {
    checkData = true;
  }

  return (
    <div
      className={` md:w-fit mt-50 mx-4 bg-[#818C78] shadow-md rounded-lg p-4 ${
        checkData ? "h-fit" : "h-1/8"
      } flex flex-col align-center justify-center`}
    >
      <div>
        <input
          onChange={(e) => setCity(e.target.value)}
          className="border-2 border-gray-300 bg-white w-2/3 h-9 px-5  md:pr-16 mb-2 rounded-lg text-sm focus:outline-none mr-4"
          type="text"
          placeholder="Enetr City Name"
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded"
          onClick={getData}
        >
          Search
        </button>
      </div>

      <div>
        {checkData ? (
          <div className=" mt-6 rounded-lg grid flex text-start md:text-start ml-4 md:grid-cols-2 gap-4">
            <h1>
              <span className="font-bold">City : </span>
              {weatherData.name}
            </h1>
            <h1>
              <span className="font-bold">Temp : </span>
              {weatherData.main.temp}<sup>°C</sup>
            </h1>
            <h1>
              <span className="font-bold">Humidity : </span>
              {weatherData.main.humidity}
            </h1>
            <h1>
              <span className="font-bold">Visibility : </span>
              {weatherData.visibility / 1000}/Km
            </h1>
            <h1>
              <span className="font-bold">Wind Speed : </span>{" "}
              {weatherData.wind.speed}/Km/h
            </h1>
          </div>
        ) : checkLength ? (
          <h1 className="text-center mt-2">Enetr a valid city</h1>
        ) : (
          <h1></h1>
        )}
      </div>
    </div>
  );
};

export default WeatherBody;
