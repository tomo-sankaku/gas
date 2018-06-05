function postHoikuenEvent() {
  var prop = PropertiesService.getScriptProperties().getProperties();
  var postUrl = prop.webHookUrl;
  var bot_name = '保育園イベント通知bot';
  var bot_icon = ':girl:';
  var message = '';

  //https://tonari-it.com/gas-moment-js-moment/
  var date = Moment.moment().format("YYYY/M/D");

  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var dataRow = findRow(sheet,date,1);

  if(dataRow != 0){
    var eventName = sheet.getRange(dataRow, 2).getValue();
    var parentJoin = (sheet.getRange(dataRow, 3).getValue() == 1) ? "(親参加)" : "";
    message = "本日" + date + "の保育園イベントは\n" + eventName + parentJoin + "です。";
  }else{
    message = "本日" + date + "の保育園イベントはありません";
  }

//TODO イベントが複数ある場合のメッセージ／次週予告／日付比較をisSameに書き換える


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

//https://tonari-it.com/gas-spreadsheet-find/
function findRow(sheet,val,col){
 
  var dat = sheet.getDataRange().getValues();
 
  for(var i=1;i<dat.length;i++){
    if(Moment.moment(dat[i][col-1]).format("YYYY/M/D") === val){
      return i+1;
    }
  }
  return 0;
}
