function NFPRewind(seconds) {
  var videoPlayer = window.netflix.cadmium.objects.videoPlayer();
  var currentTimeMS = videoPlayer.getCurrentTime();
  var rewindMS = seconds * 1000;
  var seekBackToTime = currentTimeMS - rewindMS;
  videoPlayer.seek(seekBackToTime);
}

$NFP(document).on("click", ".icon-player-rewind10", function(event) {
      NFPRewind(10);
});

$NFP(document).on("click", ".icon-player-rewind30", function(event) {
      NFPRewind(30);
});
