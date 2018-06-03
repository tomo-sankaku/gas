function postHoikuenEvent() {
  var prop = PropertiesService.getScriptProperties().getProperties();
  var postUrl = prop.webHookUrl;
  var bot_name = '保育園イベント通知bot';
  var bot_icon = ':girl:';
  var message = '仮メッセージ';

  var date = new Date();
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var dataRow = findRow(sheet,date.toLocaleDateString(),1);
  var eventData = sheet.getRange(dataRow, 2).getValue(); //error

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
    if(dat[i][col-1] === val){
      return i+1;
    }
  }
  return 0;
}
