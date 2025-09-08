// Weather and News Dashboard
class WeatherNewsApp {
  constructor() {
    this.cityInput = document.getElementById('cityInput');
    this.searchBtn = document.getElementById('searchBtn');
    this.errorMessage = document.getElementById('errorMessage');
    this.loadingSpinner = document.getElementById('loadingSpinner');
    this.resultsContainer = document.getElementById('resultsContainer');
    
    // Weather elements
    this.cityName = document.getElementById('cityName');
    this.weatherDescription = document.getElementById('weatherDescription');
    this.temperature = document.getElementById('temperature');
    this.weatherIcon = document.getElementById('weatherIcon');
    this.feelsLike = document.getElementById('feelsLike');
    this.humidity = document.getElementById('humidity');
    this.windSpeed = document.getElementById('windSpeed');
    
    // News elements
    this.newsContainer = document.getElementById('newsContainer');
    
    this.initEventListeners();
  }

  initEventListeners() {
    this.searchBtn.addEventListener('click', () => this.handleSearch());
    this.cityInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        this.handleSearch();
      }
    });

    // Add event listeners for quick city buttons
    document.querySelectorAll('.city-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const cityName = e.target.getAttribute('data-city');
        this.cityInput.value = cityName;
        this.handleSearch();
      });
    });
  }

  async handleSearch() {
    const cityName = this.cityInput.value.trim();
    
    // Clear previous results and errors
    this.clearResults();
    
    // Validate input
    if (!cityName) {
      this.showError('Please enter a city name.');
      return;
    }

    // Show loading
    this.showLoading();

    try {
      // Fetch weather data first (this should always work)
      const weatherData = await this.fetchWeatherData(cityName);
      this.displayWeather(weatherData);
      
      // Try to fetch news data, but don't fail if it doesn't work
      try {
        // No need to fetch external data for music recommendations
        // Music recommendations are generated based on weather data
      } catch (newsError) {
        console.warn('Music recommendations failed:', newsError.message);
      }
      
      this.showResults();

    } catch (error) {
      this.showError(error.message);
    } finally {
      this.hideLoading();
    }
  }

  async fetchWeatherData(cityName) {
    // Add your OpenWeatherMap API key here
    const WEATHER_API_KEY = 'd424c92b6665591d149f1493bf8d4ecd';
    const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cityName)}&appid=${WEATHER_API_KEY}&units=metric`;
    
    console.log('Weather API URL:', API_URL); // Debug log
    
    try {
      const response = await fetch(API_URL);
      console.log('Weather API Response Status:', response.status); // Debug log
      
      if (!response.ok) {
        const errorText = await response.text();
        console.log('Weather API Error Response:', errorText); // Debug log
        
        if (response.status === 404) {
          throw new Error('City not found. Please check the spelling and try again.');
        } else if (response.status === 401) {
          throw new Error(`Invalid API key. Please check your OpenWeatherMap API key. Response: ${errorText}`);
        } else {
          throw new Error(`Unable to fetch weather data. Status: ${response.status}. Response: ${errorText}`);
        }
      }
      
      const data = await response.json();
      console.log('Weather API Success:', data); // Debug log
      return data;
    } catch (error) {
      console.error('Weather API Error:', error); // Debug log
      if (error.message.includes('fetch')) {
        throw new Error('Network error. Please check your internet connection.');
      }
      throw error;
    }
  }
  displayWeather(data) {
    this.cityName.textContent = data.name;
    this.weatherDescription.textContent = data.weather[0].description;
    this.temperature.textContent = `${Math.round(data.main.temp)}°C`;
    this.feelsLike.textContent = `${Math.round(data.main.feels_like)}°C`;
    this.humidity.textContent = `${data.main.humidity}%`;
    this.windSpeed.textContent = `${Math.round(data.wind.speed * 3.6)} km/h`;
    
    // Set weather icon based on weather condition
    this.updateWeatherIcon(data.weather[0].main, data.weather[0].icon);
    
    // Display music recommendations
    this.displayMusicRecommendations(data.weather[0].main, data.main.temp);
  }

  displayMusicRecommendations(weatherMain, temperature) {
    this.newsContainer.innerHTML = '';
    
    const musicData = this.getMusicForWeather(weatherMain, temperature);
    
    musicData.forEach(recommendation => {
      const musicElement = document.createElement('div');
      musicElement.className = 'news-article';
      
      musicElement.innerHTML = `
        <h3>${recommendation.title}</h3>
        <p>${recommendation.description}</p>
        <div class="news-meta">
          <span class="news-source">${recommendation.genre}</span>
          <span class="news-date">${recommendation.mood}</span>
        </div>
      `;
      
      this.newsContainer.appendChild(musicElement);
    });
  }

  getMusicForWeather(weatherMain, temperature) {
    const recommendations = [];
    
    // Weather-based recommendations
    switch (weatherMain) {
      case 'Clear':
        if (temperature > 25) {
          recommendations.push({
            title: "Summer Vibes Playlist",
            description: "Perfect sunny day calls for upbeat tracks! Try some reggae, pop, or tropical house to match the bright weather.",
            genre: "Pop/Reggae",
            mood: "Energetic & Happy"
          });
        } else {
          recommendations.push({
            title: "Clear Skies Acoustic",
            description: "Beautiful clear weather with a gentle breeze. Acoustic folk and indie tracks would complement this peaceful atmosphere.",
            genre: "Folk/Indie",
            mood: "Peaceful & Uplifting"
          });
        }
        break;
        
      case 'Rain':
      case 'Drizzle':
        recommendations.push({
          title: "Rainy Day Jazz",
          description: "Nothing beats smooth jazz or lo-fi hip hop when it's raining. Perfect for a cozy indoor vibe.",
          genre: "Jazz/Lo-fi",
          mood: "Cozy & Contemplative"
        });
        break;
        
      case 'Thunderstorm':
        recommendations.push({
          title: "Storm Energy",
          description: "Dramatic weather calls for dramatic music! Try some epic orchestral pieces or powerful rock anthems.",
          genre: "Rock/Orchestral",
          mood: "Intense & Dramatic"
        });
        break;
        
      case 'Snow':
        recommendations.push({
          title: "Winter Wonderland",
          description: "Snowy weather pairs beautifully with classical music, ambient soundscapes, or cozy indie folk.",
          genre: "Classical/Ambient",
          mood: "Serene & Magical"
        });
        break;
        
      case 'Clouds':
        recommendations.push({
          title: "Cloudy Day Chill",
          description: "Overcast skies are perfect for mellow indie rock, alternative, or downtempo electronic music.",
          genre: "Indie/Alternative",
          mood: "Mellow & Reflective"
        });
        break;
        
      default:
        recommendations.push({
          title: "Weather Mood Mix",
          description: "A versatile playlist that works for any weather - featuring a mix of genres to suit your current atmosphere.",
          genre: "Mixed",
          mood: "Versatile"
        });
    }
    
    // Temperature-based additional recommendations
    if (temperature > 30) {
      recommendations.push({
        title: "Hot Summer Beats",
        description: "It's getting hot! Cool down with some chill electronic, bossa nova, or smooth R&B tracks.",
        genre: "Electronic/R&B",
        mood: "Cool & Smooth"
      });
    } else if (temperature < 0) {
      recommendations.push({
        title: "Warm Winter Sounds",
        description: "Bundle up with some warm, comforting music. Think cozy coffee shop vibes or heartwarming ballads.",
        genre: "Acoustic/Ballads",
        mood: "Warm & Comforting"
      });
    }
    
    // Add a general mood recommendation
    const timeOfDay = new Date().getHours();
    if (timeOfDay < 12) {
      recommendations.push({
        title: "Morning Energy Boost",
        description: "Start your day right with some uplifting morning tunes that match today's weather vibe!",
        genre: "Upbeat/Motivational",
        mood: "Energizing"
      });
    } else if (timeOfDay > 18) {
      recommendations.push({
        title: "Evening Wind Down",
        description: "As the day winds down, let the weather inspire your evening soundtrack with these relaxing suggestions.",
        genre: "Chill/Relaxing",
        mood: "Calming"
      });
    }
    
    return recommendations.slice(0, 3); // Return top 3 recommendations
  }
  updateWeatherIcon(weatherMain, iconCode) {
    const iconMap = {
      'Clear': 'fas fa-sun',
      'Clouds': 'fas fa-cloud',
      'Rain': 'fas fa-cloud-rain',
      'Drizzle': 'fas fa-cloud-drizzle',
      'Thunderstorm': 'fas fa-bolt',
      'Snow': 'fas fa-snowflake',
      'Mist': 'fas fa-smog',
      'Fog': 'fas fa-smog'
    };
    
    // Use more specific icons based on OpenWeatherMap icon codes
    const specificIconMap = {
      '01d': 'fas fa-sun',           // clear sky day
      '01n': 'fas fa-moon',          // clear sky night
      '02d': 'fas fa-cloud-sun',     // few clouds day
      '02n': 'fas fa-cloud-moon',    // few clouds night
      '03d': 'fas fa-cloud',         // scattered clouds
      '03n': 'fas fa-cloud',
      '04d': 'fas fa-cloud',         // broken clouds
      '04n': 'fas fa-cloud',
      '09d': 'fas fa-cloud-rain',    // shower rain
      '09n': 'fas fa-cloud-rain',
      '10d': 'fas fa-cloud-sun-rain', // rain day
      '10n': 'fas fa-cloud-moon-rain', // rain night
      '11d': 'fas fa-bolt',          // thunderstorm
      '11n': 'fas fa-bolt',
      '13d': 'fas fa-snowflake',     // snow
      '13n': 'fas fa-snowflake',
      '50d': 'fas fa-smog',          // mist
      '50n': 'fas fa-smog'
    };
    
    this.weatherIcon.className = specificIconMap[iconCode] || iconMap[weatherMain] || 'fas fa-sun';
  }

  showError(message) {
    this.errorMessage.textContent = message;
    this.errorMessage.classList.remove('hidden');
  }

  showLoading() {
    this.loadingSpinner.classList.remove('hidden');
  }

  hideLoading() {
    this.loadingSpinner.classList.add('hidden');
  }

  showResults() {
    this.resultsContainer.classList.remove('hidden');
  }

  clearResults() {
    this.errorMessage.classList.add('hidden');
    this.resultsContainer.classList.add('hidden');
  }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new WeatherNewsApp();
});