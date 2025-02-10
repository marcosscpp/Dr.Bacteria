const btn = document.querySelector(".cta-btn");

var player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player("player", {
    videoId: "8WCAsoUQplU",
    events: {
      onStateChange: onPlayerStateChange,
    },
  });
}

function onPlayerStateChange(event) {
  checkTime();
}

function checkTime() {
  var currentTime = player.getCurrentTime();
  if (currentTime > 2380) {
    btn.classList.add("active");
    try {
      if (
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.msFullscreenElement
      ) {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      }
    } catch (error) {}
  } else {
    setTimeout(checkTime, 1000);
  }
}

function activatePixel(phpUrl) {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", phpUrl, true);
  xhr.send();
}
activatePixel("../viewcontent1.php");
