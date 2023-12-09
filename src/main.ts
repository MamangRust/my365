import { isPermissionGranted, requestPermission, sendNotification } from '@tauri-apps/api/notification'

let timer: any;
let minutes = 25;
let seconds = 0;
let isRunning = false;

const startBtn = document.getElementById('startBtn')!;
const resetBtn = document.getElementById('resetBtn')!;
const timerDisplay = document.getElementById('timer') as any;
const inputMinutes = document.getElementById('inputMinutes') as any;


const toggleDarkModeBtn = document.getElementById('toggleDarkMode')!;
const moonIcon = toggleDarkModeBtn.querySelector('.fa-moon') as any;
const sunIcon = toggleDarkModeBtn.querySelector('.fa-sun') as any;

toggleDarkModeBtn.addEventListener('click', () => {
  const body = document.body;
  const isDarkMode = body.classList.toggle('dark');

 
  if (isDarkMode) {
    moonIcon.classList.remove('invisible');
    sunIcon.classList.add('invisible');
  } else {
    moonIcon.classList.add('invisible');
    sunIcon.classList.remove('invisible');
  }
});

async function MySendNotification() {
  let permissionGranted = await isPermissionGranted();
  if (!permissionGranted) {
    const permission = await requestPermission();
    permissionGranted = permission === 'granted';
  }
  if (permissionGranted) {
    
    sendNotification({ title: 'My Test Pomodoro App', body: 'Waktu nya Rehat Bro!!' });
  }
}


function startTimer() {
  if (!isRunning) {
    minutes = parseInt(inputMinutes.value) || 25; 
    seconds = 0;
    displayTime();
    timer = setInterval(updateTimer, 1000);
    isRunning = true;
    startBtn.textContent = 'Pause';
    resetBtn.style.display = 'inline-block';
  } else {
    pauseTimer();
  }
}



function pauseTimer() {
  clearInterval(timer);
  isRunning = false;
  startBtn.textContent = 'Resume';
}

function resetTimer() {
  clearInterval(timer);
  isRunning = false;
  minutes = parseInt(inputMinutes.value) || 25;
  seconds = 0;
  displayTime();
  startBtn.textContent = 'Start';
  resetBtn.style.display = 'none';

  
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  timerDisplay.textContent = `${formattedMinutes}:00`;
}



function updateTimer() {
  if (seconds === 0) {
    if (minutes === 0) {
      clearInterval(timer);
      isRunning = false;
      MySendNotification();
      alert("Udah Rehat Bro!!!");
      return;
    }
    minutes--;
    seconds = 59;
  } else {
    seconds--;
  }
  displayTime();
}

function displayTime() {
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
  timerDisplay.textContent = `${formattedMinutes}:${formattedSeconds}`;
}

startBtn.addEventListener('click', () => {
  if (!isRunning) {
    startTimer();
  } else {
    pauseTimer();
  }
});

resetBtn.addEventListener('click', resetTimer);

displayTime();
