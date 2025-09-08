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
      // Fetch weather and news data
      const [weatherData, newsData] = await Promise.all([
        this.fetchWeatherData(cityName),
        this.fetchNewsData(cityName)
      ]);

      // Display results
      this.displayWeather(weatherData);
      this.displayNews(newsData);
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

  async fetchNewsData(cityName) {
    // Add your NewsAPI key here
    const NEWS_API_KEY = '56dab31f519b40cab8a52cacb0614d5c';
    const API_URL = `https://newsapi.org/v2/everything?q=${encodeURIComponent(cityName)}&sortBy=publishedAt&pageSize=3&language=en&apiKey=${NEWS_API_KEY}`;
    
    try {
      const response = await fetch(API_URL);
      
      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Invalid NewsAPI key. Please check your API key.');
        } else if (response.status === 429) {
          throw new Error('News API rate limit exceeded. Please try again later.');
        } else {
          throw new Error('Unable to fetch news data. Please try again later.');
        }
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
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
  }

  displayNews(data) {
    this.newsContainer.innerHTML = '';
    
    if (!data.articles || data.articles.length === 0) {
      this.newsContainer.innerHTML = `
        <div class="news-article">
          <p>No news found for this location.</p>
        </div>
      `;
      return;
    }

    // Display top 3 articles
    const articles = data.articles.slice(0, 3);
    
    articles.forEach(article => {
      const articleElement = document.createElement('div');
      articleElement.className = 'news-article';
      
      const publishedDate = new Date(article.publishedAt).toLocaleDateString();
      
      articleElement.innerHTML = `
        <h3><a href="${article.url}" target="_blank" rel="noopener noreferrer">${article.title}</a></h3>
        <p>${article.description || 'No description available.'}</p>
        <div class="news-meta">
          <span class="news-source">${article.source.name}</span>
          <span class="news-date">${publishedDate}</span>
        </div>
      `;
      
      this.newsContainer.appendChild(articleElement);
    });
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