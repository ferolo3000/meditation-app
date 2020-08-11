const container = document.getElementById('container');
const musicContainer = document.getElementById('music-container');
const text = document.getElementById('text');
const bgVideo = document.getElementById('video-bg');
const pointer = document.getElementById('pointer-bg');
const pointerDot = document.getElementById('pointer-dot');
const timer = document.getElementById('countdown');
const width = window.innerWidth;

const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

const audio = document.getElementById('audio');

// Song titles
const songs = ['betterdays', 'meditation', 'slowmotion'];

// Keep track of song
let songIndex = 2;

// Initially load song details into DOM
loadSong(songs[songIndex]);

// Update song details & background
function loadSong(song) {
  audio.src = `music/${song}.mp3`;

  if (width > 800) {
    if (song === 'betterdays') {
      bgVideo.src = 'images/jungle.mp4';
    } else if (song === 'meditation') {
      bgVideo.src = 'images/water.mp4';
    } else {
      bgVideo.src = 'images/sun.mp4';
    }
  } else {
    bgVideo.style.visibility = 'hidden';
    if (song === 'betterdays') {
      document.body.style.background = 'url(images/lake.jpg) no-repeat center';
    } else if (song === 'meditation') {
      document.body.style.background = 'url(images/trees.jpg) no-repeat center';
    } else {
      document.body.style.background =
        'url(images/forest.jpg) no-repeat center';
    }
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

// Previous song
function prevSong() {
  songIndex--;

  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }

  loadSong(songs[songIndex]);

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

  clearTimeout(hold);
  clearTimeout(breathe);
  clearInterval(breatheSetTime);
  container.classList.remove('grow');
  container.classList.remove('shrink');
  text.innerText = '';
}

// Breathing animation
const totalTime = 7500;
const breatheTime = (totalTime / 5) * 2;
const holdTime = totalTime / 5;

var hold;
var breathe;

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

var breatheSetTime;
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

// Change song
//prevBtn.addEventListener('click', prevSong);
//nextBtn.addEventListener('click', nextSong);

prevBtn.addEventListener('click', () => {
  container.style.visibility = 'visible';
  pointerDot.style.visibility = 'hidden';

  const isPlaying = musicContainer.classList.contains('play');
  if (isPlaying) {
    stopSong();
  } else if (musicContainer.classList.contains('stop')) {
    playSong();
  } else {
    prevSong();
    counterSong();
  }
});

nextBtn.addEventListener('click', () => {
  container.style.visibility = 'visible';
  pointerDot.style.visibility = 'hidden';

  const isPlaying = musicContainer.classList.contains('play');
  if (isPlaying) {
    stopSong();
  } else if (musicContainer.classList.contains('stop')) {
    playSong();
  } else {
    nextSong();
    counterSong();
  }
});

// Song ends
audio.addEventListener('ended', nextSong);
