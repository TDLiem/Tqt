const music = document.getElementById('backgroundMusic');
let musicStarted = false;

let currentPage = 0;
let startY = 0;
let currentIndex = 0;
let slideInterval;
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
        `${days} days ${hours} hours ${minutes} minutes`;
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
    
    if (pageIndex === 2) {
        startSlideshow();
    }
}

//album on page 3
function startSlideshow() {
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
    document.getElementById('question').style.display = 'block';
    document.querySelector('button').style.display = 'none';
    document.body.style.background = "linear-gradient(to right, #667eea, #764ba2)";
}
function answer(yes) {
    if(yes) {
        alert("I LOVE YOU! 💍🎉 You've just made me the luckiest person alive!");
    } else {
        // A little joke
        alert("I think you misclicked! Let's try that again 😉");
        showQuestion();
    }
}

        // Auto-start music on first click anywhere (if needed)
document.addEventListener('click', function() {
    startMusic();
}, { once: true });
