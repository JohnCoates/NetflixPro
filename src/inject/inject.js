function injectScript() {
	// Embed jQuery into page
	var embeddedScript = document.createElement('script');
	embeddedScript.src = chrome.extension.getURL('js/jquery/jquery.min.js');
	embeddedScript.onload = function() {
			this.parentNode.removeChild(this);

			// Embed script into page
			var embeddedScript = document.createElement('script');
			embeddedScript.src = chrome.extension.getURL('src/embedded/embedded.js');
			embeddedScript.onload = function() {
					this.parentNode.removeChild(this);
			};
			(document.head||document.documentElement).appendChild(embeddedScript);
	};
	(document.head||document.documentElement).appendChild(embeddedScript);


}

function updateRewindButton() {
	var rewindButton = rewindButtonSetting;
	console.log("rewindButton: " + rewindButton);

	if (rewindButton == "10seconds") {
		console.log("inserting 10 seconds button!");
		$NFP(".nfp-rewindButton").removeClass("nfp-hidden icon-player-rewind30").addClass("icon-player-rewind10");
	}
	else if (rewindButton == "30seconds") {
		$NFP(".nfp-rewindButton").removeClass("nfp-hidden icon-player-rewind10").addClass("icon-player-rewind30");
	}
	else {
		$NFP(".nfp-rewindButton").addClass("nfp-hidden");
	}
}

function insertRewindButton() {
	var rewindButton = rewindButtonSetting;
	console.log("rewindButton: " + rewindButton);

	if (rewindButton == "10seconds") {
		console.log("inserting 10 seconds button!");
		$NFP(".player-play-pause").after("<div class='player-control-button nfp-rewindButton icon-player-rewind10'></div>");
	}
	else if (rewindButton == "30seconds") {
		console.log("inserting 30 seconds button!");
		$NFP(".player-play-pause").after("<div class='player-control-button nfp-rewindButton icon-player-rewind30'></div>");
	}
	else {
		$NFP(".player-play-pause").after("<div class='player-control-button nfp-rewindButton nfp-hidden'></div>");
	}
}


// load script
chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
		if (document.readyState === "complete") {
			injectScript();

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

		$NFP(document).on("DOMNodeInserted", ".player-play-pause", function(event) {
				// insert rewind button after play/pause button
				// chrome.storage.sync.get({"rewindButton": "10seconds"}, function(data){
					// var rewindButton = data.rewindButton;
					insertRewindButton();
			});
			// $(document).on("chang)

		}
	}, 10);
});

var rewindButtonSetting = "10seconds";

chrome.storage.sync.get({"rewindButton": "10seconds"}, function(data){
	var rewindButton = data.rewindButton;
	rewindButtonSetting = rewindButton;
});

// subscribe to change events
chrome.storage.onChanged.addListener(function(changes, areaName) {
	if (areaName != "sync") {
		return;
	}

	if (changes.rewindButton) {
		rewindButtonSetting = changes.rewindButton.newValue;
		updateRewindButton();
	}
	console.log("storage changed");
	console.log(changes);
});
