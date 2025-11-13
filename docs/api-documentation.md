# Weather Application API & Component Documentation

## Overview
- Single-page weather search experience built with React.
- Fetches current conditions from OpenWeatherMap and renders a responsive card with weather details and icons.
- Core exports live under `src/` and are organised as React components.

## Entry Points
- `src/index.js` mounts the React application into the DOM via `ReactDOM.render`, wrapping the root component in `React.StrictMode`.

  ```jsx
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('root')
  );
  ```

- `src/App.js` exports the top-level `<App />` component which delegates all UI to `<Temp />`.

  ```jsx
  const App = () => {
    return (
      <>
        <Temp />
      </>
    );
  };
  ```

## Components

### `App`
- Thin wrapper that mounts the weather search workflow.
- Intended usage is to render it in your root entry file (already done in `index.js`).
- Example:
  ```jsx
  import App from './App';

  export default function Root() {
    return <App />;
  }
  ```

### `Temp`
- Location-aware weather search container responsible for data fetching and state management.

  ```jsx
  const Temp = () => {
    const [searchValue, setSearchValue] = useState('pune');
    const [tempInfo, setTempInfo] = useState({});

    const getWeatherInfo = async () => {
      try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=15502e8723e89baf98e7da6ef2df65ac`;

        const res = await fetch(url);
        const data = await res.json();
        // ...
        setTempInfo(myNewWeatherInfo);
      } catch (error) {
        console.log(error);
      }
    };

    useEffect(() => {
      getWeatherInfo();
    }, []);

    return (
      <>
        <div className="wrap my-3">
          <div className="search">
            <input
              type="search"
              placeholder="search..."
              autoFocus
              id="search"
              className="searchTerm"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <button className="searchButton" type="button" onClick={getWeatherInfo}>
              Search
            </button>
          </div>
        </div>
        <Weathercard {...tempInfo} />
      </>
    );
  };
  ```

#### State & Behaviour
- `searchValue` (`string`): controlled input for the city query. Defaults to `"pune"`.
- `tempInfo` (`object`): holds the weather payload forwarded to `<Weathercard />`.
- `getWeatherInfo(): Promise<void>`: asynchronous fetch against OpenWeatherMap using the current `searchValue`. Converts the response to a curated object (`temp`, `humidity`, `pressure`, `weathermood`, `name`, `speed`, `country`, `sunset`).
- `useEffect` triggers an initial fetch on mount. Subsequent searches are initiated by the Search button.

#### Usage Guidelines
- Place `<Temp />` anywhere you need a self-contained weather search experience.
- Debounce input or validate city names by wrapping `getWeatherInfo` if you need stricter UX.
- Error handling currently logs to the console; add user-facing feedback by catching and surfacing the error before calling `setTempInfo`.

#### Customising the Fetch Logic
- Externalise the API key by creating `.env` and referencing `process.env.REACT_APP_OPENWEATHERMAP_API_KEY` instead of the hard-coded key.
- Example override with dependency injection:
  ```jsx
  import Temp from './component/temp';

  export default function WeatherFor({ defaultCity }) {
    return <Temp defaultCity={defaultCity} />;
  }
  ```
  > To support a `defaultCity` prop, extend the component to read `props.defaultCity ?? "pune"` when initialising `searchValue`.

### `Weathercard`
- Presentational component that renders weather metrics and iconography.

  ```jsx
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
    const [weatherState, setWeatheState] = React.useState('');

    useEffect(() => {
      if (weathermood) {
        switch (weathermood) {
          case 'Clouds':
            setWeatheState('wi-day-cloudy');
            break;
          case 'Haze':
            setWeatheState('wi-fog');
            break;
          case 'Clear':
            setWeatheState('wi-day-sunny');
            break;
          case 'Mist':
            setWeatheState('wi-dust');
            break;
          default:
            setWeatheState('wi-day-sunny');
            break;
        }
      }
    }, [weathermood]);

    const sec = sunset;
    const date = new Date(sec * 1000);
    const timeStr = `${date.getHours()}:${date.getMinutes()}`;
    return (
      <article className="widget">
        <div className="weatherIcon">
          <i className={`wi ${weatherState}`}></i>
        </div>
        {/* ... */}
      </article>
    );
  };
  ```

#### Props
| Prop | Type | Required | Description |
| --- | --- | --- | --- |
| `temp` | `number` | ✔ | Temperature in °C. Rendered with the ° symbol. |
| `humidity` | `number` | ✔ | Percentage humidity. |
| `pressure` | `number` | ✔ | Atmospheric pressure (hPa). |
| `weathermood` | `string` | ✔ | Primary condition string from OpenWeatherMap; drives icon selection. |
| `name` | `string` | ✔ | City name. |
| `country` | `string` | ✔ | ISO 3166 country code. |
| `speed` | `number` | ✔ | Wind speed in m/s. |
| `sunset` | `number` | ✔ | Unix timestamp (seconds) for sunset; converted to local time. |

#### Icon Mapping
- `"Clouds"` → `wi-day-cloudy`
- `"Haze"` → `wi-fog`
- `"Clear"` → `wi-day-sunny`
- `"Mist"` → `wi-dust`
- Fallback → `wi-day-sunny`

Add new cases in the `switch` inside `useEffect` to support more conditions.

#### Usage Example
```jsx
import Weathercard from './component/weathercard';

const demoData = {
  temp: 26,
  humidity: 72,
  pressure: 1012,
  weathermood: 'Clear',
  name: 'Lisbon',
  country: 'PT',
  speed: 3.4,
  sunset: 1713020400,
};

export default function Preview() {
  return <Weathercard {...demoData} />;
}
```

## Styling & Assets
- Component visuals rely on `src/component/style.css`, including imports for Google Fonts and `weather-icons`.

  ```css
  @import url(https://fonts.googleapis.com/css?family=Poiret+One);
  @import url(https://cdnjs.cloudflare.com/ajax/libs/weather-icons/2.0.9/css/weather-icons.min.css);
  /* ... */
  ```
- Ensure the stylesheet is imported once (already handled inside `Temp`).
- Icons depend on the `weather-icons` CDN; bundle locally if you need offline support.

## External Service Integration
- API: `https://api.openweathermap.org/data/2.5/weather`
- Query parameters used:
  - `q=<city>` (from `searchValue`)
  - `units=metric`
  - `appid=<OPENWEATHERMAP_API_KEY>`
- Expected response fields: `main.temp`, `main.humidity`, `main.pressure`, `weather[0].main`, `name`, `wind.speed`, `sys.country`, `sys.sunset`.
- To secure the key, move it into an environment variable and pass it through build tools:
  ```bash
  # .env
  REACT_APP_OPENWEATHERMAP_API_KEY=your-key-here
  ```
  ```jsx
  const apiKey = process.env.REACT_APP_OPENWEATHERMAP_API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=${apiKey}`;
  ```

## Extensibility Tips
- **Input validation:** Guard against empty search strings before executing `fetch`.
- **Internationalisation:** Pair `new Date(sec * 1000)` with `toLocaleTimeString` for locale-aware formatting.
- **State lifting:** If multiple components need the weather data, lift `tempInfo` into a parent and pass it down alongside `setTempInfo`.
- **Testing:** Mock `fetch` and simulate user input to verify that `Temp` updates `Weathercard` correctly.

