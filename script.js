const audio = document.getElementById("audioPlayer");
const songList = document.getElementById("songList");


// ===============================
// TUNEFLOW 14 SONGS
// ===============================

const songs = [

    {
        name: "Samjhawan",
        artist: "Arijit Singh",
        file: "song1.mp3",
        cover: "🎶"
    },

    {
        name: "Bairan",
        artist: "TuneFlow",
        file: "song2.mp3",
        cover: "🎵"
    },

    {
        name: "Kabhi Kabhi Aditi",
        artist: "Rashid Ali",
        file: "song3.mp3",
        cover: "☀️"
    },

    {
        name: "Hood Life",
        artist: "TuneFlow",
        file: "song4.mp3",
        cover: "🔥"
    },

    {
        name: "Inkem Inkem Inkem Kaavaale",
        artist: "Sid Sriram",
        file: "song5.mp3",
        cover: "🎵"
    },

    {
        name: "Vachindamma",
        artist: "Sid Sriram",
        file: "song6.mp3",
        cover: "💙"
    },

    {
        name: "Lalbaugcha Raja",
        artist: "TuneFlow",
        file: "song7.mp3",
        cover: "🙏"
    },

    {
        name: "Kaakan",
        artist: "TuneFlow",
        file: "song8.mp3",
        cover: "🎶"
    },

    {
        name: "Navasachi Gauri Mazi",
        artist: "TuneFlow",
        file: "song9.mp3",
        cover: "🌺"
    },

    {
        name: "Arz Kiya Hai",
        artist: "Coke Studio Bharat",
        file: "song10.mp3",
        cover: "🎤"
    },

    {
        name: "Man Dhaga Dhaga",
        artist: "TuneFlow",
        file: "song11.mp3",
        cover: "🧵"
    },

    {
        name: "Ishq Hai",
        artist: "TuneFlow",
        file: "song12.mp3",
        cover: "❤️"
    },

    {
        name: "Ganpati Aale",
        artist: "TuneFlow",
        file: "song13.mp3",
        cover: "🙏"
    },

    {
        name: "Perfect",
        artist: "Ed Sheeran",
        file: "song14.mp3",
        cover: "💙"
    }

];


let currentIndex = -1;
let isPlaying = false;


// ===============================
// DISPLAY ALL SONGS
// ===============================

function displaySongs(list = songs) {

    songList.innerHTML = "";

    list.forEach((song) => {

        const originalIndex = songs.indexOf(song);

        const card = document.createElement("div");

        card.className = "song-card";

        card.setAttribute("data-name", song.name.toLowerCase());

        card.innerHTML = `

            <div class="song-info">

                <div class="album-cover">
                    ${song.cover}
                </div>

                <div>
                    <h3>${song.name}</h3>
                    <p>${song.artist}</p>
                </div>

            </div>

            <div class="song-actions">

                <button
                    class="heart"
                    onclick="likeSong(this)">
                    ♡
                </button>

                <button
                    class="play-btn"
                    onclick="playSong(${originalIndex})">
                    ▶
                </button>

            </div>

        `;

        songList.appendChild(card);

    });

}


// ===============================
// PLAY SONG
// ===============================

function playSong(index) {

    if (index < 0 || index >= songs.length) {
        return;
    }

    currentIndex = index;

    const song = songs[currentIndex];

    audio.src = song.file;

    document.getElementById("currentSong").innerText =
        song.name;

    document.getElementById("currentArtist").innerText =
        song.artist;

    document.getElementById("miniCover").innerText =
        song.cover;

    audio.play();

    isPlaying = true;

    updatePlayButton();

}


// ===============================
// PLAY / PAUSE
// ===============================

function togglePlayer() {

    if (currentIndex === -1) {

        playSong(0);

        return;
    }

    if (audio.paused) {

        audio.play();

        isPlaying = true;

    } else {

        audio.pause();

        isPlaying = false;

    }

    updatePlayButton();

}


// ===============================
// PLAY BUTTON
// ===============================

function updatePlayButton() {

    const button =
        document.querySelector(".main-play");

    if (isPlaying) {

        button.innerText = "⏸";

    } else {

        button.innerText = "▶";

    }

}


// ===============================
// NEXT SONG
// ===============================

function nextSong() {

    if (currentIndex === -1) {

        playSong(0);

        return;
    }

    // STOP AFTER SONG 14
    if (currentIndex >= songs.length - 1) {

        audio.pause();

        audio.currentTime = 0;

        isPlaying = false;

        updatePlayButton();

        document.getElementById("currentSong").innerText =
            "Playlist Finished";

        document.getElementById("currentArtist").innerText =
            "14 songs completed";

        return;
    }

    currentIndex++;

    playSong(currentIndex);

}


// ===============================
// PREVIOUS SONG
// ===============================

function previousSong() {

    if (currentIndex <= 0) {

        playSong(0);

        return;
    }

    currentIndex--;

    playSong(currentIndex);

}


// ===============================
// AUTO NEXT
// ===============================

audio.addEventListener("ended", function() {

    if (currentIndex < songs.length - 1) {

        currentIndex++;

        playSong(currentIndex);

    } else {

        // STOP AFTER 14TH SONG

        isPlaying = false;

        updatePlayButton();

        document.getElementById("currentSong").innerText =
            "Playlist Finished";

        document.getElementById("currentArtist").innerText =
            "14 songs completed";

    }

});


// ===============================
// VOLUME
// ===============================

const volumeSlider =
    document.getElementById("volumeSlider");

volumeSlider.addEventListener("input", function() {

    audio.volume = this.value / 100;

});

audio.volume = 0.8;


// ===============================
// SEARCH
// ===============================

function searchSongs() {

    const search =
        document.getElementById("searchInput")
        .value
        .toLowerCase();

    const filteredSongs =
        songs.filter(song =>
            song.name.toLowerCase().includes(search)
        );

    displaySongs(filteredSongs);

}


// ===============================
// LIKE
// ===============================

function likeSong(button) {

    button.classList.toggle("liked");

    if (button.classList.contains("liked")) {

        button.innerText = "♥";

    } else {

        button.innerText = "♡";

    }

}


// ===============================
// EXPLORE MUSIC
// ===============================

function scrollToSongs() {

    document.getElementById("songs")
        .scrollIntoView({
            behavior: "smooth"
        });

}


// ===============================
// LOAD SONGS
// ===============================

displaySongs();
// ===============================
// NAVIGATION
// ===============================

function scrollToSongs() {
    document.getElementById("songs").scrollIntoView({
        behavior: "smooth"
    });
}


// ===============================
// LOGIN
// ===============================

function loginUser() {

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const message = document.getElementById("loginMessage");

    if (username === "" || password === "") {

        message.innerText = "Please enter username and password.";
        message.style.color = "#ff5555";

        return;
    }

    message.innerText = "Login successful! 🎵";
    message.style.color = "#00ff73";
}
function loginUser() {

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const message = document.getElementById("loginMessage");

    if (username === "" || password === "") {

        message.innerText = "Please enter username and password.";
        message.style.color = "red";

        return;
    }

    message.innerText = "Login successful! 🎵";
    message.style.color = "#00df65";
}
