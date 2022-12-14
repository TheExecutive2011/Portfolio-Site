//const { response } = require("express");

// Making a map and tiles
const mymap = L.map('issMap').setView([0, 0], 6);
const attribution =
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const tiles = L.tileLayer(tileUrl, { attribution });
tiles.addTo(mymap);

// Making a marker with a custom icon
const issIcon = L.icon({
    iconUrl: 'resources/images/iss200.png',
    iconSize: [50, 32],
    iconAnchor: [25, 16]
});
const marker = L.marker([0, 0], { icon: issIcon }).addTo(mymap);



const api_url = 'https://api.wheretheiss.at/v1/satellites/25544';

let firstTime = true;

// Gets the location of the ISS
async function getISS() {
    const response = await fetch(api_url);
    const data = await response.json();
    const { latitude, longitude } = data;

    //Sets the marker's location to that of the ISS
    marker.setLatLng([latitude, longitude]);
    if (firstTime) {
        mymap.setView([latitude, longitude], 4);
        firstTime = false;
    }

    // Sets the view to the current coordinates and zoom
    mymap.setView([latitude, longitude], mymap.getZoom());
    marker.setLatLng([latitude, longitude]);


    document.getElementById('lat').textContent = latitude.toFixed(3);
    document.getElementById('lon').textContent = longitude.toFixed(3);
}

const test_url = "https://portfolio-site-back-end.herokuapp.com/test" //Added for test

//Added for test
async function getTest() { 
    const responseTest = await fetch(test_url);
    const data = await responseTest.json();
    console.log(responseTest);
    console.log(data); 
}