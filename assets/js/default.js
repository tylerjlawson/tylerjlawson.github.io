function resizeHeaderOnScroll() {
  const distanceY = window.pageYOffset || document.documentElement.scrollTop,
  shrinkOn = 100,
  headerEl = document.getElementById('js-header');
  
  if (distanceY > shrinkOn) {
    headerEl.classList.add("Shrink");
  } else {
    headerEl.classList.remove("Shrink");
  }
}

window.addEventListener('scroll', resizeHeaderOnScroll);


