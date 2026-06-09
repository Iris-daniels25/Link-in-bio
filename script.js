const connectButton = document.getElementById('show-form-button');
const contactForm = document.getElementById('contact-form');

if (connectButton && contactForm) {
  connectButton.addEventListener('click', function () {
    if (contactForm.style.display === 'block') {
      contactForm.style.display = 'none';
    } else {
      contactForm.style.display = 'block';
      contactForm.classList.remove('hidden');
    }
  });
}
