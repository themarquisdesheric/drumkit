const playSound = e => {
  const keyCode = e.keyCode || e.target.getAttribute('data-key') || e.path[1].getAttribute('data-key');
  const audio = document.querySelector(`audio[data-key="${keyCode}"]`);
  const drum = document.querySelector(`div[data-key="${keyCode}"]`);

  if (!audio) return;
  
  drum.classList.add('playing', drumColors[keyCode]);
  
  // reset sample to beginning in case trigger is pressed too quickly
  audio.currentTime = 0;
  audio.play();
}

const removeTransitionEffects = e => {
  const [drum, ...rest] = e.target.classList;
  
  if (e.propertyName !== 'transform') return;
  
  // sometimes several classes get added if trigger is pressed too quickly, so remove all classes but the first
  e.target.classList.remove(...rest);
}

const drums = Array.from(document.querySelectorAll('.drum'));
const colors = ['red', 'orange', 'yellow', 'green', 'blue'];
const drumColors = {}; 
let count = 0;

drums.forEach( (drum, i) => {
  const key = drum.getAttribute('data-key');

  if (i === 5) count = 0;
  
  drumColors[key] = colors[count];
  count++;

  drum.addEventListener('click', playSound)
  drum.addEventListener('transitionend', removeTransitionEffects);
});

window.addEventListener('keydown', playSound);
