const playSound = e => {
  const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
  const drum = document.querySelector(`div[data-key="${e.keyCode}"]`);

  if (!audio) return;

  drum.classList.add('playing');

  // reset sample to beginning in case key is pressed quickly
  audio.currentTime = 0;
  audio.play();
}

const removeTransitionEffect = e => {
  if (e.propertyName !== 'transform') return;

  e.target.classList.remove('playing');
}

// turn nodeList into an array
const drums = [...document.querySelectorAll('.drum')];
drums.forEach(drum => drum.addEventListener('transitionend', removeTransitionEffect));

window.addEventListener('keydown', playSound);
