function delay(URL) {
    setTimeout(function() { window.location = URL; }, 700);
}

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.exitClick').forEach(function(el) {
        el.addEventListener('click', function() {
            document.body.classList.add('bodyExit');
        });
    });
});

window.addEventListener('pageshow', function() {
    document.body.classList.remove('bodyExit');
});
