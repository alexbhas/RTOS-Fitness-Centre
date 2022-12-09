
const output = document.getElementById("output")

document.getElementById("file").onchange = function() {
  var file = this.files[0];
  var reader = new FileReader();
  
  //Scatter plots
  poolScatter();
  weightScatter();
  cardioScatter();
  reader.onload = function(progressEvent) {
    // Entire file
    const text = this.result;
    //output.innerText = text;
    // By lines
    var lines = text.split('\n');

    objects = lines.map(line => JSON.parse(line));
    //console.log(objects);

    const emergencyCount = countEmergenciesInArea(objects);
    //console.log(emergencyCount);
    setEmergencyDiv(emergencyCount);

    const tempData = getTempData(objects)
    console.log(tempData);

    //Sauna
    saunaScatter(tempData);


  };
  //Display all Values on screen
  reader.readAsText(file);
};

function getTempData(tempData){
  var temperatureLists = {};
  
  for (var i = 0; i < tempData.length; i++) {
    var jsonObject = tempData[i];
    var type = jsonObject.type;
    if (type === "emergency" || type === "weightroom") continue;
    if (jsonObject.hasOwnProperty("temp")) {
      var temp = jsonObject.temp;
      if (temperatureLists.hasOwnProperty(type)) {
        temperatureLists[type].push(temp);
      } else {
        temperatureLists[type] = [temp];
      }
    }
  }

  return temperatureLists;
}

function countEmergenciesInArea(emergencyValues) {
  // Create an empty object to store the counts for each area
  const counts = {};

  // Iterate over the emergencyValues array
  for (const data of emergencyValues) {
    if (data.type === 'emergency') {
      // If the area is not in the counts object, initialize the count to 0
      if (!counts[data.area]) {
        counts[data.area] = 0;
      }
      // Increment the count for the area
      counts[data.area]++;
    }
  }
  return counts;
}

function setEmergencyDiv(emergencyCount){
  //console.log(emergencyCount);
  for(const key in emergencyCount){
    if(key === document.getElementById('sauna').id){
      const saunaElement = document.getElementById('sauna');
      saunaElement.style.setProperty('--bar-value', (emergencyCount[key]*10) + '%');
      saunaElement.title = 'Sauna - ' + emergencyCount[key];
    }else if(key === document.getElementById('weightroom').id){
      const saunaElement = document.getElementById('weightroom');
      saunaElement.style.setProperty('--bar-value', (emergencyCount[key]*10) + '%');
      saunaElement.title = 'Weightroom - ' + emergencyCount[key];
    }else if(key === document.getElementById('pool').id){
      const saunaElement = document.getElementById('pool');
      saunaElement.style.setProperty('--bar-value', (emergencyCount[key]*10) + '%');
      saunaElement.title = 'Pool - ' + emergencyCount[key];
    }else if(key === document.getElementById('cardio').id){
      const saunaElement = document.getElementById('cardio');
      saunaElement.style.setProperty('--bar-value', (emergencyCount[key]*10) + '%');
      saunaElement.title = 'Cardio - ' + emergencyCount[key];
    }
  }
}

//window.onload = printHello()
// for(const key in emergencyCount){
//   if(emergencyCount[key] === document.getElementById('sauna')){
//     saunaElement.style.setProperty('--bar-value:', emergencyCount[key]);
//   }
// }

/* ========================================================================
 * Scatter Plot
 * ======================================================================== */

function saunaScatter(tempData){
  tempData = tempData['sauna'];
  console.log(tempData)
  
  var min = Math.min.apply(Math, tempData) - 5;
  var max = Math.max.apply(Math, tempData) + 5 ;
  console.log("Min: "+ min + " Max: "+max);

  var valx = Array.apply(null, {length: tempData.length+1 }).map(Number.call, Number).slice(1);
  console.log(valx)

  var trace1 = {
    x: valx,
    y: tempData,   //this will be array of sauna values
    mode: 'markers',
    type: 'scatter',
    name: 'Team A',
    //text: ['A-1', 'A-2', 'A-3', 'A-4', 'A-5'],
    marker: { size: 12 }
  };
  

  var data = [ trace1];
  
  var layout = {
    xaxis: {
      range: [ 0, tempData.length+1]
    },
    yaxis: {
      range: [min, max]
    },
    title:'Sauna Log Points'
  };
  
  Plotly.newPlot('saunDiv', data, layout);
}

function poolScatter(tempData){
  tempData = tempData['pool'];
  console.log(tempData)
  
  var min = Math.min.apply(Math, tempData) - 5;
  var max = Math.max.apply(Math, tempData) + 5 ;
  console.log("Min: "+ min + " Max: "+max);

  var valx = Array.apply(null, {length: tempData.length+1 }).map(Number.call, Number).slice(1);
  console.log(valx)

  var trace1 = {
    x: valx,
    y: tempData,   //this will be array of pool values
    mode: 'markers',
    type: 'scatter',
    name: 'Team A',
    text: ['A-1', 'A-2', 'A-3', 'A-4', 'A-5'],
    marker: { size: 12 }
  };
  

  var data = [ trace1];
  
  var layout = {
    xaxis: {
      range: [ 0, tempData.length+1]
    },
    yaxis: {
      range: [min, max]
    },
    title:'Pool Log Points'
  };
  
  Plotly.newPlot('poolDiv', data, layout);
}

function weightScatter(){
  var trace1 = {
    x: [1, 2, 3, 4, 5],
    y: [1, 6, 3, 6, 1],   //this will be array of sauna values
    mode: 'markers',
    type: 'scatter',
    name: 'Team A',
    text: ['A-1', 'A-2', 'A-3', 'A-4', 'A-5'],
    marker: { size: 12 }
  };
  

  var data = [ trace1];
  
  var layout = {
    xaxis: {
      range: [ 1, 9 ]
    },
    yaxis: {
      range: [0, 8]
    },
    title:'Weightroom Emergency Log Points'
  };
  
  Plotly.newPlot('wegtDiv', data, layout);
}

function cardioScatter(){
  var trace1 = {
    x: [1, 2, 3, 4, 5],
    y: [1, 6, 3, 6, 1],   //this will be array of sauna values
    mode: 'markers',
    type: 'scatter',
    name: 'Team A',
    text: ['A-1', 'A-2', 'A-3', 'A-4', 'A-5'],
    marker: { size: 12 }
  };
  

  var data = [ trace1];
  
  var layout = {
    xaxis: {
      range: [ 1, 9 ]
    },
    yaxis: {
      range: [0, 8]
    },
    title:'Cardio Area Emergency Log Points'
  };
  
  Plotly.newPlot('cardDiv', data, layout);
}


//Scrapped code

/*
    for (var line = 0; line < lines.length; line++) {
      //console.log(lines[line]);
    }
//Parse txt data into one JSON object
// function txtToJson(file){
//   var fs = require("fs");

//   // Read the contents of the file as a string
//   const fileContents = fs.readFileSync('sample.txt', 'utf8');

//   // Split the string into an array of lines
//   const lines = fileContents.split('\n');

//   // Convert each line into a JSON object and store it in the objects array
//   objects = lines.map(line => JSON.parse(line));

//   return objects;
// }

*/

// Create an empty object to hold the grouped data



//{ weightroom: 3, cardio: 3, sauna: 1 }