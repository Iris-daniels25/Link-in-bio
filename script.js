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

const apiKey = 'e6ce5f21d3e82bf801b1a31a40a9b75e'; // Your OpenWeatherMap API key
const city = 'Chicago'; // Replace with your city or make it dynamic if needed
const weatherWidget = document.getElementById('weather-widget');
const weatherText = document.getElementById('weather-text');

// Fetch weather data from OpenWeatherMap API
async function fetchWeather() {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);
    const data = await response.json();

    if (data.cod === 200) {
      const temp = data.main.temp;
      const description = data.weather[0].description;
      const icon = data.weather[0].icon;

      // Update weather widget
      weatherText.innerHTML = `
        <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}" />
        ${city}: ${temp}°C, ${description.charAt(0).toUpperCase() + description.slice(1)}
      `;
    } else {
      weatherText.textContent = 'Unable to fetch weather data.';
    }
  } catch (error) {
    weatherText.textContent = 'Error fetching weather data.';
    console.error(error);
  }
}

// Call the fetchWeather function
fetchWeather();
