const startBtn = document.querySelector('.start-btn');
const jumpBtn = document.querySelector('.jump-btn');
const resetBtn = document.querySelector('.reset-btn');
const truck = document.querySelector('.truck');
const tatsuro = document.querySelector('.tatsuro');
const message = document.querySelector('.message');
const ruleMessage = document.querySelector('.rule-message');
let truckInterval;

function getRandomSpeed() {
  const speeds = [5, 8, 10];
  return speeds[Math.floor(Math.random() * speeds.length)];
}

function resetGame() {
    clearInterval(truckInterval);
    truck.style.right = '-50px';
    truck.style.top = 'calc(350px)'; // 修正
    tatsuro.style.left = 'calc(25px)'; // 修正
    tatsuro.style.bottom = '130px'; // 修正
    tatsuro.style.transform = 'translate(-50%, 0)'; // 修正
    message.style.display = 'none';
    startBtn.disabled = false;
  }

startBtn.addEventListener('click', () => {
  startBtn.disabled = true;
  ruleMessage.style.display = 'none';
  const speed = getRandomSpeed();

  truckInterval = setInterval(() => {
    truck.style.right = `${parseInt(truck.style.right || 0) + speed}px`;
  }, 10);
});

jumpBtn.addEventListener('click', () => {
  clearInterval(truckInterval);
  tatsuro.style.bottom = '30%';
  tatsuro.style.transform = 'translateY(-50%)';

  setTimeout(() => {
    const truckRect = truck.getBoundingClientRect();
    const tatsuroRect = tatsuro.getBoundingClientRect();
    const distance = truckRect.left - (tatsuroRect.right);
    const absDistance = Math.abs(distance);

    message.classList.remove('success', 'failure', 'no-guts');
    message.style.display = 'block';
    if (distance <= 0 && absDistance <= (truckRect.width + tatsuroRect.width) / 2 + 50) {
      tatsuro.style.transform = 'translateY(-50%) rotate(-90deg)';
      message.style.left = `${tatsuroRect.right}px`; // road.pngに被らないように位置を修正
      message.style.top = `${tatsuroRect.top - 30}px`; // road.pngに被らないように位置を修正
      message.textContent = '死○じゃった';
      message.classList.add('failure');
    } else if (distance > 0 && absDistance <= 35) {
      message.textContent = '僕は死にませーん';
      message.classList.add('success');
      message.style.left = `${tatsuroRect.left + tatsuroRect.width / 2 + 10}px`; // 位置を修正
      message.style.top = `${tatsuroRect.top - message.offsetHeight}px`; // 位置を修正
    } else {
      message.style.left = `${tatsuroRect.left + tatsuroRect.width / 2}px`; // 位置を修正
      message.style.top = `${tatsuroRect.top - 15}px`; // 位置を修正
      message.textContent = '根性なし';
      message.classList.add('no-guts');
    }
  }, 500);
});

resetBtn.addEventListener('click', () => {
  resetGame();
});

resetGame();
