
function injectEmbeddedScripts() {
	embedExtensionScript('js/jquery/jquery.min.js', function () {
		// embed NFP script after jquery loads so it's all ready for us
		embedExtensionScript('src/embedded/embedded.js');
	});
}

// Adds or removes classes depending on what kind of rewind button
// has been set in options
function updateRewindButton() {
	var rewindButton = rewindButtonSetting;

	if (rewindButton == "10seconds") {
		$NFP(".nfp-rewindButton").removeClass("nfp-hidden icon-player-rewind30").addClass("icon-player-rewind10");
	}
	else if (rewindButton == "30seconds") {
		$NFP(".nfp-rewindButton").removeClass("nfp-hidden icon-player-rewind10").addClass("icon-player-rewind30");
	}
	else {
		$NFP(".nfp-rewindButton").addClass("nfp-hidden");
	}
}

// inserts a rewind button or placeholder into player
// called when player has been added to DOM
function insertRewindButton() {
	var rewindButton = rewindButtonSetting;
	console.log("rewindButton: " + rewindButton);

	if (rewindButton == "10seconds") {
		$NFP(".player-play-pause").after("<div class='player-control-button nfp-rewindButton icon-player-rewind10'></div>");
	}
	else if (rewindButton == "30seconds") {
		$NFP(".player-play-pause").after("<div class='player-control-button nfp-rewindButton icon-player-rewind30'></div>");
	}
	else {
		$NFP(".player-play-pause").after("<div class='player-control-button nfp-rewindButton nfp-hidden'></div>");
	}
}

// on DOM ready
var initFunction =
function () {
	injectEmbeddedScripts();

	// Embed css into page
	embedExtensionStylesheet('css/embedded/embedded.css');

	// As soon as player is added to DOM, add rewind button
	$NFP(document).on("DOMNodeInserted", ".player-play-pause", function(event) {
				insertRewindButton();
	});

};

onDOMReady(initFunction);

// global setting updated by storage sync and get closures
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
});
