document.addEventListener('DOMContentLoaded', function () {
  const canvas = document.createElement('canvas');
  canvas.id = 'drawingCanvas';
  canvas.style.position = 'absolute';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '-1';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  let drawing = false;

  function resizeCanvas() {
    canvas.width = document.documentElement.scrollWidth; // Full scrollable width
    canvas.height = document.documentElement.scrollHeight; // Full scrollable height
  }

  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  const toggleContainer = document.createElement('div');
  toggleContainer.className = 'cursor-toggle-container';
  toggleContainer.style.position = 'fixed';
  toggleContainer.style.top = '10px';
  toggleContainer.style.right = '10px';
  toggleContainer.style.zIndex = '1000';

  const toggleCircle = document.createElement('div');
  toggleCircle.className = 'cursor-toggle-circle';
  toggleCircle.style.width = '20px';
  toggleCircle.style.height = '20px';
  toggleCircle.style.borderRadius = '50%';
  toggleCircle.style.backgroundColor = 'red';
  toggleCircle.style.cursor = 'pointer';
  toggleCircle.style.border = '2px solid #333';

  toggleContainer.appendChild(toggleCircle);
  document.body.appendChild(toggleContainer);

  toggleCircle.addEventListener('click', function () {
    const isCrosshair = document.documentElement.classList.toggle('crosshair-cursor');
    toggleCircle.style.backgroundColor = isCrosshair ? 'green' : 'red';
    if (!isCrosshair) {
      ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
    }
  });

  document.addEventListener('mousemove', function (e) {
    if (document.documentElement.classList.contains('crosshair-cursor')) {
      const x = e.pageX; // Use pageX for full-page coordinates
      const y = e.pageY; // Use pageY for full-page coordinates

      if (!drawing) {
        ctx.beginPath();
        ctx.moveTo(x, y);
        drawing = true;
      } else {
        ctx.lineTo(x, y);
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 3;
        ctx.stroke();
      }
    } else {
      drawing = false;
    }
  });

  document.addEventListener('mouseleave', function () {
    drawing = false; // Stop drawing when the cursor leaves the page
  });
});
