function doPost(e) {
  var prop = PropertiesService.getScriptProperties().getProperties();
  var bot_name = "testbot";
  var bot_icon = ":tada:";
  
  var app = SlackApp.create(prop.slackToken);
  var message = e.parameter.user_name + "さんが" + e.parameter.text + "と言いました";
  
  if (prop.verifyToken != e.parameter.token) {
    throw new Error("invalid token.");
  }
  
  return app.postMessage("#test", message, {
    username: bot_name,
    icon_emoji: bot_icon
  });
}
