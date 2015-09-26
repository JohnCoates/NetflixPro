function readSetting(name, defaultValue) {
  var settingsName = "store.settings." + name;
  var value = localStorage.getItem(settingsName);

  if (value != undefined) {
    return JSON.parse(value);
  }

  if (defaultValue == undefined) {
    return value;
  }
  var JSONValue = JSON.stringify(value);
  localStorage.setItem(settingsName, JSONValue);

  return defaultValue;
}


chrome.storage.sync.get({"rewindButton": "10seconds"}, function(data){
  console.log("settings: " + data);
  console.log("rewindButton: " + data.rewindButton);
  console.log(data);
  chrome.storage.sync.set(data);
  // set default localStorage value for options page that hasn't been updated to read
  // storage sync values
  readSetting("rewindButton", data.rewindButton);
});



// var rewindButton = localStorage.getItem("store.settings.rewindButton");
//
// if (rewindButton == undefined) {
//     rewindButton = JSON.stringify("10seconds");
//     localStorage.setItem("store.settings.rewindButton", rewindButton);
// }
