# Weather App - API Documentation

## Table of Contents
- [Overview](#overview)
- [Installation & Setup](#installation--setup)
- [Components](#components)
  - [App Component](#app-component)
  - [Temp Component](#temp-component)
  - [Weathercard Component](#weathercard-component)
- [API Integration](#api-integration)
- [Functions](#functions)
- [Usage Examples](#usage-examples)
- [Data Structures](#data-structures)

---

## Overview

This is a React-based weather application that allows users to search for weather information in any city worldwide. The application uses the OpenWeatherMap API to fetch real-time weather data and displays it in a visually appealing card format.

**Tech Stack:**
- React 17.0.2
- OpenWeatherMap API
- Weather Icons CSS Library

---

## Installation & Setup

### Prerequisites
- Node.js (v12 or higher)
- npm or yarn

### Installation Steps

```bash
# Clone the repository
git clone <repository-url>

# Navigate to project directory
cd weather

# Install dependencies
npm install

# Start the development server
npm start

# Build for production
npm run build
```

The application will run on `http://localhost:3000` by default.

---

## Components

### App Component

**File:** `src/App.js`

**Description:**  
The root component of the application. It serves as the main entry point and renders the Temp component.

**Type:** Functional Component

**Props:** None

**Returns:** JSX Element

**Example Usage:**

```jsx
import App from './App';
import ReactDOM from 'react-dom';

ReactDOM.render(<App />, document.getElementById('root'));
```

**Component Structure:**

```jsx
const App = () => {
  return (
    <>
      <Temp/>
    </>
  )
}
```

---

### Temp Component

**File:** `src/component/temp.js`

**Description:**  
The main weather search component that handles user input, fetches weather data from the OpenWeatherMap API, and passes the data to the Weathercard component for display.

**Type:** Functional Component

**Props:** None

**State Variables:**

| State | Type | Default | Description |
|-------|------|---------|-------------|
| `searchValue` | string | "pune" | Stores the city name entered by the user |
| `tempInfo` | object | {} | Stores the weather information retrieved from the API |

**Methods:**

#### `getWeatherInfo()`

Fetches weather data from the OpenWeatherMap API.

**Type:** Async Function

**Parameters:** None

**Returns:** void

**Side Effects:**
- Updates `tempInfo` state with weather data
- Logs errors to console if API call fails

**API Endpoint Used:**
```
https://api.openweathermap.org/data/2.5/weather?q={city}&units=metric&appid={api_key}
```

**Data Extracted:**
- `temp` - Current temperature
- `humidity` - Humidity percentage
- `pressure` - Atmospheric pressure
- `weathermood` - Weather condition (Clear, Clouds, Haze, etc.)
- `name` - City name
- `speed` - Wind speed
- `country` - Country code
- `sunset` - Sunset time (Unix timestamp)

**Example Usage:**

```jsx
import Temp from './component/temp';

function App() {
  return (
    <div>
      <Temp />
    </div>
  );
}
```

**Component Features:**
- Search input field for entering city names
- Search button to trigger weather data fetch
- Auto-fetches weather for default city (Pune) on component mount
- Real-time input value updates

**Event Handlers:**
- `onChange` - Updates `searchValue` when user types in search field
- `onClick` - Triggers `getWeatherInfo()` when search button is clicked

**Example of State Management:**

```jsx
// Setting search value
<input
  value={searchValue}
  onChange={(e) => setSearchValue(e.target.value)}
/>

// Triggering API call
<button onClick={getWeatherInfo}>
  Search
</button>
```

---

### Weathercard Component

**File:** `src/component/weathercard.js`

**Description:**  
A presentational component that displays weather information in a visually appealing card format. It shows temperature, weather conditions, location, and additional meteorological data.

**Type:** Functional Component

**Props:**

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `temp` | number | Yes | Current temperature in Celsius |
| `humidity` | number | Yes | Humidity percentage |
| `pressure` | number | Yes | Atmospheric pressure in hPa |
| `weathermood` | string | Yes | Weather condition (Clear, Clouds, Haze, Mist) |
| `name` | string | Yes | City name |
| `speed` | number | Yes | Wind speed in m/s |
| `country` | string | Yes | Country code (e.g., "IN", "US") |
| `sunset` | number | Yes | Sunset time as Unix timestamp |

**State Variables:**

| State | Type | Default | Description |
|-------|------|---------|-------------|
| `weatherState` | string | "" | CSS class name for weather icon |

**Icon Mapping:**

The component maps weather conditions to Weather Icons CSS classes:

| Weather Condition | Icon Class | Visual Representation |
|-------------------|------------|----------------------|
| Clouds | wi-day-cloudy | Cloudy day icon |
| Haze | wi-fog | Foggy conditions |
| Clear | wi-day-sunny | Sunny day icon |
| Mist | wi-dust | Misty/dusty conditions |
| Default | wi-day-sunny | Sunny day (fallback) |

**Internal Functions:**

#### Weather Icon Selector

```jsx
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
```

**Dependencies:** Updates whenever `weathermood` prop changes

#### Sunset Time Converter

Converts Unix timestamp to readable time format:

```jsx
let sec = sunset;
let date = new Date(sec * 1000);
let timeStr = `${date.getHours()}:${date.getMinutes()}`;
```

**Input:** Unix timestamp (seconds)  
**Output:** Time string in "HH:MM" format

**Example Usage:**

```jsx
import Weathercard from './component/weathercard';

function WeatherDisplay() {
  const weatherData = {
    temp: 25,
    humidity: 60,
    pressure: 1013,
    weathermood: "Clear",
    name: "London",
    speed: 5.5,
    country: "UK",
    sunset: 1699200000
  };

  return <Weathercard {...weatherData} />;
}
```

**Detailed Example with Individual Props:**

```jsx
<Weathercard
  temp={28}
  humidity={65}
  pressure={1012}
  weathermood="Clouds"
  name="Mumbai"
  speed={7.2}
  country="IN"
  sunset={1699198800}
/>
```

**Component Layout Structure:**

```
┌─────────────────────────────────┐
│   Weather Icon (Dynamic)        │
├─────────────────────────────────┤
│   Temperature: 28°              │
│   Condition: Clouds             │
│   Location: Mumbai, IN          │
├─────────────────────────────────┤
│   Current Date & Time           │
├─────────────────────────────────┤
│   Sunset    │    Humidity       │
│   18:30 PM  │    65%           │
├─────────────────────────────────┤
│   Pressure  │    Wind Speed     │
│   1012 hPa  │    7.2 m/s       │
└─────────────────────────────────┘
```

---

## API Integration

### OpenWeatherMap API

**Base URL:** `https://api.openweathermap.org/data/2.5/weather`

**Authentication:** API Key (appid parameter)

**Current API Key:** `15502e8723e89baf98e7da6ef2df65ac`

⚠️ **Security Note:** The API key is currently hardcoded. For production applications, store API keys in environment variables.

### API Request Format

**Endpoint:**
```
GET https://api.openweathermap.org/data/2.5/weather
```

**Query Parameters:**

| Parameter | Type | Required | Description | Example |
|-----------|------|----------|-------------|---------|
| `q` | string | Yes | City name | "London" |
| `units` | string | No | Temperature units (metric/imperial/standard) | "metric" |
| `appid` | string | Yes | Your API key | "your_api_key" |

**Example Request:**

```javascript
const city = "London";
const apiKey = "your_api_key";
const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

const response = await fetch(url);
const data = await response.json();
```

### API Response Format

**Success Response (200 OK):**

```json
{
  "coord": {
    "lon": -0.1257,
    "lat": 51.5085
  },
  "weather": [
    {
      "id": 800,
      "main": "Clear",
      "description": "clear sky",
      "icon": "01d"
    }
  ],
  "base": "stations",
  "main": {
    "temp": 25.5,
    "feels_like": 25.2,
    "temp_min": 24.0,
    "temp_max": 27.0,
    "pressure": 1013,
    "humidity": 60
  },
  "visibility": 10000,
  "wind": {
    "speed": 5.5,
    "deg": 230
  },
  "clouds": {
    "all": 20
  },
  "dt": 1699200000,
  "sys": {
    "type": 2,
    "id": 2019646,
    "country": "UK",
    "sunrise": 1699164000,
    "sunset": 1699200000
  },
  "timezone": 0,
  "id": 2643743,
  "name": "London",
  "cod": 200
}
```

**Error Response:**

```json
{
  "cod": "404",
  "message": "city not found"
}
```

### Response Data Mapping

The application extracts the following fields from the API response:

```javascript
const { temp, humidity, pressure } = data.main;
const { main: weathermood } = data.weather[0];
const { name } = data;
const { speed } = data.wind;
const { country, sunset } = data.sys;
```

---

## Functions

### Global Functions

#### ReactDOM.render()

**File:** `src/index.js`

**Description:**  
Renders the React application to the DOM.

**Syntax:**
```jsx
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
```

**Parameters:**
- `element` - React element to render (App wrapped in StrictMode)
- `container` - DOM node to render into (element with id="root")

**Returns:** void

---

### Component-Specific Functions

#### getWeatherInfo() - Temp Component

**Description:**  
Asynchronous function that fetches weather data from OpenWeatherMap API.

**Syntax:**
```javascript
const getWeatherInfo = async () => { ... }
```

**Algorithm:**

1. Construct API URL with search value and API key
2. Fetch data from OpenWeatherMap API
3. Parse JSON response
4. Destructure required fields from response
5. Create weather info object
6. Update state with new weather information
7. Handle errors by logging to console

**Error Handling:**
```javascript
try {
  // API call logic
} catch (error) {
  console.log(error);
}
```

**State Updates:**
- Sets `tempInfo` state with weather data object

**Example:**

```javascript
// Function is called on component mount
useEffect(() => {
  getWeatherInfo();
}, []);

// Or triggered by user action
<button onClick={getWeatherInfo}>Search</button>
```

---

#### Sunset Time Conversion - Weathercard Component

**Description:**  
Converts Unix timestamp to human-readable time string.

**Syntax:**
```javascript
let sec = sunset;
let date = new Date(sec * 1000);
let timeStr = `${date.getHours()}:${date.getMinutes()}`;
```

**Parameters:**
- `sunset` - Unix timestamp in seconds

**Returns:**
- `timeStr` - Formatted time string "HH:MM"

**Example:**

```javascript
// Input: 1699200000 (Unix timestamp)
// Output: "18:30"

const sunset = 1699200000;
const date = new Date(sunset * 1000);
const timeStr = `${date.getHours()}:${date.getMinutes()}`;
console.log(timeStr); // "18:30"
```

**Note:** This could be enhanced with padding for single-digit minutes:

```javascript
const timeStr = `${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
```

---

#### Weather Icon Mapper - Weathercard Component

**Description:**  
Maps weather conditions to appropriate Weather Icons CSS classes.

**Syntax:**
```javascript
useEffect(() => {
  if (weathermood) {
    switch (weathermood) {
      case "Clouds":
        setWeatheState("wi-day-cloudy");
        break;
      // ... other cases
    }
  }
}, [weathermood]);
```

**Parameters:**
- `weathermood` - Weather condition string from API

**Side Effects:**
- Updates `weatherState` state with appropriate icon class

**Supported Conditions:**
- "Clouds" → "wi-day-cloudy"
- "Haze" → "wi-fog"
- "Clear" → "wi-day-sunny"
- "Mist" → "wi-dust"
- Default → "wi-day-sunny"

**Extension Example:**

To add more weather conditions:

```javascript
case "Rain":
  setWeatheState("wi-rain");
  break;
case "Snow":
  setWeatheState("wi-snow");
  break;
case "Thunderstorm":
  setWeatheState("wi-thunderstorm");
  break;
```

---

## Usage Examples

### Example 1: Basic App Setup

```jsx
// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
```

### Example 2: Integrating Temp Component

```jsx
// src/App.js
import React from 'react';
import Temp from './component/temp';

const App = () => {
  return (
    <div className="app-container">
      <h1>Weather Application</h1>
      <Temp />
    </div>
  );
}

export default App;
```

### Example 3: Using Weathercard with Custom Data

```jsx
import React from 'react';
import Weathercard from './component/weathercard';

const CustomWeatherDisplay = () => {
  const customWeatherData = {
    temp: 22,
    humidity: 55,
    pressure: 1015,
    weathermood: "Clear",
    name: "Paris",
    speed: 4.5,
    country: "FR",
    sunset: 1699199000
  };

  return (
    <div>
      <h2>Current Weather in Paris</h2>
      <Weathercard {...customWeatherData} />
    </div>
  );
};

export default CustomWeatherDisplay;
```

### Example 4: Manual Weather Fetch

```jsx
import React, { useState } from 'react';

const ManualWeatherFetch = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState('');

  const fetchWeather = async () => {
    const apiKey = '15502e8723e89baf98e7da6ef2df65ac';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    
    try {
      const response = await fetch(url);
      const data = await response.json();
      
      if (data.cod === 200) {
        setWeatherData({
          temp: data.main.temp,
          humidity: data.main.humidity,
          pressure: data.main.pressure,
          weathermood: data.weather[0].main,
          name: data.name,
          speed: data.wind.speed,
          country: data.sys.country,
          sunset: data.sys.sunset
        });
      } else {
        alert('City not found!');
      }
    } catch (error) {
      console.error('Error fetching weather:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name"
      />
      <button onClick={fetchWeather}>Get Weather</button>
      {weatherData && <Weathercard {...weatherData} />}
    </div>
  );
};
```

### Example 5: Adding Multiple City Comparison

```jsx
import React, { useState } from 'react';
import Weathercard from './component/weathercard';

const CityComparison = () => {
  const [cities, setCities] = useState(['London', 'Paris', 'Tokyo']);
  const [weatherDataList, setWeatherDataList] = useState([]);

  const fetchMultipleCities = async () => {
    const apiKey = '15502e8723e89baf98e7da6ef2df65ac';
    const promises = cities.map(city =>
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`)
        .then(res => res.json())
    );

    try {
      const results = await Promise.all(promises);
      const weatherData = results.map(data => ({
        temp: data.main.temp,
        humidity: data.main.humidity,
        pressure: data.main.pressure,
        weathermood: data.weather[0].main,
        name: data.name,
        speed: data.wind.speed,
        country: data.sys.country,
        sunset: data.sys.sunset
      }));
      setWeatherDataList(weatherData);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  return (
    <div>
      <button onClick={fetchMultipleCities}>Compare Cities</button>
      <div className="weather-grid">
        {weatherDataList.map((data, index) => (
          <Weathercard key={index} {...data} />
        ))}
      </div>
    </div>
  );
};
```

### Example 6: Custom Error Handling

```jsx
import React, { useState } from 'react';
import Temp from './component/temp';

const WeatherWithErrorBoundary = () => {
  const [error, setError] = useState(null);

  const handleError = (err) => {
    setError(err.message);
    setTimeout(() => setError(null), 5000);
  };

  return (
    <div>
      {error && (
        <div className="error-message">
          Error: {error}
        </div>
      )}
      <Temp onError={handleError} />
    </div>
  );
};
```

---

## Data Structures

### WeatherInfo Object

The main data structure used to store weather information:

```typescript
interface WeatherInfo {
  temp: number;          // Temperature in Celsius
  humidity: number;      // Humidity percentage (0-100)
  pressure: number;      // Atmospheric pressure in hPa
  weathermood: string;   // Weather condition (Clear, Clouds, Haze, Mist)
  name: string;          // City name
  speed: number;         // Wind speed in m/s
  country: string;       // Country code (2 letters)
  sunset: number;        // Sunset time (Unix timestamp)
}
```

**Example:**

```javascript
const weatherInfo = {
  temp: 25.5,
  humidity: 60,
  pressure: 1013,
  weathermood: "Clear",
  name: "London",
  speed: 5.5,
  country: "UK",
  sunset: 1699200000
};
```

### Component Props Types

#### Temp Component

```typescript
interface TempProps {
  // No props - component manages its own state
}
```

#### Weathercard Component

```typescript
interface WeathercardProps {
  temp: number;
  humidity: number;
  pressure: number;
  weathermood: string;
  name: string;
  speed: number;
  country: string;
  sunset: number;
}
```

### State Types

#### Temp Component State

```typescript
interface TempState {
  searchValue: string;    // User's search input
  tempInfo: WeatherInfo;  // Weather data object
}
```

#### Weathercard Component State

```typescript
interface WeathercardState {
  weatherState: string;   // CSS class for weather icon
}
```

---

## Advanced Usage

### Customizing API Key

**Recommended Approach:** Use environment variables

1. Create a `.env` file in the project root:

```env
REACT_APP_WEATHER_API_KEY=your_api_key_here
```

2. Update the `getWeatherInfo` function in `temp.js`:

```javascript
const getWeatherInfo = async () => {
  try {
    const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=${apiKey}`;
    // ... rest of the code
  } catch (error) {
    console.log(error);
  }
};
```

3. Restart the development server to load environment variables.

### Adding Temperature Unit Toggle

```jsx
const [unit, setUnit] = useState('metric'); // 'metric' or 'imperial'

const getWeatherInfo = async () => {
  try {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=${unit}&appid=API_KEY`;
    // ... rest of the code
  } catch (error) {
    console.log(error);
  }
};

// In JSX
<button onClick={() => setUnit(unit === 'metric' ? 'imperial' : 'metric')}>
  Switch to {unit === 'metric' ? 'Fahrenheit' : 'Celsius'}
</button>
```

### Adding Loading State

```jsx
const [loading, setLoading] = useState(false);

const getWeatherInfo = async () => {
  setLoading(true);
  try {
    // ... API call
  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
};

// In JSX
{loading && <div className="loading">Loading weather data...</div>}
```

### Error Message Display

```jsx
const [error, setError] = useState(null);

const getWeatherInfo = async () => {
  try {
    let res = await fetch(url);
    let data = await res.json();
    
    if (data.cod === '404') {
      setError('City not found. Please try another city.');
      return;
    }
    
    setError(null);
    // ... rest of the code
  } catch (error) {
    setError('Failed to fetch weather data. Please try again.');
  }
};

// In JSX
{error && <div className="error-message">{error}</div>}
```

---

## Testing

### Unit Test Examples

#### Testing Weathercard Component

```jsx
import { render, screen } from '@testing-library/react';
import Weathercard from './weathercard';

test('renders temperature correctly', () => {
  const props = {
    temp: 25,
    humidity: 60,
    pressure: 1013,
    weathermood: "Clear",
    name: "London",
    speed: 5.5,
    country: "UK",
    sunset: 1699200000
  };
  
  render(<Weathercard {...props} />);
  expect(screen.getByText(/25°/)).toBeInTheDocument();
  expect(screen.getByText(/London, UK/)).toBeInTheDocument();
});
```

#### Testing Temp Component

```jsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Temp from './temp';

test('search input updates on change', () => {
  render(<Temp />);
  const input = screen.getByPlaceholderText(/search/i);
  
  fireEvent.change(input, { target: { value: 'London' } });
  expect(input.value).toBe('London');
});
```

---

## Best Practices

### 1. Error Handling

Always wrap API calls in try-catch blocks:

```javascript
try {
  const response = await fetch(url);
  const data = await response.json();
  // Handle data
} catch (error) {
  console.error('API Error:', error);
  // Show user-friendly error message
}
```

### 2. Environment Variables

Store sensitive data like API keys in environment variables:

```javascript
const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
```

### 3. Loading States

Provide visual feedback during API calls:

```javascript
const [loading, setLoading] = useState(false);

// Before API call
setLoading(true);

// After API call
setLoading(false);
```

### 4. Prop Validation

Consider adding PropTypes for component props:

```javascript
import PropTypes from 'prop-types';

Weathercard.propTypes = {
  temp: PropTypes.number.isRequired,
  humidity: PropTypes.number.isRequired,
  pressure: PropTypes.number.isRequired,
  weathermood: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  speed: PropTypes.number.isRequired,
  country: PropTypes.string.isRequired,
  sunset: PropTypes.number.isRequired,
};
```

### 5. Memoization

For performance optimization, consider using React.memo:

```javascript
export default React.memo(Weathercard);
```

---

## Troubleshooting

### Common Issues

#### 1. API Key Error (401 Unauthorized)

**Problem:** Invalid API key  
**Solution:** Verify your API key is correct and active

#### 2. City Not Found (404 Error)

**Problem:** Invalid city name  
**Solution:** Check spelling and ensure city exists in OpenWeatherMap database

#### 3. CORS Error

**Problem:** Browser blocking API request  
**Solution:** OpenWeatherMap API supports CORS by default. If issues persist, check your network settings.

#### 4. Weather Icons Not Displaying

**Problem:** Weather Icons CSS not loaded  
**Solution:** Ensure Weather Icons CSS is included in your project:

```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/weather-icons/2.0.10/css/weather-icons.min.css" />
```

---

## Future Enhancements

### Potential Features

1. **5-Day Forecast:** Add extended weather forecast
2. **Geolocation:** Automatically detect user's location
3. **Favorites:** Save favorite cities
4. **Unit Toggle:** Switch between Celsius and Fahrenheit
5. **Dark Mode:** Add dark theme support
6. **Historical Data:** Show weather history
7. **Weather Alerts:** Display severe weather warnings
8. **Multiple Languages:** Add internationalization support

---

## API Rate Limits

**OpenWeatherMap Free Tier:**
- 60 calls per minute
- 1,000,000 calls per month

**Recommendations:**
- Implement caching to reduce API calls
- Add debouncing to search input
- Consider upgrading for production applications

---

## Support and Resources

### Official Documentation
- [React Documentation](https://reactjs.org/)
- [OpenWeatherMap API Documentation](https://openweathermap.org/api)
- [Weather Icons Documentation](https://erikflowers.github.io/weather-icons/)

### Useful Links
- [OpenWeatherMap API Guide](https://openweathermap.org/guide)
- [React Hooks Documentation](https://reactjs.org/docs/hooks-intro.html)
- [Fetch API Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)

---

## License

This documentation is part of the Weather App project. Please refer to the project's LICENSE file for licensing information.

---

## Changelog

### Version 0.1.0 (Initial Release)
- Basic weather search functionality
- Weathercard component with weather details
- Integration with OpenWeatherMap API
- Responsive design

---

**Last Updated:** 2025-11-13
