import React, { useEffect } from "react";

/**
 * Weathercard Component
 * 
 * A presentational component that displays weather information in a visually
 * appealing card format. Shows temperature, weather conditions, location,
 * and additional meteorological data including sunset time, humidity, pressure,
 * and wind speed.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {number} props.temp - Current temperature in Celsius
 * @param {number} props.humidity - Humidity percentage
 * @param {number} props.pressure - Atmospheric pressure in hPa
 * @param {string} props.weathermood - Weather condition (Clear, Clouds, Haze, Mist)
 * @param {string} props.name - City name
 * @param {number} props.speed - Wind speed in m/s
 * @param {string} props.country - Country code (e.g., "IN", "US", "UK")
 * @param {number} props.sunset - Sunset time as Unix timestamp (seconds)
 * 
 * @returns {React.ReactElement} Weather information card
 * 
 * @example
 * // Basic usage
 * <Weathercard
 *   temp={25}
 *   humidity={60}
 *   pressure={1013}
 *   weathermood="Clear"
 *   name="London"
 *   speed={5.5}
 *   country="UK"
 *   sunset={1699200000}
 * />
 * 
 * @example
 * // Using spread operator with weather data object
 * const weatherData = {
 *   temp: 28,
 *   humidity: 65,
 *   pressure: 1012,
 *   weathermood: "Clouds",
 *   name: "Mumbai",
 *   speed: 7.2,
 *   country: "IN",
 *   sunset: 1699198800
 * };
 * <Weathercard {...weatherData} />
 */
const Weathercard = ({
  temp,
  humidity,
  pressure,
  weathermood,
  name,
  speed,
  country,
  sunset,
}) => {
  /**
   * State for storing the Weather Icons CSS class name
   * @type {[string, Function]}
   */
  const [weatherState, setWeatheState] = React.useState("");

  /**
   * Effect hook to map weather condition to appropriate Weather Icons CSS class
   * 
   * Weather condition mapping:
   * - "Clouds" -> "wi-day-cloudy"
   * - "Haze" -> "wi-fog"
   * - "Clear" -> "wi-day-sunny"
   * - "Mist" -> "wi-dust"
   * - Default -> "wi-day-sunny"
   * 
   * @see {@link https://erikflowers.github.io/weather-icons/|Weather Icons Documentation}
   */
  useEffect(() => {
    if (weathermood) {
      switch (weathermood) {
        case "Clouds":
          setWeatheState("wi-day-cloudy");
          break;
        case "Haze":
          setWeatheState("wi-fog");
          break;
        case "Clear":
          setWeatheState("wi-day-sunny");
          break;
        case "Mist":
          setWeatheState("wi-dust");
          break;

        default:
          setWeatheState("wi-day-sunny");
          break;
      }
    }
  }, [weathermood]);

  /**
   * Convert Unix timestamp to readable time string
   * 
   * @type {number} sec - Sunset time in seconds (Unix timestamp)
   * @type {Date} date - Date object created from timestamp
   * @type {string} timeStr - Formatted time string in "HH:MM" format
   */
  let sec = sunset;
  let date = new Date(sec * 1000);
  let timeStr = `${date.getHours()}:${date.getMinutes()}`;
  return (
    <>
      <article className="widget">
        <div className="weatherIcon">
          <i className={`wi ${weatherState}`}></i>
        </div>

        <div className="weatherInfo">
          <div className="temperature">
            <span>{temp}&deg;</span>
          </div>

          <div className="description">
            <div className="weatherCondition">{weathermood}</div>
            <div className="place">
              {name}, {country}
            </div>
          </div>
        </div>

        <div className="date"> {new Date().toLocaleString()} </div>

        {/* our 4column section  */}
        <div className="extra-temp">
          <div className="temp-info-minmax">
            <div className="two-sided-section">
              <p>
                <i className={"wi wi-sunset"}></i>
              </p>
              <p className="extra-info-leftside">
                {timeStr} PM <br />
                Sunset
              </p>
            </div>

            <div className="two-sided-section">
              <p>
                <i className={"wi wi-humidity"}></i>
              </p>
              <p className="extra-info-leftside">
                {humidity} <br />
                Humidity
              </p>
            </div>
          </div>

          <div className="weather-extra-info">
            <div className="two-sided-section">
              <p>
                <i className={"wi wi-rain"}></i>
              </p>
              <p className="extra-info-leftside">
                {pressure} <br />
                Pressure
              </p>
            </div>

            <div className="two-sided-section">
              <p>
                <i className={"wi wi-strong-wind"}></i>
              </p>
              <p className="extra-info-leftside">
                {speed} <br />
                Speed
              </p>
            </div>
          </div>
        </div>
      </article>
    </>
  );
};

export default Weathercard;