(function () {
  var toggle = document.getElementById('navToggle');
  var links = document.querySelector('.links');
  if (!toggle || !links) return;

  function closeMenu() { links.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); }
  function openMenu() { links.classList.add('open'); toggle.setAttribute('aria-expanded', 'true'); }
  function closeDropdowns() {
    document.querySelectorAll('.nav-dropdown.open').forEach(function (o) { o.classList.remove('open'); });
  }

  toggle.addEventListener('click', function () {
    if (links.classList.contains('open')) { closeMenu(); } else { openMenu(); }
  });

  // Services (or any) dropdown: click toggles open/closed on ALL screen sizes
  document.querySelectorAll('.nav-dropdown').forEach(function (dd) {
    var trigger = dd.querySelector('a');
    trigger.addEventListener('click', function (e) {
      e.preventDefault();
      var isOpen = dd.classList.contains('open');
      closeDropdowns();
      if (!isOpen) dd.classList.add('open');
    });
  });

  links.querySelectorAll('a').forEach(function (a) {
    if (a.closest('.nav-dropdown-menu')) {
      a.addEventListener('click', function () {
        closeMenu();
        closeDropdowns();
      });
    } else if (!a.closest('.nav-dropdown')) {
      a.addEventListener('click', function () {
        if (window.innerWidth <= 900) closeMenu();
      });
    }
  });

  document.addEventListener('click', function (e) {
    if (links.contains(e.target) || toggle.contains(e.target)) return;
    closeMenu();
    closeDropdowns();
  });

  window.addEventListener('resize', function () {
    if (window.innerWidth > 900) {
      closeMenu();
    }
  });
})();