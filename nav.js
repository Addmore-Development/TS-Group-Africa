(function () {
  var toggle = document.getElementById('navToggle');
  var links = document.querySelector('.links');
  if (!toggle || !links) return;

  function closeMenu() { links.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); }
  function openMenu() {
    // Guard against any page-level horizontal scroll/overflow so the
    // fixed mobile panel always opens flush with the left edge.
    window.scrollTo({ left: 0, behavior: 'auto' });
    links.classList.add('open');
    toggle.setAttribute('aria-expanded', 'true');
  }
  function closeDropdowns() {
    document.querySelectorAll('.nav-dropdown.open').forEach(function (o) { o.classList.remove('open'); });
  }

  toggle.addEventListener('click', function () {
    if (links.classList.contains('open')) { closeMenu(); } else { openMenu(); }
  });

  // Services dropdown: on mobile, tapping the trigger toggles the submenu open/closed.
  // On desktop it still opens on hover (see CSS); click also works and follows through
  // to the Services page if the dropdown is already open.
  document.querySelectorAll('.nav-dropdown').forEach(function (dd) {
    var trigger = dd.querySelector('a');
    trigger.addEventListener('click', function (e) {
      if (window.innerWidth <= 900) {
        e.preventDefault();
        var isOpen = dd.classList.contains('open');
        closeDropdowns();
        if (!isOpen) dd.classList.add('open');
      }
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
      closeDropdowns();
    }
  });
})();