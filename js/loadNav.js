document.addEventListener("DOMContentLoaded", function () {
  const navPlaceholder = document.getElementById("nav-placeholder");
  if (navPlaceholder) {
    fetch("../components/nav.html")
      .then((response) => response.text())
      .then((data) => {
        navPlaceholder.innerHTML = data;
      })
      .catch((error) => console.error("Error loading navigation:", error));
  }
});
