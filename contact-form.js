(function () {
  var form = document.getElementById('contactForm');
  var status = document.getElementById('formStatus');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    status.textContent = 'Sending...';
    status.classList.remove('form-status--success', 'form-status--error');

    fetch('https://formspree.io/f/mnjebrnn', {
      method: 'POST',
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    })
      .then(function (response) {
        if (response.ok) {
          form.reset();
          status.textContent = "Thanks — your enquiry has been sent. We'll be in touch soon.";
          status.classList.add('form-status--success');
        } else {
          return response.json().then(function (result) {
            var message = (result && result.errors)
              ? result.errors.map(function (err) { return err.message; }).join(', ')
              : 'Something went wrong. Please try again or email us directly.';
            status.textContent = message;
            status.classList.add('form-status--error');
          });
        }
      })
      .catch(function () {
        status.textContent = 'Network error — please try again or email us directly.';
        status.classList.add('form-status--error');
      });
  });
})();