function embedExtensionStylesheet(filename) {
	var embeddedStylesheet = document.createElement('link');
	embeddedStylesheet.rel = "stylesheet";
	embeddedStylesheet.type = "text/css";
	embeddedStylesheet.href = chrome.extension.getURL(filename);
	embeddedStylesheet.onload = function() {
	};
	(document.head||document.documentElement).appendChild(embeddedStylesheet);
}

function embedExtensionScript(filename, onload) {
	var embeddedScript = document.createElement('script');
	embeddedScript.src = chrome.extension.getURL(filename);
	embeddedScript.onload = function() {
		// remove script from DOM. Script still functions the same.
		this.parentNode.removeChild(this);
		if (onload != undefined) {
			onload();
		}
	};

	(document.head||document.documentElement).appendChild(embeddedScript);
}

function onDOMReady(block) {
	chrome.extension.sendMessage({}, function(response) {
		var readyStateCheckInterval = setInterval(function() {
			if (document.readyState === "complete") {
				clearInterval(readyStateCheckInterval);
				if (block != undefined) {
					block();
				}
			}
		});
	});
}
