function NFPRewind(seconds) {
  var videoPlayer = window.netflix.cadmium.objects.videoPlayer();
  var currentTimeMS = videoPlayer.getCurrentTime();
  var secondsInMS = seconds * 1000;
  var seekBackToTime = currentTimeMS - secondsInMS;
  // var roundedSeekBackTenSeconds = Math.floor(seekBackTenSeconds / 1000) * 1000;
  //
  // if (roundedSeekBackTenSeconds < 0) {
  //   roundedSeekBackTenSeconds = 0;
  // }
  videoPlayer.seek(seekBackToTime);
}

$NFP(document).on("click", ".icon-player-rewind10", function(event) {
      console.log("rewinding!");
      NFPRewind(10);
});
$NFP(document).on("click", ".icon-player-rewind30", function(event) {
      NFPRewind(30);
});
