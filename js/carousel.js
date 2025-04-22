document.addEventListener('DOMContentLoaded', () => {
    const introImage = document.querySelector('#introImage img');
    const images = [
      'assets/carousel/espiropapas.png',
      'assets/carousel/truck.png',
      'assets/carousel/flores.png',
      'assets/carousel/caballos.png',
      // Add more image paths here
    ];
    let currentIndex = 0;

    introImage.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % images.length;
      introImage.src = images[currentIndex];
    });
  });