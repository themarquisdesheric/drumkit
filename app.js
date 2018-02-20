const playSound = e => {
  const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
  const drum = document.querySelector(`div[data-key="${e.keyCode}"]`);

  if (!audio) return;

  drum.classList.add('playing');

  audio.currentTime = 0;
  audio.play();
}

window.addEventListener('keydown', playSound);