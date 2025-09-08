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
    // Mock weather data for demonstration
    // In production, replace with actual API call to OpenWeatherMap
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate API response
        const mockWeatherData = {
          name: cityName,
          weather: [
            {
              main: this.getRandomWeather(),
              description: this.getRandomWeatherDescription(),
              icon: '01d'
            }
          ],
          main: {
            temp: Math.floor(Math.random() * 30) + 5,
            feels_like: Math.floor(Math.random() * 30) + 5,
            humidity: Math.floor(Math.random() * 40) + 40
          },
          wind: {
            speed: Math.floor(Math.random() * 20) + 5
          }
        };

        // Simulate city not found error occasionally
        if (cityName.toLowerCase() === 'nowhere') {
          reject(new Error('City not found. Please check the spelling and try again.'));
        } else {
          resolve(mockWeatherData);
        }
      }, 1000);
    });
  }

  async fetchNewsData(cityName) {
    // Mock news data for demonstration
    // In production, replace with actual API call to NewsAPI
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockNewsData = {
          articles: [
            {
              title: `Local Development Projects Transform ${cityName} Downtown Area`,
              description: `New infrastructure and business developments are bringing positive changes to the heart of ${cityName}, creating jobs and improving quality of life for residents.`,
              url: '#',
              source: { name: 'Local News Network' },
              publishedAt: new Date().toISOString()
            },
            {
              title: `${cityName} Weather Alert: Seasonal Changes Expected This Week`,
              description: `Meteorologists predict significant weather patterns affecting ${cityName} and surrounding areas. Residents advised to prepare for changing conditions.`,
              url: '#',
              source: { name: 'Weather Central' },
              publishedAt: new Date(Date.now() - 3600000).toISOString()
            },
            {
              title: `Community Events Bring ${cityName} Residents Together`,
              description: `Local organizations announce upcoming festivals and community gatherings designed to strengthen neighborhood bonds and celebrate local culture.`,
              url: '#',
              source: { name: 'Community Herald' },
              publishedAt: new Date(Date.now() - 7200000).toISOString()
            }
          ]
        };
        resolve(mockNewsData);
      }, 1200);
    });
  }

  displayWeather(data) {
    this.cityName.textContent = data.name;
    this.weatherDescription.textContent = data.weather[0].description;
    this.temperature.textContent = `${Math.round(data.main.temp)}°C`;
    this.feelsLike.textContent = `${Math.round(data.main.feels_like)}°C`;
    this.humidity.textContent = `${data.main.humidity}%`;
    this.windSpeed.textContent = `${data.wind.speed} km/h`;
    
    // Set weather icon based on weather condition
    this.updateWeatherIcon(data.weather[0].main);
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
        <p>${article.description}</p>
        <div class="news-meta">
          <span class="news-source">${article.source.name}</span>
          <span class="news-date">${publishedDate}</span>
        </div>
      `;
      
      this.newsContainer.appendChild(articleElement);
    });
  }

  updateWeatherIcon(weatherMain) {
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
    
    this.weatherIcon.className = iconMap[weatherMain] || 'fas fa-sun';
  }

  getRandomWeather() {
    const conditions = ['Clear', 'Clouds', 'Rain', 'Drizzle', 'Snow', 'Mist'];
    return conditions[Math.floor(Math.random() * conditions.length)];
  }

  getRandomWeatherDescription() {
    const descriptions = [
      'clear sky', 'few clouds', 'scattered clouds', 'broken clouds',
      'light rain', 'moderate rain', 'light snow', 'mist'
    ];
    return descriptions[Math.floor(Math.random() * descriptions.length)];
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