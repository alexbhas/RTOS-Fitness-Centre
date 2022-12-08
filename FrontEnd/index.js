
const output = document.getElementById("output")

document.getElementById("file").onchange = function() {
  var file = this.files[0];
  console.log("hello");
  var reader = new FileReader();
  reader.onload = function(progressEvent) {
    // Entire file
    const text = this.result;
    output.innerText = text

    // By lines
    var lines = text.split('\n');
    for (var line = 0; line < lines.length; line++) {
      console.log(lines[line]);
    }
  };
  reader.readAsText(file);
};


//Parse txt data into one JSON object
function txtToJson(){
  var fs = require("fs");

  // Read the contents of the file as a string
  const fileContents = fs.readFileSync('sample.txt', 'utf8');

  // Split the string into an array of lines
  const lines = fileContents.split('\n');

  // Convert each line into a JSON object and store it in the objects array
  objects = lines.map(line => JSON.parse(line));

  return objects;
}

// Create an empty object to hold the grouped data

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

//{ weightroom: 3, cardio: 3, sauna: 1 }

function printHello(){
  //Get EmergencyCount
  const textData = txtToJson();
  const emergnecyCount = countEmergenciesInArea(textData);

  //Sauna value setting
  var saunaPer = '70';
  var saunaCnt = '7';

  for(const key in emergnecyCount){
    console.log(key);
    // if(key === document.getElementById('sauna')){
    //   const saunaElement = document.getElementById("sauna");
    //   saunaElement.style.setProperty('--bar-value', );
    //   saunaElement.title = 'Sauna - ' + emergnecyCount[key].toString();
    // }
  }
}

printHello();

//window.onload = printHello()
// for(const key in emergnecyCount){
//   if(emergnecyCount[key] === document.getElementById('sauna')){
//     saunaElement.style.setProperty('--bar-value:', emergnecyCount[key]);
//   }
// }
