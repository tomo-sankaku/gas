function postHoikuenEvent() {
  var prop = PropertiesService.getScriptProperties().getProperties();
  var postUrl = prop.webHookUrl;
  var bot_name = '保育園イベント通知bot';
  var bot_icon = ':girl:';
  var message = '仮メッセージ';

  var jsonData =
  {
     "username" : bot_name,
     "icon_emoji": bot_icon,
     "text" : message
  };
  var payload = JSON.stringify(jsonData);

  var options =
  {
    "method" : "post",
    "contentType" : "application/json",
    "payload" : payload
  };

  UrlFetchApp.fetch(postUrl, options);
}
