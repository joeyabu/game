const startBtn = document.querySelector('.start-btn');
const jumpBtn = document.querySelector('.jump-btn');
const resetBtn = document.querySelector('.reset-btn');
const truck = document.querySelector('.truck');
const tatsuro = document.querySelector('.tatsuro');
const message = document.querySelector('.message');
let truckInterval;

function getRandomSpeed() {
  const speeds = [5, 8, 12];
  return speeds[Math.floor(Math.random() * speeds.length)];
}

function resetGame() {
  clearInterval(truckInterval);
  truck.style.right = '0';
  truck.style.bottom = 'calc(33.33%)';
  tatsuro.style.bottom = '50px';
  tatsuro.style.transform = 'rotate(0deg)';
  message.style.display = 'none';
  startBtn.disabled = false;
}

startBtn.addEventListener('click', () => {
  startBtn.disabled = true;
  const speed = getRandomSpeed();

  truckInterval = setInterval(() => {
    truck.style.right = `${parseInt(truck.style.right || 0) + speed}px`;
  }, 10);
});

jumpBtn.addEventListener('click', () => {
  clearInterval(truckInterval);
  tatsuro.style.bottom = '25%';
  tatsuro.style.transform = 'translateY(-50%)';

  setTimeout(() => {
    const truckRect = truck.getBoundingClientRect();
    const tatsuroRect = tatsuro.getBoundingClientRect();
    const distance = truckRect.left - (tatsuroRect.right);

    message.classList.remove('success', 'failure', 'no-guts');
    message.style.display = 'block';
    if (distance < 0) {
      tatsuro.style.transform = 'translateY(-50%) rotate(-90deg)';
      message.style.left = `${truckRect.left}px`; // road.pngに被らないように位置を修正
      message.style.top = `${tatsuroRect.top - 50}px`; // road.pngに被らないように位置を修正
      message.textContent = '死○じゃった';
      message.classList.add('failure');
    } else if (distance <= 35) {
      message.textContent = '僕は死にませーん';
      message.classList.add('success');
    } else {
      message.style.left = `${tatsuroRect.right}px`; // road.pngに被らないように位置を修正
      message.style.top = `${tatsuroRect.top - 50}px`; // road.pngに被らないように位置を修正
      message.textContent = '根性なし';
      message.classList.add('no-guts');
    }
  }, 500);
});

resetBtn.addEventListener('click', () => {
  resetGame();
});

resetGame();
