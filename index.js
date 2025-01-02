const container = document.getElementById('container');
const musicContainer = document.getElementById('music-container');
const text = document.getElementById('text');
const bgVideo = document.getElementById('video-bg');
const circleContent = document.getElementById('circleContent-bg');

const timer = document.getElementById('countdown');
const appTimeLeft = document.getElementById('countdownTime');
var timeContainer = document.getElementById('select-time');

var modal = document.querySelector('.modal');
var quoteText = document.getElementById('quote');
var authorText = document.getElementById('author');
var closeButton = document.querySelector('.close-button');

const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const audio = document.getElementById('audio');

const totalTime = 13000;
const breatheTime = 5000;
const holdTime = 3000;

var hold;
var breathe;
var breatheSetTime;
var myTime;
var setTimeApp;

// Song titles
const songs = ['Breathe Deep', 'Inner Peace'];

// Quotes
const quotes = [{
    quote: 'Quiet the mind, and the soul will speak.',
    author: 'Ma Jaya Sati Bhagavati',
  },
  {
    quote: 'Learn to be calm and you will always be happy.',
    author: 'Paramahansa Yogananda',
  },
  {
    quote: 'When you own your breath, nobody can steal your peace.',
    author: 'Unknown',
  },
  {
    quote: 'if the ocean can calm itself, so can you.',
    author: 'Nayyirah Waheed',
  },
  {
    quote: 'To understand the immeasurable, the mind must be extraordinarily quiet, still.',
    author: 'Jiddu Krishnamurti',
  },
];

var index = Math.floor(Math.random() * quotes.length);

// Keep track of song
let songIndex = 3;

// Initially load song details into DOM
loadSong(songs[songIndex]);

// Update song details & background
function loadSong(song) {
  audio.src = `music/${song}.mp3`;

  if (song === 'betterdays') {
    bgVideo.src = 'images/jungle.mp4';
  } else if (song === 'calm') {
    bgVideo.src = 'images/water.mp4';
  } else if (song === 'flute') {
    bgVideo.src = 'images/mountain.mp4';
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
  prevBtn.style.display = 'none';
  nextBtn.style.display = 'none';
  timeContainer.style.display = 'none';
  
 // audio.load();
  audio.play();
}

// Stop song/video
function stopSong() {
  musicContainer.classList.remove('play');
  playBtn.querySelector('i.fas').classList.add('fa-play');
  playBtn.querySelector('i.fas').classList.remove('fa-stop');
  container.style.visibility = 'hidden';
  container.classList.remove('grow');
  container.classList.remove('shrink');
  audio.pause();
  audio.currentTime = 0;

  clearTimeout(hold);
  clearTimeout(breathe);
  clearInterval(breatheSetTime);
  clearTimeout(myTime);

  appTimeLeft.style.visibility = 'hidden';
  prevBtn.style.display = 'flex';
  nextBtn.style.display = 'flex';
  timeContainer.style.display = 'flex';
  appTimeLeft.innerText = '0:00';
  text.innerText = '';
}

// Next song
function nextSong() {
  songIndex--;

  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playSong();
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

// Initialize App
function initApp() {
  setTimeApp = timeContainer.value;
  audio.preload = 'auto';
  audio.load();
    
  if (setTimeApp === 'time') {
    stopSong();
    alert('Please, select a time.');
  } else {
    var timeleft = 3;
    var downloadTimer = setInterval(function () {
      if (timeleft <= 0) {
        clearInterval(downloadTimer);
        document.getElementById('countdown').innerHTML = '';
        appTimeLeft.style.visibility = 'visible';
        countdownMeditation(setTimeApp);
        playSong();
        breathAnimation();
        breatheSetTime = setInterval(breathAnimation, totalTime);
      } else {
        document.getElementById('countdown').innerHTML = timeleft;
      }
      timeleft -= 1;
    }, 1000);
  }
}

// Countdown Time for Meditation
function countdownMeditation(min) {
  var minute = min;
  var sec = 59;

  myTime = setInterval(function () {
    appTimeLeft.innerHTML =
      minute.toString() + ':' + (sec < 10 ? '0' : '') + sec.toString();
    sec--;
    if (sec == 00) {
      minute--;
      sec = 59;
      if (minute < 0) {
        clearTimeout(myTime);
        stopSong();
        appTimeLeft.style.visibility = 'hidden';
        appTimeLeft.innerText = '0:00';
        toggleModal();
      }
    }
  }, 1000);
}

// Play song
playBtn.addEventListener('click', () => {
  container.style.visibility = 'visible';
  const isPlaying = musicContainer.classList.contains('play');

  if (isPlaying) {
    stopSong();
  } else if (musicContainer.classList.contains('stop')) {
    initApp();
  } else {
    initApp();
  }
});

// Next song
nextBtn.addEventListener('click', () => {
  songIndex++;

  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
});

prevBtn.addEventListener('click', () => {
  songIndex--;

  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
});

// Song ends
audio.addEventListener('ended', nextSong);

// Modal
function toggleModal() {
  modal.classList.toggle('show-modal');
  quoteText.innerHTML = '" ' + quotes[index].quote + ' "';
  authorText.innerHTML = quotes[index].author;
  console.log(index);
}

closeButton.addEventListener('click', toggleModal);
