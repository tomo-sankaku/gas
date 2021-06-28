// フィードのURL設定
var feedURL = 'https://www.soka-aozora.com/feed/';
// 抽出文字
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
  Logger.log(content);
}
