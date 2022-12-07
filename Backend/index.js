var readline = require('readline');
var fs = require('fs');

// Create an empty object to hold the grouped data
const groupedData = {};

function groupJSONData(filename) {
  
    // Read the file using the Node.js fs module
    const fs = require("fs");
    const file = fs.readFileSync('sample.txt', "utf8");
  
    // Split the file into lines
    const lines = file.split("\n");
  
    // Loop through all the lines in the file
    for (const line of lines) {
      // Parse the line as a JSON object
      const jsonObject = JSON.parse(line);
  
      // Loop through all the keys in the JSON object
      for (const key in jsonObject) {
        // Check if the current key is already in the grouped data object
        if (groupedData.hasOwnProperty(key)) {
          // If it is, add the current value to the array for that key
          groupedData[key].push(jsonObject[key]);
        } else {
          // If it isn't, create a new array for the key and add the current value to it
          groupedData[key] = [jsonObject[key]];
        }
      }
    }
  
    // Loop through all the keys in the grouped data object and print out the grouped data
    for (const key in groupedData) {
      console.log(`"${key}": ${groupedData[key]}`);
    }
  }
  
 

  groupJSONData();
  console.log("---------------------------");
  console.log(groupedData);
