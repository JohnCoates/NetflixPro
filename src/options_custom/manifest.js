// SAMPLE
this.manifest = {
    "name": "Netflix+",
    "icon": "icon.png",
    "settings": [
      {
          "tab": i18n.get("netflixUI"),
          "group": "Player Interface",
          "name": "rewindButton",
          "type": "radioButtons",
          "label": "Quick Rewind Button",
          "options": [
            {"text" :"None", "value" : "none"},
            {"text" :"10 Seconds", "value" : "10seconds"},
            {"text" :"30 Seconds", "value" : "30seconds"},
          ]
      }]
};
