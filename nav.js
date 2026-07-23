
(function(){
  var toggle=document.getElementById('navToggle');
  var links=document.querySelector('.links');
  if(!toggle||!links)return;
  function closeMenu(){links.classList.remove('open');toggle.setAttribute('aria-expanded','false')}
  function openMenu(){links.classList.add('open');toggle.setAttribute('aria-expanded','true')}
  toggle.addEventListener('click',function(){
    if(links.classList.contains('open')){closeMenu()}else{openMenu()}
  });
  links.querySelectorAll('a').forEach(function(a){a.addEventListener('click',closeMenu)});
  document.addEventListener('click',function(e){
    if(!links.classList.contains('open'))return;
    if(links.contains(e.target)||toggle.contains(e.target))return;
    closeMenu();
  });
  window.addEventListener('resize',function(){if(window.innerWidth>900)closeMenu()});
})();
