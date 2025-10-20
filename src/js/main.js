// Gift Box Interactive Website
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎁 Gift Box Website loaded! 💕');

    // Initialize gift box interactions
    initGiftBoxInteraction();
    
    // Initialize floating hearts
    initFloatingHearts();
    
    // Initialize floating roses
    initFloatingRoses();
    
    // Initialize touch effects
    initTouchEffects();
    
    // Initialize mobile optimizations
    initMobileOptimizations();
});

// Gift Box Interaction
function initGiftBoxInteraction() {
    const giftBox = document.getElementById('giftBox');
    const giftContent = document.getElementById('giftContent');
    const closeBtn = document.getElementById('closeBtn');
    
    // Open gift box
    giftBox.addEventListener('click', function() {
        openGiftBox();
    });
    
    // Close gift box
    closeBtn.addEventListener('click', function() {
        closeGiftBox();
    });
    
    // Close when clicking outside content
    giftContent.addEventListener('click', function(e) {
        if (e.target === giftContent) {
            closeGiftBox();
        }
    });
    
    // Close with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && giftContent.classList.contains('show')) {
            closeGiftBox();
        }
    });
}

function openGiftBox() {
    const giftBox = document.getElementById('giftBox');
    const giftContent = document.getElementById('giftContent');
    
    // Add opening animation
    giftBox.style.animation = 'giftOpen 0.5s ease-out';
    
    // Show content after animation
    setTimeout(() => {
        giftContent.classList.add('show');
        giftContent.style.display = 'flex';
        
        // Add confetti effect
        createConfettiEffect();
        
        // Start continuous rose effect
        startContinuousRoses();
        
        // Add haptic feedback
        if ('vibrate' in navigator) {
            navigator.vibrate([100, 50, 100]);
        }
    }, 500);
}

function closeGiftBox() {
    const giftContent = document.getElementById('giftContent');
    
    // Stop continuous roses
    stopContinuousRoses();
    
    giftContent.style.animation = 'contentFadeOut 0.3s ease-in';
    
    setTimeout(() => {
        giftContent.classList.remove('show');
        giftContent.style.display = 'none';
    }, 300);
}

// Floating Hearts Animation
function initFloatingHearts() {
    const hearts = document.querySelectorAll('.heart');
    
    hearts.forEach((heart, index) => {
        // Add random movement
        setInterval(() => {
            const randomX = (Math.random() - 0.5) * 20;
            const randomY = (Math.random() - 0.5) * 20;
            heart.style.transform = `translate(${randomX}px, ${randomY}px)`;
        }, 3000 + index * 1000);
    });
}

// Floating Roses Animation
function initFloatingRoses() {
    const rosesContainer = document.getElementById('floatingRoses');
    const roseEmojis = ['🌹', '🌺', '🌻', '🌷', '🌼', '🌸'];
    
    function createRose() {
        const rose = document.createElement('div');
        rose.className = 'rose';
        rose.textContent = roseEmojis[Math.floor(Math.random() * roseEmojis.length)];
        
        // Random starting position
        rose.style.left = Math.random() * 100 + '%';
        rose.style.animationDuration = (Math.random() * 8 + 8) + 's';
        rose.style.animationDelay = Math.random() * 2 + 's';
        
        // Random size
        const size = Math.random() * 0.5 + 1;
        rose.style.fontSize = (size * 1.5) + 'rem';
        
        rosesContainer.appendChild(rose);
        
        // Remove rose after animation
        setTimeout(() => {
            if (rose.parentNode) {
                rose.parentNode.removeChild(rose);
            }
        }, 12000);
    }
    
    // Create roses periodically (more frequent)
    setInterval(createRose, 1200);
    
    // Create initial roses (more roses)
    for (let i = 0; i < 6; i++) {
        setTimeout(createRose, i * 500);
    }
}

// Touch Effects
function initTouchEffects() {
    const giftBox = document.getElementById('giftBox');
    
    // Gift box touch effects
    giftBox.addEventListener('touchstart', function(e) {
        this.style.transform = 'scale(0.95)';
        createTouchRipple(e.touches[0].clientX, e.touches[0].clientY);
    });
    
    giftBox.addEventListener('touchend', function() {
        this.style.transform = 'scale(1)';
    });
}

// Mobile Optimizations
function initMobileOptimizations() {
    // Prevent zoom on double tap
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function(e) {
        const now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
            e.preventDefault();
        }
        lastTouchEnd = now;
    }, false);
    
    // Optimize animations for low-end devices
    if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
        document.documentElement.style.setProperty('--animation-duration', '0.3s');
    }
    
    // Pause animations when not visible
    document.addEventListener('visibilitychange', function() {
        const hearts = document.querySelectorAll('.heart');
        if (document.hidden) {
            hearts.forEach(heart => {
                heart.style.animationPlayState = 'paused';
            });
        } else {
            hearts.forEach(heart => {
                heart.style.animationPlayState = 'running';
            });
        }
    });
}

