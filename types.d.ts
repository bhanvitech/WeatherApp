/**
 * TypeScript Type Definitions for Weather App
 * 
 * This file provides TypeScript type definitions for all components,
 * props, and data structures used in the Weather Application.
 * 
 * These types can be used for:
 * - TypeScript migration
 * - Better IDE autocomplete
 * - Documentation reference
 * - Type checking with JSDoc
 * 
 * @file types.d.ts
 * @author Weather App Team
 * @see {@link ./API_DOCUMENTATION.md|Full API Documentation}
 */

/**
 * Weather information data structure
 * Contains all weather-related information for a specific location
 */
export interface WeatherInfo {
  /** Current temperature in Celsius */
  temp: number;
  
  /** Relative humidity percentage (0-100) */
  humidity: number;
  
  /** Atmospheric pressure in hectopascals (hPa) */
  pressure: number;
  
  /** Current weather condition (e.g., "Clear", "Clouds", "Haze", "Mist") */
  weathermood: string;
  
  /** City name */
  name: string;
  
  /** Wind speed in meters per second (m/s) */
  speed: number;
  
  /** Two-letter country code (e.g., "US", "UK", "IN") */
  country: string;
  
  /** Sunset time as Unix timestamp in seconds */
  sunset: number;
}

/**
 * Props for the Weathercard component
 * All properties are required for proper display
 */
export interface WeathercardProps {
  /** Current temperature in Celsius */
  temp: number;
  
  /** Relative humidity percentage (0-100) */
  humidity: number;
  
  /** Atmospheric pressure in hectopascals (hPa) */
  pressure: number;
  
  /** Current weather condition (e.g., "Clear", "Clouds", "Haze", "Mist") */
  weathermood: string;
  
  /** City name */
  name: string;
  
  /** Wind speed in meters per second (m/s) */
  speed: number;
  
  /** Two-letter country code (e.g., "US", "UK", "IN") */
  country: string;
  
  /** Sunset time as Unix timestamp in seconds */
  sunset: number;
}

/**
 * Props for the Temp component
 * This component doesn't accept any props
 */
export interface TempProps {}

/**
 * Props for the App component
 * This component doesn't accept any props
 */
export interface AppProps {}

/**
 * OpenWeatherMap API response structure
 * This is the raw response from the OpenWeatherMap API
 * 
 * @see {@link https://openweathermap.org/current|OpenWeatherMap API Documentation}
 */
export interface OpenWeatherMapResponse {
  /** Geographical coordinates of the location */
  coord: {
    /** Longitude */
    lon: number;
    /** Latitude */
    lat: number;
  };
  
  /** Weather condition information (array of conditions) */
  weather: Array<{
    /** Weather condition id */
    id: number;
    /** Group of weather parameters (Rain, Snow, Clouds, etc.) */
    main: string;
    /** Weather condition description */
    description: string;
    /** Weather icon id */
    icon: string;
  }>;
  
  /** Internal parameter */
  base: string;
  
  /** Main weather parameters */
  main: {
    /** Temperature in Celsius (when units=metric) */
    temp: number;
    /** Temperature feels like in Celsius */
    feels_like: number;
    /** Minimum temperature at the moment */
    temp_min: number;
    /** Maximum temperature at the moment */
    temp_max: number;
    /** Atmospheric pressure in hPa */
    pressure: number;
    /** Humidity percentage */
    humidity: number;
    /** Atmospheric pressure on sea level (hPa) */
    sea_level?: number;
    /** Atmospheric pressure on ground level (hPa) */
    grnd_level?: number;
  };
  
  /** Visibility in meters (max 10km) */
  visibility: number;
  
  /** Wind information */
  wind: {
    /** Wind speed in m/s (when units=metric) */
    speed: number;
    /** Wind direction in degrees */
    deg: number;
    /** Wind gust speed in m/s */
    gust?: number;
  };
  
  /** Cloudiness information */
  clouds: {
    /** Cloudiness percentage */
    all: number;
  };
  
  /** Rain information (if available) */
  rain?: {
    /** Rain volume for last 1 hour in mm */
    '1h'?: number;
    /** Rain volume for last 3 hours in mm */
    '3h'?: number;
  };
  
  /** Snow information (if available) */
  snow?: {
    /** Snow volume for last 1 hour in mm */
    '1h'?: number;
    /** Snow volume for last 3 hours in mm */
    '3h'?: number;
  };
  
  /** Time of data calculation (Unix timestamp UTC) */
  dt: number;
  
  /** System information */
  sys: {
    /** Internal parameter */
    type: number;
    /** Internal parameter */
    id: number;
    /** Country code (e.g., "US", "UK", "IN") */
    country: string;
    /** Sunrise time (Unix timestamp UTC) */
    sunrise: number;
    /** Sunset time (Unix timestamp UTC) */
    sunset: number;
  };
  
