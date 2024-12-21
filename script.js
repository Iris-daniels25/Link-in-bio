// Show/Hide the contact form when the "Let's Connect!" button is clicked
document.getElementById('show-form-button').addEventListener('click', function () {
  const form = document.getElementById('contact-form');
  if (form.style.display === 'block') {
    form.style.display = 'none'; // Hide the form if already visible
  } else {
    form.style.display = 'block'; // Show the form
    form.classList.remove('hidden'); // Remove the hidden class
  }
});

// Add fade-in effect to elements when scrolling
const fadeElements = document.querySelectorAll('.fade-in');

window.addEventListener('scroll', () => {
  fadeElements.forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 50) { // Trigger 50px before entering the viewport
      el.classList.add('show');
    }
  });
});

// Toggle dark mode and update the toggle icon
const themeToggle = document.getElementById('theme-toggle');
const toggleIcon = document.querySelector('.fa-solid'); // Use a general selector for the Font Awesome icon

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  toggleIcon.classList.toggle('fa-toggle-on');
  toggleIcon.classList.toggle('fa-toggle-off');
});

const text = "I’m a computer science student passionate about growing and learning in the tech field.";
let index = 0;

function typeEffect() {
  const dynamicText = document.getElementById('dynamic-text');
  dynamicText.textContent += text[index];
  index++;
  if (index < text.length) {
    setTimeout(typeEffect, 100);
  }
}
typeEffect();

// WeatherStack API for Current Weather
const apiKey = 'da5c866bd688c2d3588240d143c04512'; // Your WeatherStack API key
const city = 'Chicago'; // City to fetch weather for
const weatherWidget = document.getElementById('weather-widget');
const weatherText = document.getElementById('weather-text');

// Fetch current weather data from WeatherStack API
async function fetchWeather() {
  try {
    const response = await fetch(`https://api.weatherstack.com/current?access_key=${apiKey}&query=${city}&units=f`);
    const data = await response.json();
    console.log("API Response:", data); // Debug log to verify response

    if (data.success !== false) {
      const temp = data.current.temperature; // Temperature in Fahrenheit
      const description = data.current.weather_descriptions[0]; // Weather description
      const icon = data.current.weather_icons[0]; // Weather icon URL

      // Update the weather widget
      weatherText.innerHTML = `
        <div style="text-align: center;">
          <img src="${icon}" alt="${description}" style="width: 30px; vertical-align: middle;">
          <div>${city}: ${temp}°F</div>
          <div>${description}</div>
        </div>
      `;
    } else {
      weatherText.textContent = 'Unable to fetch weather data.';
      console.error("Error Response:", data.error.info);
    }
  } catch (error) {
    weatherText.textContent = 'Error fetching weather data.';
    console.error("Fetch Error:", error);
  }
}

// Call the fetchWeather function
fetchWeather();