// Utility Functions
function createTouchRipple(x, y) {
    const ripple = document.createElement('div');
    ripple.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        width: 20px;
        height: 20px;
        background: rgba(255, 182, 193, 0.4);
        border-radius: 50%;
        pointer-events: none;
        z-index: 1000;
        animation: touchRipple 0.6s ease-out;
        transform: translate(-50%, -50%);
    `;
    
    document.body.appendChild(ripple);
    
    setTimeout(() => {
        if (ripple.parentNode) {
            ripple.parentNode.removeChild(ripple);
        }
    }, 600);
}


function createConfettiEffect() {
    const colors = ['#ffb6c1', '#ffc0cb', '#ffb3ba', '#ff69b4', '#ff1493'];
    const giftBox = document.getElementById('giftBox');
    const rect = giftBox.getBoundingClientRect();
    
    for (let i = 0; i < 15; i++) {
        const confetti = document.createElement('div');
        confetti.style.cssText = `
            position: fixed;
            left: ${rect.left + rect.width / 2}px;
            top: ${rect.top + rect.height / 2}px;
            width: 8px;
            height: 8px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            pointer-events: none;
            z-index: 1000;
            animation: confettiFall 2s ease-out forwards;
            animation-delay: ${i * 0.05}s;
        `;
        
        document.body.appendChild(confetti);
        
        setTimeout(() => {
            if (confetti.parentNode) {
                confetti.parentNode.removeChild(confetti);
            }
        }, 2000);
    }
}

// Global variable to store rose interval
let roseInterval = null;

function startContinuousRoses() {
    // Clear any existing interval
    if (roseInterval) {
        clearInterval(roseInterval);
    }
    
    // Create roses continuously while gift is open
    roseInterval = setInterval(createSlowRose, 1500); // Every 1.5 seconds
}

function stopContinuousRoses() {
    if (roseInterval) {
        clearInterval(roseInterval);
        roseInterval = null;
    }
}

function createSlowRose() {
    // Create 2-3 roses at once for more density
    const roseCount = Math.floor(Math.random() * 2) + 2; // 2-3 roses
    
    for (let i = 0; i < roseCount; i++) {
        const rose = document.createElement('div');
        rose.textContent = '🌹'; // Only rose emoji
        
        // Random starting position around the screen edges
        const startPositions = [
            { left: '0%', top: '20%' },      // Left side
            { left: '100%', top: '30%' },     // Right side
            { left: '10%', top: '0%' },       // Top left
            { left: '90%', top: '0%' },      // Top right
            { left: '20%', top: '100%' },     // Bottom left
            { left: '80%', top: '100%' },     // Bottom right
            { left: '50%', top: '0%' },       // Top center
            { left: '0%', top: '60%' },       // Left center
            { left: '100%', top: '70%' },     // Right center
            { left: '30%', top: '100%' },     // Bottom center
        ];
        
        const startPos = startPositions[Math.floor(Math.random() * startPositions.length)];
        
        rose.style.cssText = `
            position: fixed;
            left: ${startPos.left};
            top: ${startPos.top};
            font-size: 1.5rem;
            pointer-events: none;
            z-index: 1000;
            animation: slowRoseFly 8s ease-in-out forwards;
            animation-delay: ${i * 0.3}s;
        `;
        
        document.body.appendChild(rose);
        
        setTimeout(() => {
            if (rose.parentNode) {
                rose.parentNode.removeChild(rose);
            }
        }, 8000);
    }
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes giftOpen {
        0% {
            transform: scale(1) rotate(0deg);
        }
        50% {
            transform: scale(1.1) rotate(5deg);
        }
        100% {
            transform: scale(1) rotate(0deg);
        }
    }
    
    @keyframes contentFadeOut {
        from {
            opacity: 1;
            transform: scale(1);
        }
        to {
            opacity: 0;
            transform: scale(0.8);
        }
    }
    
    @keyframes touchRipple {
        0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 1;
        }
        100% {
            transform: translate(-50%, -50%) scale(4);
            opacity: 0;
        }
    }
    
    @keyframes sparkleExplosion {
        0% {
            transform: scale(0) rotate(0deg);
            opacity: 1;
        }
        50% {
            transform: scale(1.5) rotate(180deg);
            opacity: 0.8;
        }
        100% {
            transform: scale(0.5) rotate(360deg) translateY(-100px);
            opacity: 0;
        }
    }
    
    @keyframes confettiFall {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
        }
    }
    
    @keyframes slowRoseFly {
        0% {
            transform: scale(0.8) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: scale(1.1) rotate(180deg) translateX(150px) translateY(-80px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Add double tap to open gift
let lastTap = 0;
document.addEventListener('touchend', function(e) {
    const currentTime = new Date().getTime();
    const tapLength = currentTime - lastTap;
    
    if (tapLength < 500 && tapLength > 0) {
        // Double tap detected
        const giftBox = document.getElementById('giftBox');
        if (e.target === giftBox || giftBox.contains(e.target)) {
            openGiftBox();
        }
    }
    lastTap = currentTime;
});

// Add shake effect for gift box
function addShakeEffect() {
    const giftBox = document.getElementById('giftBox');
    giftBox.style.animation = 'shake 0.5s ease-in-out';
    
    setTimeout(() => {
        giftBox.style.animation = 'giftFloat 3s ease-in-out infinite';
    }, 500);
}

// Shake animation
const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
`;
document.head.appendChild(shakeStyle);

// Add shake effect on touch
document.getElementById('giftBox').addEventListener('touchstart', function() {
    addShakeEffect();
});

console.log('🎁 Gift box ready! Tap to open your surprise! 💕');