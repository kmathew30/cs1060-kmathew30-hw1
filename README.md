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

The application is now configured to use real APIs but requires API keys to function.

## Setting Up API Keys (Required)

To use the application, you'll need API keys from both services:

### Weather Data (OpenWeatherMap)
1. Sign up at [OpenWeatherMap](https://openweathermap.org/api)
2. Get your free API key
3. In `main.js`, replace `'YOUR_OPENWEATHER_API_KEY'` with your actual API key

### News Data (NewsAPI)
1. Sign up at [NewsAPI](https://newsapi.org/)
2. Get your free API key
3. In `main.js`, replace `'YOUR_NEWSAPI_KEY'` with your actual API key

### Important Notes:
- **OpenWeatherMap**: Free tier allows 1,000 calls/day
- **NewsAPI**: Free tier allows 100 requests/day
- Both APIs require HTTPS in production
- Keep your API keys secure and never commit them to public repositories

### API Key Setup:
1. Open `main.js`
2. Find line with `const API_KEY = 'YOUR_OPENWEATHER_API_KEY';`
3. Replace `'YOUR_OPENWEATHER_API_KEY'` with your actual OpenWeatherMap API key
4. Find line with `const API_KEY = 'YOUR_NEWSAPI_KEY';`
5. Replace `'YOUR_NEWSAPI_KEY'` with your actual NewsAPI key
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