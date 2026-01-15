function setViewportHeight() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

setViewportHeight();
window.addEventListener('resize', setViewportHeight);


const music = document.getElementById('backgroundMusic');
let musicStarted = false;

let currentPage = 0;
let startY = 0;
let currentIndex = 0;

const pages = document.querySelectorAll('.page');
const dots = document.querySelectorAll('.dot');

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

    // Hide current page
    pages[currentPage].classList.remove('active');
    dots[currentPage].classList.remove('active');
    // Show new page
    pages[pageIndex].classList.add('active');
    dots[pageIndex].classList.add('active');
    currentPage = pageIndex;

}


// Keyboard support for testing
document.addEventListener('keydown', (evt) => {
    if (evt.key === 'ArrowDown' && currentPage < pages.length - 1) {
        showPage(currentPage + 1);
    } else if (evt.key === 'ArrowUp' && currentPage > 0) {
        showPage(currentPage - 1);
    }
});


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
    }
}


//music siliently on load
document.addEventListener('DOMContentLoaded', () => {
    music.volume = 0;
    music.play().catch(() => {});
});


function fadeInMusic() {
    music.muted = false;

    let vol = 0;
    music.volume = vol;

    const fade = setInterval(() => {
        vol += 0.05;
        music.volume = Math.min(vol, 0.3);
        if (vol >= 0.3) clearInterval(fade);
    }, 200);
}

document.addEventListener('touchstart', fadeInMusic, { once: true });
document.addEventListener('click', fadeInMusic, { once: true });
