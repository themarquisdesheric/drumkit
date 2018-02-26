const playSound = ({ keyCode }) => {
  const audio = document.querySelector(`audio[data-key="${keyCode}"]`);
  const drum = document.querySelector(`div[data-key="${keyCode}"]`);

  if (!audio) return;

  if (keyCount % 5 === 0) changeBackground();

  drum.classList.add('playing', drumColors[keyCode]);
  
  // reset sample to beginning in case trigger is pressed too quickly
  audio.currentTime = 0;
  audio.play();
  keyCount++;
}

const removeTransitionEffects = e => {
  const [drum, ...rest] = e.target.classList;
  
  if (e.propertyName !== 'transform') return;
  
  // sometimes several classes get added if trigger is pressed too quickly, so remove all classes but the first
  e.target.classList.remove(...rest);
}

const getRandomColor = () => {
  const randomInt = Math.floor(Math.random() * colors.length);
  return colors[randomInt];
}

const changeBackground = () => {
  const currentBackground = wrapper.classList[0];
  let newBackground = `${getRandomColor()}-background`;

  while (currentBackground === newBackground) {
    newBackground = `${getRandomColor()}-background`;
  }

  wrapper.classList.remove(currentBackground);
  wrapper.classList.add(newBackground);
}

const wrapper = document.getElementById('wrapper'), 
  drums = Array.from(document.querySelectorAll('.drum')),
  colors = ['orange', 'yellow', 'violet', 'green', 'blue', 'red'],
  drumColors = {}; 
  
let count = 0,
  keyCount = 1;

drums.forEach( (drum, i) => {
  const keyCode = drum.getAttribute('data-key');

  // reset and stagger colors
  if (i === 6) count = 1;
  
  drumColors[keyCode] = colors[count];
  count++;
  
  drum.addEventListener('transitionend', removeTransitionEffects);
  drum.addEventListener('click', e => {
    e.stopPropagation();
    playSound({ keyCode })
  });
  drum.firstElementChild
    .addEventListener('touchstart', e => {
    // prevent mouse event from firing
    e.preventDefault();
    playSound({ keyCode });
  });
});

window.addEventListener('keydown', playSound);
