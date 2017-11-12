
function allDataProcess() {
  processTeamsDataAverage();
  processTeamsDataFull();
  for(var i = 0; i < 12; ++i) {
    dataProcess(i);
  }
}
  

function dataProcess(category) {
  
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var data = ss.getSheetByName('Form Responses 1').getDataRange().getValues();
  
  var name = 'default title';
  
  if (category == 0) {
    var name = 'Baseline Data';
  }
  else if (category == 1) {
    var name = 'Auto Gear Data';
  }
  else if (category == 2) {
    var name = 'Auto kPa Data';
  }
  else if (category == 3) {
    var name = 'Teleop Gear Data';
  }
  else if (category == 4) {
    var name = 'Human Gear Pickup Data';
  }
  else if (category == 5) {
    var name = 'Ground Gear Pickup Data';
  }
  else if (category == 6) {
    var name = 'Total kPa Data';
  }
  else if (category == 7) {
    var name = 'Ground Fuel Intake Data';
  }
  else if (category == 8) {
    var name = 'Takeoff Data';
  }
  else if (category == 9) {
    var name = 'Defense Data';
  }
  else if (category == 10) {
    var name = 'Break Data';
  }
  else if (category == 11) {
    var name = 'Lose Comm Data';
  }
  
  // initializing output sheet
  var sheet = ss.getSheetByName(name);
  if(sheet != null) {
    ss.deleteSheet(sheet);
  }
  sheet = ss.insertSheet(name);
  
  //Titles on the output sheet
  sheet.appendRow(['Team Number -->', 'Match 1', 'Match 2', 'Match 3', 'Match 4', 'Match 5', 'Match 6', 'Match 7', 'Match 8', 'Match 9', 'Match 10', 'Match 11', 'Match 12', 'Match 13', 'Match 14', 'Match 15']);
  
  //getting the team names from the data sheet
  var teamNames = new Array();
  for(var i = 1; i < data.length; ++i) {
     teamNames[i - 1] = data[i][3];
  }
  
  //reorganizing team name into order and remove duplicates
  teamNames.sort();
  for(var i = 0; i < teamNames.length - 1; ++i) {
    while(teamNames[i] == teamNames[i + 1]) {
      teamNames.splice(i + 1, 1);
    }
  }
  
  //getting the data (array of team name, match number, and datum) from the data sheet
  var breakData = new Array();
  for(var i = 1; i < data.length; ++i) {
    var breakDatum = new Array();
    breakDatum[0] = data[i][3];
    breakDatum[1] = data[i][2]
    breakDatum[2] = data[i][4 + category];
    breakData[i - 1] = breakDatum;
  }
  
  //combining and inserting data into spreadsheet
  for(var i = 0; i < teamNames.length; ++i) {
    var row = new Array();
    row[0] = teamNames[i];
    var index = 1;
    for(var j = 0; j < breakData.length; ++j) {
      if(breakData[j][0] == row[0]) {
        row[index] = 'Match ' + breakData[j][1] + ': ' + breakData[j][2];
        index++;
      }
    }
    sheet.appendRow(row);
  }
  //formatting width of columns
//  for(var i = 0; i < sheet.getDataRange().getValues().length; ++i) {
//    sheet.autoResizeColumn(i + 1)
//  }
}

function processTeamsDataFull() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var data = ss.getSheetByName('Form Responses 1').getDataRange().getValues();
  
    // initializing output sheet
  var sheet = ss.getSheetByName("Teams' Data Full");
  if(sheet != null) {
    ss.deleteSheet(sheet);
  }
  sheet = ss.insertSheet("Teams' Data Full");
  
  sheet.appendRow(['Category -->', 'Baseline', 'Auto Gear', 'Auto kPa', 'Teleop Gears', 'Human Gear Pickup', 'Ground Gear Pickup', 'Total kPa', 'Ground Fuel Intake', 'Takeoff', 'Defense', 'Break', 'Lose Comm', 'Notes']);
  var emptyRow = new Array();
  emptyRow[0] = ' ';
  sheet.appendRow(emptyRow);
  
  //getting the team names from the data sheet
  var teamNames = new Array();
  for(var i = 1; i < data.length; ++i) {
     teamNames[i - 1] = data[i][3];
  }
  
  //reorganizing team name into order and remove duplicates
  teamNames.sort();
  for(var i = 0; i < teamNames.length - 1; ++i) {
    while(teamNames[i] == teamNames[i + 1]) {
      teamNames.splice(i + 1, 1);
    }
  }
  
  //go through all the data associated with a single team into a two dimensional array
  for (var i = 0; i < teamNames.length; ++i) {
    var teamData = new Array();
    var matchesAlreadyRecorded = 0;
    for(var j = 1; j < data.length; ++j) {
      if(data[j][3] == teamNames[i]) {
        var match = new Array();
        //the match number
        match[0] = "Match " + data[j][2] + ":"; 
        for(var k = 1; k < 14; ++k) {
          match[k] = data[j][k + 3];
        }
        teamData[matchesAlreadyRecorded] = match;
        matchesAlreadyRecorded++;
      }
    }
    //printing out the team name into the sheet
    var teamNameOutput = new Array();
    teamNameOutput[0] = "Team " + teamNames[i] + ":";
    sheet.appendRow(teamNameOutput);
    //printing out the array into the sheet
    for(var j = 0; j < matchesAlreadyRecorded; ++j) {
      sheet.appendRow(teamData[j]);
    }
    var emptyRow = new Array();
    emptyRow[0] = " ";
    sheet.appendRow(emptyRow);
  }
  
    //formatting width of columns
