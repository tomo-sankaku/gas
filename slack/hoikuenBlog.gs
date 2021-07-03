var bot_name = "あおぞらブログ更新通知";
var bot_icon = ":tada:";
var feedURL = 'https://www.soka-aozora.com/feed/';
var keyword = 'つくし組';


function parseXml() {

  // フィードを取得
  var response = UrlFetchApp.fetch(feedURL);
 
  // XMLをパース
  var xml = XmlService.parse(response.getContentText());
 
  // 各データの要素を取得
  var entries = xml.getRootElement().getChildren('channel')[0].getChildren('item');
 
  // 要素数を取得
  var length = entries.length;
 
  // 取得したデータをループさせる
  for(var i = 0; i < length; i++) {
    
    var description = entries[i].getChildText('description');

    if(keywordExists(description, keyword)) {
      var title   = entries[i].getChildText('title');
      var link    = entries[i].getChildText('link');
      var pubDate = entries[i].getChildText('pubDate');
    
      var content = [title,link,pubDate];
      postSlack(content);
    }
  }
}

// 特定文字を含むかどうか
function keywordExists(str,needle) {
  if(str.indexOf(needle) == -1){
    return false;
  }
  return true;
}

// Slackに投稿
function postSlack(content){
  var prop = PropertiesService.getScriptProperties().getProperties();
  var app = SlackApp.create(prop.slackToken);
  var message = content[0] + '(' + content[2] + ')\n' + content[1];

  //デバッグのためにいったんtestに投稿するようにする
  return app.postMessage("#test", message, {
    username: bot_name,
    icon_emoji: bot_icon
  });
}
