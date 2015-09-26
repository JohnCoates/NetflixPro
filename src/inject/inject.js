function injectScript() {
	// Embed jQuery into page
	var embeddedScript = document.createElement('script');
	embeddedScript.src = chrome.extension.getURL('js/jquery/jquery.min.js');
	embeddedScript.onload = function() {
			this.parentNode.removeChild(this);
	};
	(document.head||document.documentElement).appendChild(embeddedScript);

	// Embed script into page
	var embeddedScript = document.createElement('script');
	embeddedScript.src = chrome.extension.getURL('src/embedded/embedded.js');
	embeddedScript.onload = function() {
			this.parentNode.removeChild(this);
	};
	(document.head||document.documentElement).appendChild(embeddedScript);
}

// load script
chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
		if (document.readyState === "complete") {
			clearInterval(readyStateCheckInterval);

			// ----------------------------------------------------------
			// This part of the script triggers when page is done loading


			// Embed css into page
			var embeddedStylesheet = document.createElement('link');
			embeddedStylesheet.rel = "stylesheet";
			embeddedStylesheet.type = "text/css";
			embeddedStylesheet.href = chrome.extension.getURL('css/embedded/embedded.css');
			embeddedStylesheet.onload = function() {
			    // this.parentNode.removeChild(this);
					console.log("loaded stylesheet!");
			};
			(document.head||document.documentElement).appendChild(embeddedStylesheet);

			console.log("Hello. This message was sent from src/inject/inject.js");
			// ----------------------------------------------------------
			// $('body').bind('DOMNodeInserted DOMNodeRemoved', function(event) {
			// if (event.type == 'DOMNodeInserted') {
			// 		alert('Content added! Current content:' + '\n\n' + this.innerHTML);
			// } else {
			// 		alert('Content removed! Current content:' + '\n\n' + this.innerHTML);
			// }
			// });
			$NFP(".player-control-button").on("click", function(event) {
				if (event.type == 'DOMNodeInserted') {
						console.log(this.innerHTML);
				} else {
						console.log("blehh: "+this.innerHTML);
				}
			});
			insertionQ('.player-play-pause').summary(function(arrayOfInsertedNodes){
			    console.log("inserted: player-play-pause");
			});
			$NFP(document).on("DOMNodeInserted", ".player-status-main-title", function(event) {
				if (fireOnce) {
					return;
				}
				fireOnce = true;

				console.log("event: ");
				console.log(event);
				console.log("object: " + this);
				console.log("-title: " + $NFP(this).text());
				var originalTitle = $NFP(this).text();
				var imdbLink = " <a href=\"http://www.imdb.com/\" target=\"_blank\">[IMDB]</a>";
				var title = originalTitle + " " + imdbLink;

				$NFP(this).html(title);

				$NFP(".player-status-main-title").change(function(event) {
					console.log("title: " + this.text());
				});

				// insert rewind button after play/pause button
				// chrome.storage.sync.get({"rewindButton": "10seconds"}, function(data){
					// var rewindButton = data.rewindButton;
				var rewindButton = rewindButtonSetting;
				console.log("rewindButton: " + rewindButton);

				if (rewindButton == "10seconds") {
					console.log("inserting 10 seconds button!");
					$NFP(".player-play-pause").after("<div class='player-control-button icon-player-rewind10'></div>");
				}
				else if (rewindButton == "30seconds") {
					console.log("inserting 30 seconds button!");
					$NFP(".player-play-pause").after("<div class='player-control-button icon-player-rewind30'></div>");
				}
				else {

				}
				injectScript();

				// $NFP(".icon-player-rewind10").on("click", function(event) {
				// 			console.log("rewind!");
				// });

			});
			// $(document).on("chang)

		}
	}, 10);
});requestMediaKeySystemAccess

var fireOnce = false;
var rewindButtonSetting = "10seconds";

chrome.storage.sync.get({"rewindButton": "10seconds"}, function(data){
	var rewindButton = data.rewindButton;
	rewindButtonSetting = rewindButton;
});
