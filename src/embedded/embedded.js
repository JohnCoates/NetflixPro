var seekTo = setInterval(function() {
  clearInterval(seekTo);
  console.log("seeking!");
  // var videoPlayer = window.netflix.cadmium.objects.videoPlayer();
  // var currentTimeMS = videoPlayer.getCurrentTime();
  // var tenSecondsMS = 10 * 1000;
  // var seekBackTenSeconds = currentTimeMS - tenSecondsMS;
  // var roundedSeekBackTenSeconds = Math.floor(seekBackTenSeconds/1000)*1000;
  // videoPlayer.seek(roundedSeekBackTenSeconds);
  // console.log("getCurrentTime: " + videoPlayer.getCurrentTime());

}, 2000);

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

$NFP(".icon-player-rewind10").on("click", function(event) {
      NFPRewind(10);
});
$NFP(".icon-player-rewind30").on("click", function(event) {
      NFPRewind(30);
});
