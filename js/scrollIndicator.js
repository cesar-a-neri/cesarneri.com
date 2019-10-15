window.onscroll = function () { scrollProgress() };

function scrollProgress() {
  var currentState = document.body.scrollTop || document.documentElement.scrollTop;
  var pageHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  var scrollStatePercentage = (currentState / pageHeight) * 100;
  document.querySelector(".page-scroll-indicator > .progress").style.height = scrollStatePercentage + "%";
}
