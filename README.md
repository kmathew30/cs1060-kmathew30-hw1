# Weather & Music Dashboard

A modern web application that provides instant weather updates and personalized music recommendations for any city worldwide.

## Features

- **Real-time Weather Data**: Current temperature, weather conditions, humidity, and wind speed
- **Music Recommendations**: Curated music suggestions based on current weather conditions
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Error Handling**: Comprehensive validation and user feedback
- **Modern UI**: Clean, intuitive interface with smooth animations

## How to Use

1. Enter a city name in the search box
2. Click the "Search" button or press Enter
3. View the current weather information and personalized music recommendations

## Setting Up API Keys (Required)

To use the application, you'll need an API key from OpenWeatherMap:

### Weather Data (OpenWeatherMap)
1. Sign up at [OpenWeatherMap](https://openweathermap.org/api)
2. Get your free API key
3. In `main.js`, replace `'YOUR_OPENWEATHER_API_KEY'` with your actual API key

### Important Notes:
- **OpenWeatherMap**: Free tier allows 1,000 calls/day
- **Music Recommendations**: Generated locally based on weather data (no additional API needed)
- Keep your API key secure and never commit it to public repositories

### API Key Setup:
1. Open `main.js`
2. Find line with `const API_KEY = 'YOUR_OPENWEATHER_API_KEY';`
3. Replace `'YOUR_OPENWEATHER_API_KEY'` with your actual OpenWeatherMap API key

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