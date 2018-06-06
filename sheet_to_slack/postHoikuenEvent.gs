function postHoikuenEvent() {
  var prop = PropertiesService.getScriptProperties().getProperties();
  var postUrl = prop.webHookUrl;
  var bot_name = '保育園イベント通知bot';
  var bot_icon = ':girl:';
  var message = '';
  var events = [];

  //https://tonari-it.com/gas-moment-js-moment/
  var date = Moment.moment().format("YYYY/M/D");

  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var dataRow = findRow(sheet,date,1);

  if(dataRow.length > 0){
    for(var i=0;i<dataRow.length;i++){
        var eventName = sheet.getRange(dataRow[i], 2).getValue();
        var parentJoin = (sheet.getRange(dataRow[i], 3).getValue() == 1) ? "　★親参加★" : "";
	events.push("・" + eventName + parentJoin);
    }
    message = "本日" + date + "の保育園イベントは\n" + events.join("\n") + "\nです。";
  }else{
    message = "本日" + date + "の保育園イベントはありません";
  }

//TODO 次週予告


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
  var result = []; 
  for(var i=1;i<dat.length;i++){
    if(Moment.moment(dat[i][col-1]).isSame(val,'day')){
      result.push(i+1);
    }
  }
  return result;
}
