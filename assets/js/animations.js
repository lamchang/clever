var line = document.getElementById('LogoSquare');
var lineOffset =  anime.setDashoffset(line);
anime({
    targets: line,
    strokeDashoffset: [lineOffset, 0],
    duration: 2500,
    delay: 1000,
    loop: false,
    direction: 'alternate',
    easing: 'easeInOutSine',
    autoplay: true
});
