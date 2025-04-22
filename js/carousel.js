document.addEventListener('DOMContentLoaded', () => {
    const introImage = document.querySelector('#introImage img');
    const images = [
      'assets/carousel/espiropapas.png',
      'assets/carousel/vaca.png',
      'assets/carousel/frutas.png',
      'assets/carousel/flores.png',
      // Add more image paths here
    ];
    let currentIndex = 0;

    introImage.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % images.length;
      introImage.src = images[currentIndex];
    });
  });