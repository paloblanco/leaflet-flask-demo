// Create a map object.
let myMap = L.map("map", {
  center: [37.09, -95.71],
  zoom: 5
});

// Add a tile layer.
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// Define a markerSize() function that will give each city a different radius based on its population.
function markerSize(population) {
  return Math.sqrt(population) * 50;
}

// get our data via json
let apiCity = "/api/locations"

d3.json(apiCity).then(function(data) {

  for (let i = 0; i < data.length; i++) {
    let city = data[i];
    L.circle([city[2],city[3]], {
      fillOpacity: 0.75,
      color: "white",
      fillColor: "purple",
      // Setting our circle's radius to equal the output of our markerSize() function:
      // This will make our marker's size proportionate to its population.
      radius: markerSize(city[1])
    }).bindPopup(`<h1>${city[0]}</h1> <hr> <h3>Population: ${city[1].toLocaleString()}</h3>`).addTo(myMap);
  }
})



// Each city object contains the city's name, location, and population.
// Population Data Source: U.S. 2020 Decennial Census
let cities = [
  {
    name: "New York",
    location: [40.7128, -74.0059],
    population: 8804190
  },
  {
    name: "Chicago",
    location: [41.8781, -87.6298],
    population: 2746388
  },
  {
    name: "Houston",
    location: [29.7604, -95.3698],
    population: 2304580
  },
  {
    name: "Los Angeles",
    location: [34.0522, -118.2437],
    population: 3898747
  },
  {
    name: "Omaha",
    location: [41.2524, -95.9980],
    population: 486051
  }
];

// Loop through the cities array, and create one marker for each city object.

