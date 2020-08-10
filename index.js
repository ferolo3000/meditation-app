const container = document.getElementById('container');
const musicContainer = document.getElementById('music-container');
const text = document.getElementById('text');
const bgVideo = document.getElementById('video-bg');
const pointer = document.getElementById('pointer-bg');
const pointerDot = document.getElementById('pointer-dot');
const timer = document.getElementById('countdown');

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

// Update song details
function loadSong(song) {

    audio.src = `music/${song}.mp3`;

    if (song === "betterdays") {
        bgVideo.src = 'https://ferolobucket.s3.amazonaws.com/water.mp4';
    } else if (song === "meditation") {
        bgVideo.src = 'https://ferolobucket.s3.amazonaws.com/jungle.mp4';
    } else {
        bgVideo.src = 'https://ferolobucket.s3.amazonaws.com/river.mp4';
    }
}

// Play song/video
function playSong() {
    musicContainer.classList.remove('pause')
    musicContainer.classList.add('play');
    playBtn.querySelector('i.fas').classList.remove('fa-play');
    playBtn.querySelector('i.fas').classList.add('fa-pause');
    container.style.visibility = 'visible';
    pointerDot.style.visibility = 'visible';
    audio.play();
}

// Pause song/video
function pauseSong() {
    musicContainer.classList.remove('play');
    musicContainer.classList.add('pause');
    playBtn.querySelector('i.fas').classList.add('fa-play');
    playBtn.querySelector('i.fas').classList.remove('fa-pause');
    container.style.visibility = 'hidden'

    audio.pause();
}

// Previous song
function prevSong() {
    songIndex--;

    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }

    loadSong(songs[songIndex]);

    playSong();
}

// Next song
function nextSong() {
    songIndex++;

    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }

    loadSong(songs[songIndex]);

    playSong();
}

// Pointer animation
const totalTime = 7500;
const breatheTime = (totalTime / 5) * 2;
const holdTime = totalTime / 5;

function breathAnimation() {
    text.innerText = 'Breathe In!';
    container.className = 'container grow';

    setTimeout(() => {
        text.innerText = 'Hold';

        setTimeout(() => {
            text.innerText = 'Breathe Out!';
            container.className = 'container shrink';
        }, holdTime);
    }, breatheTime);
}

// Play song
playBtn.addEventListener('click', () => {
    container.style.visibility = 'visible';
    pointerDot.style.visibility = 'hidden';

    const isPlaying = musicContainer.classList.contains('play');
    if (isPlaying) {
        pauseSong();
    } else if (musicContainer.classList.contains('pause')) {
        playSong();
    } else {
        var timeleft = 3;
        var downloadTimer = setInterval(function () {
            if (timeleft <= 0) {
                clearInterval(downloadTimer);
                document.getElementById("countdown").innerHTML = '';
                playSong();
                breathAnimation();
                setInterval(breathAnimation, totalTime);
            } else {
                document.getElementById("countdown").innerHTML = timeleft;
            }
            timeleft -= 1;
        }, 1000);
    }
});

// Change song
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

// Song ends
audio.addEventListener('ended', nextSong);