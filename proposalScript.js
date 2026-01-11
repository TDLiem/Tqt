const music = document.getElementById('backgroundMusic');
let musicStarted = false;

let currentPage = 0;
let startY = 0;
let currentIndex = 0;
let slideInterval = null;
const pages = document.querySelectorAll('.page');
const dots = document.querySelectorAll('.dot');
const photos = ['pics/aodaido.jpg', 'pics/aodaihong1.jpg', 'pics/aodaixanhnhat.jpg', 'pics/dim1.jpg', 'pics/longbien.jpg'];

const firstMessageDate = new Date('2025-07-13 21:43');

function updateLoveTimer() {
    const now = new Date();
    const diff = now - firstMessageDate;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    document.getElementById('loveTimer').innerHTML =
        `${days} ngày ${hours} giờ ${minutes} phút`;
}

// Update timer immediately and every minute
updateLoveTimer();
setInterval(updateLoveTimer, 60000);

document.addEventListener('touchstart', handleTouchStart, false);
document.addEventListener('touchend', handleTouchEnd, false);

function handleTouchStart(evt) {
    startY = evt.touches[0].clientY;
}

function handleTouchEnd(evt) {
    if (!startY) return;

    const endY = evt.changedTouches[0].clientY;
    const diffY = startY - endY;

    // Swipe up (go back)
    if (diffY < -50 && currentPage > 0) {
        showPage(currentPage - 1);
    }
    // Swipe down (go next)  
    else if (diffY > 50 && currentPage < pages.length - 1) {
        showPage(currentPage + 1);
    }

    startY = 0;
}

function showPage(pageIndex) {
    // Always stop slideshow when changing pages
    stopSlideshow();
    // Hide current page
    pages[currentPage].classList.remove('active');
    dots[currentPage].classList.remove('active');
    // Show new page
    pages[pageIndex].classList.add('active');
    dots[pageIndex].classList.add('active');
    currentPage = pageIndex;

    if (pageIndex === 2) {
        startSlideshow();
    }
}

//album on page 3
function stopSlideshow() {
    if (slideInterval) {
        clearInterval(slideInterval);
        slideInterval = null;
    }
}

function startSlideshow() {
    stopSlideshow();
    slideInterval = setInterval(() => {
        currentIndex = (currentIndex + 1) % photos.length;
        showPhoto(currentIndex);
    }, 2000);
}

function showPhoto(index) {
    const mainPhoto = document.getElementById('currentPhoto');

    // Fade out
    mainPhoto.style.opacity = '0';

    setTimeout(() => {
        currentIndex = index;
        mainPhoto.src = photos[index];

        // Fade in
        mainPhoto.style.opacity = '1';

        // Update active thumbnail
        document.querySelectorAll('.thumb').forEach((thumb, i) => {
            thumb.classList.toggle('active', i === index);
        });
    }, 250); // Match CSS transition time
    //     currentIndex = index;
    // document.getElementById('currentPhoto').src = photos[index];

    // // Update active thumbnail
    // document.querySelectorAll('.thumb').forEach((thumb, i) => {
    //     thumb.classList.toggle('active', i === index);
    // });
}

// Keyboard support for testing
document.addEventListener('keydown', (evt) => {
    if (evt.key === 'ArrowDown' && currentPage < pages.length - 1) {
        showPage(currentPage + 1);
    } else if (evt.key === 'ArrowUp' && currentPage > 0) {
        showPage(currentPage - 1);
    }
});

// Function to start music (requires user interaction)
function startMusic() {
    if (!musicStarted) {
        music.volume = 0.3; // Set volume (0.0 to 1.0)
        music.play().then(() => {
            musicStarted = true;
        }).catch(error => {
            console.log('Music play failed:', error);
        });
    }
}

// Toggle music on/off
function toggleMusic() {
    if (music.paused) {
        music.play();
        document.getElementById('musicToggle').innerHTML = '🔊';
    } else {
        music.pause();
        document.getElementById('musicToggle').innerHTML = '🎵';
    }
}

function showQuestion() {
    const question = document.getElementById('question');
    const continueBtn = document.getElementById('continueBtn');

    question.style.display = 'block';

    if (continueBtn) {
        continueBtn.style.display = 'none';
    }

    document.body.style.background =
        "linear-gradient(to right, #667eea, #764ba2)";
}

function answer(yes) {
    if (yes) {
        // Hide question
        document.getElementById('question').style.display = 'none';

        // Show love reveal
        const reveal = document.getElementById('loveReveal');
        reveal.classList.add('show');
    } else {
        alert("Application returned for reconsideration 😉\nPlease review again.");
        showQuestion();
    }
}

// Auto-start music on first click anywhere (if needed)
document.addEventListener('click', function () {
    startMusic();
}, { once: true });
