const container = document.getElementById('container');
const musicContainer = document.getElementById('music-container');
const text = document.getElementById('text');
const bgVideo = document.getElementById('video-bg');
const pointer = document.getElementById('pointer-bg');
const pointerDot = document.getElementById('pointer-dot');
const timer = document.getElementById('countdown');
const runTime = document.getElementById('countdownTime');
const width = window.innerWidth;

const playBtn = document.getElementById('play');
const audio = document.getElementById('audio');

const totalTime = 13000;
const breatheTime = 5000;
const holdTime = 3000;

var hold;
var breathe;
var breatheSetTime;

// Song titles
const songs = ['betterdays', 'calm', 'slowmotion'];

// Keep track of song
let songIndex = 2;

// Initially load song details into DOM
loadSong(songs[songIndex]);

// Update song details & background
function loadSong(song) {
  audio.src = `music/${song}.mp3`;

  if (song === 'betterdays') {
    bgVideo.src = 'images/jungle.mp4';
  } else if (song === 'calm') {
    bgVideo.src = 'images/water.mp4';
  } else {
    bgVideo.src = 'images/sun.mp4';
  }
}

// Play song/video
function playSong() {
  musicContainer.classList.remove('stop');
  musicContainer.classList.add('play');
  playBtn.querySelector('i.fas').classList.remove('fa-play');
  playBtn.querySelector('i.fas').classList.add('fa-stop');
  container.style.visibility = 'visible';
  pointerDot.style.visibility = 'visible';
  audio.play();
  countdownMeditation();
}

// Stop song/video
function stopSong() {
  musicContainer.classList.remove('play');
  //musicContainer.classList.add('stop');
  playBtn.querySelector('i.fas').classList.add('fa-play');
  playBtn.querySelector('i.fas').classList.remove('fa-stop');
  container.style.visibility = 'hidden';

  audio.pause();
  audio.currentTime = 0;
  clearTimeout(hold);
  clearTimeout(breathe);
  clearInterval(breatheSetTime);
  container.classList.remove('grow');
  container.classList.remove('shrink');
  text.innerText = '';
}

// Next song
function nextSong() {
  songIndex++;

  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }

  loadSong(songs[songIndex]);
  playBtn.querySelector('i.fas').classList.remove('fa-play');
  playBtn.querySelector('i.fas').classList.add('fa-stop');

  clearTimeout(hold);
  clearTimeout(breathe);
  clearInterval(breatheSetTime);
  container.classList.remove('grow');
  container.classList.remove('shrink');
  text.innerText = '';

  counterSong();
}

// Breathing animation
function breathAnimation() {
  text.innerText = 'Breathe In!';
  container.className = 'container grow';

  hold = setTimeout(() => {
    text.innerText = 'Hold';

    breathe = setTimeout(() => {
      text.innerText = 'Breathe Out!';
      container.className = 'container shrink';
    }, holdTime);
  }, breatheTime);
}

function counterSong() {
  var timeleft = 3;
  var downloadTimer = setInterval(function () {
    if (timeleft <= 0) {
      clearInterval(downloadTimer);
      document.getElementById('countdown').innerHTML = '';
      playSong();
      breathAnimation();
      breatheSetTime = setInterval(breathAnimation, totalTime);
    } else {
      document.getElementById('countdown').innerHTML = timeleft;
    }
    timeleft -= 1;
  }, 1000);
}

function countdownMeditation() {

  var minute = 4;
  var sec = 59;
  setInterval(function () {
    runTime.innerHTML = minute + " : " + sec;
    sec--;
    if (sec == 00) {
      minute--;
      sec = 60;
      if (minute == 0) {
        minute = 5;
      }
    }
  }, 1000);
}

// Play song
playBtn.addEventListener('click', () => {
  container.style.visibility = 'visible';
  pointerDot.style.visibility = 'hidden';

  const isPlaying = musicContainer.classList.contains('play');
  if (isPlaying) {
    stopSong();
  } else if (musicContainer.classList.contains('stop')) {
    counterSong();
  } else {
    counterSong();

  }
});

nextBtn.addEventListener('click', () => {
  container.style.visibility = 'visible';
  pointerDot.style.visibility = 'hidden';

  const isPlaying = musicContainer.classList.contains('play');
  if (isPlaying) {
    nextSong();
  } else if (musicContainer.classList.contains('stop')) {
    playSong();
  } else {
    nextSong();
    playSong();
    breathAnimation();
  }
});

// Song ends
audio.addEventListener('ended', nextSong);