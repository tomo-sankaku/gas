function doPost(e) {
  var prop = PropertiesService.getScriptProperties().getProperties();
  var bot_name = "testbot";
  var bot_icon = ":tada:";
  
  var app = SlackApp.create(prop.slackToken);
  var name = e.parameter.user_name;
  var message = e.parameter.text;
  
  if (prop.verifyToken != e.parameter.token) {
    throw new Error("invalid token.");
  }
  
  return app.postMessage("#test", name + "さんが" + message + "と言いました", {
    username: bot_name,
    icon_emoji: bot_icon
  });
}
