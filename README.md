# 🌤️ Weather App

A modern, responsive weather application built with React that provides real-time weather information for cities worldwide using the OpenWeatherMap API.

## 📋 Table of Contents

- [Features](#features)
- [Demo](#demo)
- [Getting Started](#getting-started)
- [Documentation](#documentation)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [API Reference](#api-reference)
- [Contributing](#contributing)

## ✨ Features

- 🔍 **City Search** - Search for weather information in any city worldwide
- 🌡️ **Real-time Data** - Get current temperature, humidity, pressure, and wind speed
- 🌅 **Sunset Time** - View sunset time for the selected location
- 🎨 **Dynamic Weather Icons** - Visual representation of weather conditions
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile devices
- ⚡ **Fast Performance** - Built with React for optimal speed
- 🔄 **Auto-load** - Automatically fetches weather for default city on load

## 🎬 Demo

Enter any city name to get real-time weather information:

![Weather App Demo](https://user-images.githubusercontent.com/100353170/166459155-40fe89a9-d35c-43d3-8671-065e09b282bf.png)

## 🚀 Getting Started

### Prerequisites

- Node.js (v12 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd weather
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open your browser and navigate to:
```
http://localhost:3000
```

### Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Runs the test suite
- `npm eject` - Ejects from Create React App (one-way operation)

## 📚 Documentation

Comprehensive documentation is available for all components, functions, and APIs:

- **[API Documentation](./API_DOCUMENTATION.md)** - Complete API reference with detailed examples
- **[Quick Reference Guide](./QUICK_REFERENCE.md)** - Concise cheat sheet for developers

### Quick Links

- [Component Documentation](./API_DOCUMENTATION.md#components)
- [API Integration Guide](./API_DOCUMENTATION.md#api-integration)
- [Usage Examples](./API_DOCUMENTATION.md#usage-examples)
- [Data Structures](./API_DOCUMENTATION.md#data-structures)

## 📁 Project Structure

```
weather/
├── public/
│   ├── index.html
│   ├── favicon.ico
│   └── ...
├── src/
│   ├── component/
│   │   ├── temp.js          # Main weather search component
│   │   ├── weathercard.js   # Weather display card component
│   │   └── style.css        # Component styles
│   ├── App.js               # Root component
│   ├── App.css              # App styles
│   ├── index.js             # Entry point
│   └── index.css            # Global styles
├── package.json
├── README.md                # This file
├── API_DOCUMENTATION.md     # Comprehensive API docs
└── QUICK_REFERENCE.md       # Quick reference guide
```

## 🛠️ Technologies Used

- **[React](https://reactjs.org/)** (v17.0.2) - JavaScript library for building user interfaces
- **[OpenWeatherMap API](https://openweathermap.org/api)** - Weather data provider
- **[Weather Icons](https://erikflowers.github.io/weather-icons/)** - Beautiful weather icons
- **Create React App** - Toolchain for React development

## 🌐 API Reference

### OpenWeatherMap API

This application uses the OpenWeatherMap API to fetch weather data.

**Endpoint:**
```
GET https://api.openweathermap.org/data/2.5/weather
```

**Parameters:**
- `q` - City name
- `units` - Temperature units (metric/imperial)
- `appid` - Your API key

**Example Request:**
```javascript
fetch('https://api.openweathermap.org/data/2.5/weather?q=London&units=metric&appid=YOUR_API_KEY')
  .then(response => response.json())
  .then(data => console.log(data));
```

For detailed API documentation, see [API_DOCUMENTATION.md](./API_DOCUMENTATION.md).

## 📦 Components

### App Component
Root component that renders the weather application.

### Temp Component
Main component that handles:
- City search functionality
- API calls to OpenWeatherMap
- Weather data management

### Weathercard Component
Presentational component that displays:
- Current temperature
- Weather conditions
- Location (city and country)
- Additional info (humidity, pressure, wind speed, sunset)

For detailed component documentation with examples, see [API_DOCUMENTATION.md](./API_DOCUMENTATION.md#components).

## 🔑 Environment Variables

To secure your API key, use environment variables:

1. Create a `.env` file in the root directory:
```env
REACT_APP_WEATHER_API_KEY=your_api_key_here
```

2. Update the code to use the environment variable:
```javascript
const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
```

3. Restart the development server.

## 🐛 Troubleshooting

### Common Issues

**API Key Error (401):**
- Verify your API key is valid and active
- Check if the key is correctly configured

**City Not Found (404):**
- Verify the city name spelling
- Try using the full city name

**Weather Icons Not Displaying:**
- Ensure Weather Icons CSS is included in your project
- Check your internet connection

For more troubleshooting tips, see [API_DOCUMENTATION.md](./API_DOCUMENTATION.md#troubleshooting).

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- [OpenWeatherMap](https://openweathermap.org/) for providing the weather API
- [Weather Icons](https://erikflowers.github.io/weather-icons/) for the beautiful icon set
- [React](https://reactjs.org/) team for the amazing framework

## 📞 Support

For questions, issues, or feature requests, please:
- Check the [API Documentation](./API_DOCUMENTATION.md)
- Review the [Quick Reference Guide](./QUICK_REFERENCE.md)
- Open an issue on GitHub

## 🗺️ Roadmap

Future enhancements planned:
- [ ] 5-day weather forecast
- [ ] Geolocation support
- [ ] Temperature unit toggle (Celsius/Fahrenheit)
- [ ] Favorite cities list
- [ ] Dark mode
- [ ] Weather alerts
- [ ] Historical weather data
- [ ] Multi-language support

---

**Built with ❤️ using React**