  /** Shift in seconds from UTC */
  timezone: number;
  
  /** City ID */
  id: number;
  
  /** City name */
  name: string;
  
  /** Internal parameter (HTTP status code) */
  cod: number | string;
}

/**
 * OpenWeatherMap API error response
 */
export interface OpenWeatherMapErrorResponse {
  /** HTTP status code as string */
  cod: string;
  /** Error message */
  message: string;
}

/**
 * Weather icon class names used by Weather Icons library
 * 
 * @see {@link https://erikflowers.github.io/weather-icons/|Weather Icons Documentation}
 */
export type WeatherIconClass =
  | 'wi-day-sunny'
  | 'wi-day-cloudy'
  | 'wi-fog'
  | 'wi-dust'
  | 'wi-rain'
  | 'wi-snow'
  | 'wi-thunderstorm'
  | 'wi-windy'
  | 'wi-night-clear'
  | 'wi-night-cloudy';

/**
 * Weather condition types from OpenWeatherMap API
 */
export type WeatherCondition =
  | 'Clear'
  | 'Clouds'
  | 'Rain'
  | 'Drizzle'
  | 'Thunderstorm'
  | 'Snow'
  | 'Mist'
  | 'Smoke'
  | 'Haze'
  | 'Dust'
  | 'Fog'
  | 'Sand'
  | 'Ash'
  | 'Squall'
  | 'Tornado';

/**
 * Temperature units supported by OpenWeatherMap API
 */
export type TemperatureUnit =
  | 'metric'    // Celsius
  | 'imperial'  // Fahrenheit
  | 'standard'; // Kelvin

/**
 * API request configuration for weather data fetching
 */
export interface WeatherAPIConfig {
  /** City name (e.g., "London", "New York") */
  city: string;
  
  /** API key for OpenWeatherMap */
  apiKey: string;
  
  /** Temperature unit (default: 'metric') */
  units?: TemperatureUnit;
  
  /** Language code for response (e.g., 'en', 'es', 'fr') */
  lang?: string;
}

/**
 * State for the Temp component
 */
export interface TempState {
  /** Current search input value (city name) */
  searchValue: string;
  
  /** Weather information object */
  tempInfo: Partial<WeatherInfo>;
}

/**
 * State for the Weathercard component
 */
export interface WeathercardState {
  /** CSS class name for weather icon */
  weatherState: string;
}

/**
 * Function type for fetching weather data
 */
export type GetWeatherInfoFunction = () => Promise<void>;

/**
 * Function type for converting Unix timestamp to time string
 */
export type ConvertUnixTimeFunction = (timestamp: number) => string;

/**
 * Function type for mapping weather condition to icon class
 */
export type GetWeatherIconFunction = (condition: WeatherCondition) => WeatherIconClass;

/**
 * React component type for App
 */
export type AppComponent = React.FC<AppProps>;

/**
 * React component type for Temp
 */
export type TempComponent = React.FC<TempProps>;

/**
 * React component type for Weathercard
 */
export type WeathercardComponent = React.FC<WeathercardProps>;

/**
 * Utility type for partial weather info (used during loading states)
 */
export type PartialWeatherInfo = Partial<WeatherInfo>;

/**
 * Extended weather info with additional computed properties
 */
export interface ExtendedWeatherInfo extends WeatherInfo {
  /** Sunset time formatted as string */
  sunsetFormatted?: string;
  
  /** Weather icon class name */
  iconClass?: WeatherIconClass;
  
  /** Full location string (e.g., "London, UK") */
  fullLocation?: string;
}

/**
 * Configuration for API error handling
 */
export interface ErrorHandlingConfig {
  /** Whether to show error messages to user */
  showErrors: boolean;
  
  /** Whether to log errors to console */
  logErrors: boolean;
  
  /** Custom error handler function */
  onError?: (error: Error) => void;
}

/**
 * Loading state for async operations
 */
export interface LoadingState {
  /** Whether data is currently being fetched */
  isLoading: boolean;
  
  /** Error message if fetch failed */
  error: string | null;
  
  /** Whether data has been loaded at least once */
  hasLoaded: boolean;
}

/**
 * Complete component state combining all state properties
 */
export interface CompleteComponentState extends TempState, LoadingState {
  /** Weather data */
  weatherInfo: WeatherInfo | null;
}

// JSDoc type annotations for use in JavaScript files
/**
 * @typedef {Object} WeatherInfo
 * @property {number} temp
 * @property {number} humidity
 * @property {number} pressure
 * @property {string} weathermood
 * @property {string} name
 * @property {number} speed
 * @property {string} country
 * @property {number} sunset
 */

/**
 * @typedef {Object} WeathercardProps
 * @property {number} temp
 * @property {number} humidity
 * @property {number} pressure
 * @property {string} weathermood
 * @property {string} name
 * @property {number} speed
 * @property {string} country
 * @property {number} sunset
 */

export {};
