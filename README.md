# Weather & News Dashboard

A modern web application that provides instant weather updates and local news headlines for any city worldwide.

## Features

- **Real-time Weather Data**: Current temperature, weather conditions, humidity, and wind speed
- **Local News Headlines**: Top 3 news stories for the searched location
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Error Handling**: Comprehensive validation and user feedback
- **Modern UI**: Clean, intuitive interface with smooth animations

## How to Use

1. Enter a city name in the search box
2. Click the "Search" button or press Enter
3. View the current weather information and local news headlines

## Demo Mode

The application currently runs in demo mode with realistic mock data. This allows you to test all functionality immediately without requiring API keys.

## Setting Up Real APIs (Optional)

To use real data instead of mock data, you'll need API keys from:

### Weather Data (OpenWeatherMap)
1. Sign up at [OpenWeatherMap](https://openweathermap.org/api)
2. Get your free API key
3. Replace the `fetchWeatherData` method in `main.js` with:

```javascript
async fetchWeatherData(cityName) {
  const API_KEY = 'your_openweather_api_key';
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
  );
  
  if (!response.ok) {
    throw new Error('City not found. Please check the spelling and try again.');
  }
  
  return await response.json();
}
```

### News Data (NewsAPI)
1. Sign up at [NewsAPI](https://newsapi.org/)
2. Get your free API key
3. Replace the `fetchNewsData` method in `main.js` with:

```javascript
async fetchNewsData(cityName) {
  const API_KEY = 'your_newsapi_key';
  const response = await fetch(
    `https://newsapi.org/v2/everything?q=${cityName}&sortBy=publishedAt&pageSize=3&apiKey=${API_KEY}`
  );
  
  if (!response.ok) {
    throw new Error('Unable to fetch news data.');
  }
  
  return await response.json();
}
```

## Technologies Used

- **HTML5**: Semantic markup structure
- **CSS3**: Modern styling with Flexbox and Grid
- **Vanilla JavaScript**: Clean, efficient functionality
- **Font Awesome**: Beautiful icons
- **Vite**: Fast development and build tool

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## License

MIT License - feel free to use this project for learning or personal use.