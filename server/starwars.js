/*
STARWARS APP
-Summary:
I: passengers, pilots (fetched from api), ships (fetched from api)
O: sorted list of pilots/ships that have cap to carry provided passengers
C: n/a

-Example:
I: 10
O: Anakin Skywalker  -  Trade Federation cruiser
Chewbacca  -  Imperial shuttle
Han Solo  -  Imperial shuttle
Luke Skywalker  -  Imperial shuttle
Obi-Wan Kenobi  -  Trade Federation cruiser

-To run:
 -node starwars.js
*/

const fetch = require('node-fetch');


async function findMatchingPilotsAndShips(passengers) {
  let pilots, ships;

  try {
    pilots = await getResourceRecursively('people', 1, [])
    ships = await getResourceRecursively('starships', 1, [])
  }
  catch (err) {
    throw new Error(`Failure in findMatchingPilotsAndShips due to ${err}`);
  }

  return findMatches(passengers, pilots, ships);
}

function getResourceRecursively(resource, pageId, data) {
  return fetch(`https://swapi.co/api/${resource}/?page=${pageId}`)
          .then((res) => {
            return res.json();
          })
          .then((res) => {
            let updatedData = data.concat(res.results);
            
            if(res.next) {
              return getResourceRecursively(resource, pageId + 1, updatedData)
            } 
            
            return updatedData;
          })
          .catch((err) => {
            throw new Error(`Failed to get ${resource} due to ${err}`)
          })
}

function findMatches(passengers, pilots, ships) {
  let matchingPilotNames = [];
  let pilotToShipNames = {};
  let shipUrlsToNames = {}

  //populate shipUrlsToNames
  for(let i = 0; i < ships.length; i++) {
    let currShipObj = ships[i];

    if(parseInt(currShipObj.passengers) >= passengers && currShipObj.pilots.length) {
      let currShipUrl = currShipObj.url;
      let currShipName = currShipObj.name;

      shipUrlsToNames[currShipUrl] = currShipName;
    }
  }

  //populate pilotToShipNames
  for(let j = 0; j < pilots.length; j++) {
    let currPilotObj = pilots[j];
    let currPilotName = currPilotObj.name;

    let matchingPilotShipUrls = currPilotObj.starships
                                  .filter((url) => {
                                    return shipUrlsToNames[url];
                                  })

    if(matchingPilotShipUrls.length) {
      matchingPilotNames.push(currPilotName);

      let matchingPilotShipsSorted = matchingPilotShipUrls 
                                      .map((url) => {
                                        return shipUrlsToNames[url];
                                       })
                                      .sort();

      pilotToShipNames[currPilotName] = matchingPilotShipsSorted;
    }                            
  }

  //sort pilotNames
  let sortedPilotNames = matchingPilotNames.sort();

  //print out matching pilot/ships
  for(let k = 0; k < sortedPilotNames.length; k++) {
    let currPilot = sortedPilotNames[k];
    let pilotShips = pilotToShipNames[currPilot]

    if(pilotShips.length) {
      for(let l = 0; l < pilotShips.length; l++) {
        let currShip = pilotShips[l];
        console.log(currPilot + " - " + currShip)
      }
    }
  }
}

findMatchingPilotsAndShips(10);