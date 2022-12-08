//Requires
var readline = require('readline');
var fs = require('fs');

//Parse txt data into one JSON object
function txtToJson(filename){
  // Read the contents of the file as a string
  const fileContents = fs.readFileSync('sample.txt', 'utf8');

  // Split the string into an array of lines
  const lines = fileContents.split('\n');

  // Convert each line into a JSON object and store it in the objects array
  objects = lines.map(line => JSON.parse(line));

  return objects;
}

// Create an empty object to hold the grouped data
const textData = txtToJson();
console.log(textData);

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

const emergnecyCount = countEmergenciesInArea(textData);
console.log()

//{ weightroom: 3, cardio: 3, sauna: 1 }
function printHello(){
  
  //Sauna value setting
  var saunaPer = '70';
  var saunaCnt = '7';
  const saunaElement = document.getElementById("sauna");
  saunaElement.style.setProperty('--bar-value',saunaPer+'%');
  saunaElement.title = 'Sauna - ' + saunaCnt;
}


// for(const key in emergnecyCount){
//   if(emergnecyCount[key] === document.getElementById('sauna')){
//     saunaElement.style.setProperty('--bar-value:', emergnecyCount[key]);
//   }
// }
console.log(" --------------------------------------- \nEmergency Count data:")
console.log(emergnecyCount);
