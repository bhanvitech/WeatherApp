import React, { useState, useEffect } from "react";
import Weathercard from "./weathercard";
import "./style.css";

/**
 * Temp Component
 * 
 * Main weather search component that handles user input, fetches weather data
 * from the OpenWeatherMap API, and displays it using the Weathercard component.
 * 
 * @component
 * @returns {React.ReactElement} Weather search interface with weather card display
 * 
 * @example
 * // Basic usage
 * import Temp from './component/temp';
 * 
 * function App() {
 *   return <Temp />;
 * }
 * 
 * @see {@link https://openweathermap.org/api|OpenWeatherMap API Documentation}
 */
const Temp = () => {
  /**
   * State for storing the city name search value
   * @type {[string, Function]}
   * @default "pune"
   */
  const [searchValue, setSearchValue] = useState("pune");
  
  /**
   * State for storing weather information retrieved from the API
   * @type {[Object, Function]}
   * @property {number} temp - Temperature in Celsius
   * @property {number} humidity - Humidity percentage
   * @property {number} pressure - Atmospheric pressure in hPa
   * @property {string} weathermood - Weather condition (Clear, Clouds, etc.)
   * @property {string} name - City name
   * @property {number} speed - Wind speed in m/s
   * @property {string} country - Country code
   * @property {number} sunset - Sunset time as Unix timestamp
   */
  const [tempInfo, setTempInfo] = useState({});

  /**
   * Fetches weather information from OpenWeatherMap API
   * 
   * This async function makes a GET request to the OpenWeatherMap API
   * using the current searchValue, extracts relevant weather data,
   * and updates the component state.
   * 
   * @async
   * @function getWeatherInfo
   * @returns {Promise<void>}
   * 
   * @throws {Error} Logs error to console if API request fails
   * 
   * @example
   * // Called automatically on component mount
   * useEffect(() => {
   *   getWeatherInfo();
   * }, []);
   * 
   * // Or triggered by user action
   * <button onClick={getWeatherInfo}>Search</button>
   * 
   * API Endpoint: https://api.openweathermap.org/data/2.5/weather
   * Query Parameters:
   * - q: City name
   * - units: metric (for Celsius)
   * - appid: API key
   */
  const getWeatherInfo = async () => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=15502e8723e89baf98e7da6ef2df65ac`;

      let res = await fetch(url);
      let data = await res.json();

      const { temp, humidity, pressure } = data.main;
      const { main: weathermood } = data.weather[0];
      const { name } = data;
      const { speed } = data.wind;
      const { country, sunset } = data.sys;

      const myNewWeatherInfo = {
        temp,
        humidity,
        pressure,
        weathermood,
        name,
        speed,
        country,
        sunset,
      };

      setTempInfo(myNewWeatherInfo);
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * Effect hook to fetch weather data on component mount
   * Automatically fetches weather for the default city (Pune) when component loads
   */
  useEffect(() => {
    getWeatherInfo();
  }, []);

  return (
    <>
      <div className="wrap my-3">
        <div className="search">
          {/* Search input field for city name */}
          <input
            type="search"
            placeholder="search..."
            autoFocus
            id="search"
            className="searchTerm"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />

          {/* Search button to trigger weather data fetch */}
          <button
            className="searchButton"
            type="button"
            onClick={getWeatherInfo}>
            Search
          </button>
        </div>
      </div>

      {/* Weather card component displaying fetched weather data */}
      <Weathercard {...tempInfo} />
    </>
  );
};

export default Temp;