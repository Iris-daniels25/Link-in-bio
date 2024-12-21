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
