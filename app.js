
// make background change to a random color each keystroke

// assign random color to each drum instead of cycling at random? 

const playSound = e => {
  const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
  const drum = document.querySelector(`div[data-key="${e.keyCode}"]`);

  if (!audio) return;

  drum.classList.add(getRandomColor());

  // reset sample to beginning in case trigger is pressed too quickly
  audio.currentTime = 0;
  audio.play();
}

const removeTransitionEffect = e => {
  const [drum, ...rest] = e.target.classList;

  if (e.propertyName !== 'transform') return;

  // sometimes several classes get added if trigger is pressed too quickly, so remove all classes but the first
  e.target.classList.remove(...rest);
}

const getRandomColor = () => {
  const colors = ['pastel-red', 'pastel-orange', 'pastel-yellow', 'pastel-green', 'pastel-blue'];
  const randomInt = Math.floor(Math.random() * colors.length);

  return colors[randomInt];
}

// turn nodeList into an array
const drums = [...document.querySelectorAll('.drum')];
drums.forEach(drum => drum.addEventListener('transitionend', removeTransitionEffect));

window.addEventListener('keydown', playSound);
