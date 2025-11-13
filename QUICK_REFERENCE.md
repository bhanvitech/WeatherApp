# Weather App - Quick Reference Guide

## 🚀 Quick Start

```bash
npm install
npm start
```

---

## 📦 Components at a Glance

### App Component
```jsx
import App from './App';
// No props - renders the Temp component
<App />
```

### Temp Component
```jsx
import Temp from './component/temp';
// No props - manages weather search functionality
<Temp />
```

**Features:**
- City search input
- Auto-fetches weather on mount (default: Pune)
- Fetches from OpenWeatherMap API

### Weathercard Component
```jsx
import Weathercard from './component/weathercard';

<Weathercard
  temp={25}
  humidity={60}
  pressure={1013}
  weathermood="Clear"
  name="London"
  speed={5.5}
  country="UK"
  sunset={1699200000}
/>
```

**Props:**
| Prop | Type | Description |
|------|------|-------------|
| temp | number | Temperature (°C) |
| humidity | number | Humidity (%) |
| pressure | number | Pressure (hPa) |
| weathermood | string | Weather condition |
| name | string | City name |
| speed | number | Wind speed (m/s) |
| country | string | Country code |
| sunset | number | Unix timestamp |

---

## 🌐 API Integration

### Endpoint
```
GET https://api.openweathermap.org/data/2.5/weather
```

### Parameters
- `q` - City name
- `units` - metric/imperial (default: metric)
- `appid` - API key

### Example Request
```javascript
const response = await fetch(
  `https://api.openweathermap.org/data/2.5/weather?q=London&units=metric&appid=YOUR_API_KEY`
);
const data = await response.json();
```

### Response Structure
```javascript
{
  main: { temp, humidity, pressure },
  weather: [{ main: "Clear" }],
  name: "London",
  wind: { speed },
  sys: { country, sunset }
}
```

---

## 🎨 Weather Icon Mapping

| Condition | Icon Class |
|-----------|------------|
| Clouds | wi-day-cloudy |
| Haze | wi-fog |
| Clear | wi-day-sunny |
| Mist | wi-dust |
| Default | wi-day-sunny |

---

## 💡 Common Usage Patterns

### Fetch Weather for a City
```javascript
const [weatherData, setWeatherData] = useState(null);

const fetchWeather = async (city) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=API_KEY`;
  const response = await fetch(url);
  const data = await response.json();
  
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
};
```

### Display Weather Card
```jsx
{weatherData && <Weathercard {...weatherData} />}
```

### Handle Search Input
```jsx
const [city, setCity] = useState('');

<input
  value={city}
  onChange={(e) => setCity(e.target.value)}
/>
<button onClick={() => fetchWeather(city)}>Search</button>
```

---

## 🔧 Utility Functions

### Convert Unix Timestamp to Time
```javascript
const convertTime = (unixTimestamp) => {
  const date = new Date(unixTimestamp * 1000);
  return `${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
};
```

### Map Weather to Icon
```javascript
const getWeatherIcon = (condition) => {
  const iconMap = {
    'Clouds': 'wi-day-cloudy',
    'Haze': 'wi-fog',
    'Clear': 'wi-day-sunny',
    'Mist': 'wi-dust',
  };
  return iconMap[condition] || 'wi-day-sunny';
};
```

---

## 🛡️ Best Practices

### 1. Use Environment Variables
```javascript
// .env
REACT_APP_WEATHER_API_KEY=your_key_here

// In code
const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
```

### 2. Add Loading State
```jsx
const [loading, setLoading] = useState(false);

const fetchWeather = async () => {
  setLoading(true);
  try {
    // fetch logic
  } finally {
    setLoading(false);
  }
};

return loading ? <div>Loading...</div> : <Weathercard {...data} />;
```

### 3. Error Handling
```jsx
const [error, setError] = useState(null);

try {
  const response = await fetch(url);
  const data = await response.json();
  
  if (data.cod === '404') {
    setError('City not found');
    return;
  }
  
  // Process data
} catch (err) {
  setError('Failed to fetch weather');
}
```

### 4. Input Validation
```javascript
const isValidCity = (city) => {
  return city.trim().length > 0 && /^[a-zA-Z\s]+$/.test(city);
};
```

---

## 📊 Data Types

### WeatherInfo Object
```typescript
interface WeatherInfo {
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

---

## 🐛 Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| 401 Error | Check API key validity |
| 404 Error | Verify city name spelling |
| CORS Error | OpenWeatherMap supports CORS by default |
| Icons not showing | Include Weather Icons CSS library |

---

## 📚 Resources

- [OpenWeatherMap API](https://openweathermap.org/api)
- [Weather Icons](https://erikflowers.github.io/weather-icons/)
- [React Documentation](https://reactjs.org/)

---

## 🔑 API Rate Limits

**Free Tier:**
- 60 calls/minute
- 1,000,000 calls/month

**Optimization Tips:**
- Implement caching
- Add debouncing to search
- Consider upgrading for production

---

## 🎯 Key Files

| File | Purpose |
|------|---------|
| `src/App.js` | Root component |
| `src/index.js` | Entry point |
| `src/component/temp.js` | Search & API logic |
| `src/component/weathercard.js` | Display component |
| `src/component/style.css` | Component styles |

---

**For detailed documentation, see [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)**
