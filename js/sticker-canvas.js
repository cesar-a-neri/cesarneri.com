const smileImages = [
    'assets/smiles/orange-smile.png',
    'assets/smiles/blue-smile.png',
    'assets/smiles/pink-smile.png',
    'assets/smiles/green-smile.png',
    'assets/smiles/yellow-smile.png',
    // 'assets/smiles/purple-smile.png'
];

const preloadedImages = [];

let currentImageIndex = 0;
let isDrawing = false;
let canvas, ctx, cursorFollower;

let lastStampTime = 0;
const STAMP_DELAY = 30; // milliseconds between stamps

let currentRotation = 0;  // Add this with other state variables

document.addEventListener('DOMContentLoaded', () => {
    // Wait for images and other resources to load
    window.addEventListener('load', () => {
        // Preload smile images
        smileImages.forEach((src, index) => {
            const img = new Image();
            img.src = src;
            preloadedImages[index] = img;
        });

        canvas = document.getElementById('stickerCanvas');
        ctx = canvas.getContext('2d');
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        setupCursorFollower();
        setupSmileToggle();
    });
});

function resizeCanvas() {
    const dpr = window.devicePixelRatio || 1;
    const displayWidth = window.innerWidth;
    const displayHeight = Math.max(
        document.documentElement.scrollHeight,
        document.documentElement.offsetHeight,
        document.documentElement.clientHeight
    );

    // Set display size (css pixels)
    canvas.style.width = `${displayWidth}px`;
    canvas.style.height = `${displayHeight}px`;

    // Set actual size in memory (scaled for DPI)
    canvas.width = displayWidth * dpr;
    canvas.height = displayHeight * dpr;

    // Scale context to match DPI
    ctx.scale(dpr, dpr);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
}

function setupCursorFollower() {
    cursorFollower = document.createElement('img');
    cursorFollower.src = smileImages[0];
    cursorFollower.className = 'cursor-follower';
    document.body.appendChild(cursorFollower);

    document.addEventListener('mousemove', (e) => {
        if (!isDrawing) return;
        
        cursorFollower.style.display = 'block';
        cursorFollower.style.left = e.clientX - 18 + 'px';
        cursorFollower.style.top = e.clientY - 18 + 'px';
        cursorFollower.style.transform = `rotate(${currentRotation}deg)`;

        // Add throttled drawing
        const currentTime = Date.now();
        if (currentTime - lastStampTime >= STAMP_DELAY) {
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            drawSticker(x, y);
            currentImageIndex = (currentImageIndex + 1) % smileImages.length;
            currentRotation = (currentRotation + 4) % 360;  // Increment rotation
            lastStampTime = currentTime;
        }
    });
}

function setupSmileToggle() {
    const topToggle = document.getElementById('smileToggle');
    const bottomToggle = document.getElementById('bottomSmileToggle');
    
    [topToggle, bottomToggle].forEach(toggle => {
        toggle.addEventListener('click', () => {
            isDrawing = !isDrawing;
            if (isDrawing) {
                document.body.style.cursor = 'none';
            } else {
                document.body.style.cursor = 'default';
                cursorFollower.style.display = 'none';
            }
        });
    });
}

function drawSticker(x, y) {
    const img = preloadedImages[currentImageIndex];
    
    // Save the current context state
    ctx.save();
    
    // Move to center point, rotate, then move back
    ctx.translate(x, y);
    ctx.rotate(currentRotation * Math.PI / 180);
    ctx.translate(-x, -y);
    
    // Draw the image
    const centerX = x - 18;
    const centerY = y - 18;
    ctx.drawImage(img, centerX, centerY, 36, 36);
    
    // Restore the context state
    ctx.restore();
}