//  for(var i = 0; i < sheet.getDataRange().getValues().length; ++i) {
//    sheet.autoResizeColumn(i + 1)
//  }
  
}


// Avert your eyes from the following code. Symptons include nausea, vomitting, and loss of consciousness
// Sheet with teams' average performances
function processTeamsDataAverage() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var data = ss.getSheetByName('Form Responses 1').getDataRange().getValues();
  
    // initializing output sheet
  var sheet = ss.getSheetByName("Teams' Data Averaged");
  if(sheet != null) {
    ss.deleteSheet(sheet);
  }
  sheet = ss.insertSheet("Teams' Data Averaged");
  
  sheet.appendRow(['Category -->', 'Baseline', 'Auto Gear Left', 'Auto Gear Middle', 'Auto Gear Right', 'Auto Gear None', 'Auto kPa', 'Teleop Gears', 'Human Gear Pickup', 'Ground Gear Pickup', 'Total kPa', 'Ground Fuel Intake', 'Takeoff', 'Defense', 'Break', 'Lose Comm']);
  var emptyRow = new Array();
  emptyRow[0] = ' ';
  sheet.appendRow(emptyRow);
  
  //getting the team names from the data sheet
  var teamNames = new Array();
  for(var i = 1; i < data.length; ++i) {
     teamNames[i - 1] = data[i][3];
  }
  
  //reorganizing team name into order and remove duplicates
  teamNames.sort();
  for(var i = 0; i < teamNames.length - 1; ++i) {
    while(teamNames[i] == teamNames[i + 1]) {
      teamNames.splice(i + 1, 1);
    }
  }
  
  for (var i = 0; i < teamNames.length; ++i) {
    
    //go through all the data associated with a single team into a two dimensional array
    var teamData = new Array();
    var matchesAlreadyRecorded = 0;
    for(var j = 1; j < data.length; ++j) {
      if(data[j][3] == teamNames[i]) {
        var match = new Array();
        //the team name
        match[0] = "Team " + data[j][3] + ":"; 
        //go through qualitative data and convert to quantitative data
        
        match[1] = data[j][4]; //insert baseline data
        //insert auto gear data
        match[2] = 0;
        match[3] = 0;
        match[4] = 0;
        match[5] = 0;
        if(data[j][5] == "Left") {
          match[2] = 1;
        }
        else if (data[j][5] == "Middle") {
          match[3] = 1;
        }
        else if (data[j][5] == "Right") {
          match[4] = 1;
        }
        else if (data[j][5] == "None") {
          match[5] = 1;
        }        
        //the rest of the data
        for(var k = 6; k < 16; ++k) {
          match[k] = data[j][k];
        }
        
        //putting the match array into the teamData array
        teamData[matchesAlreadyRecorded] = match;
        matchesAlreadyRecorded++;
      }
    }
    
    //averaging the results
    for(var j = 1; j < 14; ++j) {
      var sum = 0;
      for(var k = 0; k < matchesAlreadyRecorded; ++k) {
        sum += teamData[k][j];
      }
      //putting the average in the first row of teamData
      teamData[0][j] = sum/matchesAlreadyRecorded;
    }
    
    //printing out the array into the sheet
    sheet.appendRow(teamData[0]);
  }
  
  //formatting width of columns
  
}