const music = document.getElementById('backgroundMusic');
let musicStarted = false;

let currentPage = 0;
let startY = 0;
const pages = document.querySelectorAll('.page');
const dots = document.querySelectorAll('.dot');


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
// window.onload = function() {
//     setTimeout(function() {
//         let romanticText = document.createElement('p');
//         romanticText.innerHTML = "Every day with you feels like a dream come true...";
//         romanticText.style.opacity = '0';
//         romanticText.style.transition = 'opacity 2s';
//         document.body.insertBefore(romanticText, document.querySelector('button'));
        
//         // Fade in the text
//         setTimeout(function() {
//             romanticText.style.opacity = '1';
//         }, 100);
//     }, 2000); // Appears 2 seconds after page loads
// };
        // Auto-start music on first click anywhere (if needed)
document.addEventListener('click', function() {
    startMusic();
}, { once: true });
