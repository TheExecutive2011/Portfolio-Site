const g_maps_url = "https://portfolio-site-back-end.herokuapp.com/api/maps"

async function getGMaps() {
  try {
    console.log('getGMaps() try reached successfully')
    const response = await fetch(g_maps_url);
    const iframe = await response.text();
    document.getElementById('gMaps').innerHTML = iframe;
  }
  catch (error) {
    console.log('getGMaps() error catch reached...successfully?')
    console.error(error);
  }
}

async function getResume() {
  try {
    //Fetches document from the back end
    fetch("resources/images/WarrenMorrison_Resume_1-7-2023.pdf").then(function (response) {
      response.blob().then(function (blob) {
        //Creates a new Blob object with the resume file data
        const url = URL.createObjectURL(blob);
        //Creates a new anchor element
        const a = document.createElement("a");
        //Sets the href attribute of the anchor element to the URL of the PDF file
        a.href = url;
        //Sets the download attribute of the anchor element
        a.download = "resources/images/WarrenMorrison_Resume_1-7-2023.pdf";
        //Simulates a mouse click on the anchor element
        a.click();
        // revoke the URL object to free up memory
        URL.revokeObjectURL(url);
      });
    });
  }
  catch (error) {
    console.log('getResume() error catch reached...successfully?')
    console.error(error);
  }
}

async function getGames() {
  try {
    const bggData = new XMLHttpRequest();
    bggData.onreadystatechange = function () {
      if (bggData.readyState === XMLHttpRequest.DONE) {
        if (bggData.status === 200) {
          // success
          const xmlData = bggData.responseXML;
          // Get the list of items in the collection
          const items = xmlData.getElementsByTagName('item');
          // Get the list element
          const collectionList = document.getElementById('collection-list');
          // Iterate through the items and add them to the list
          for (const item of items) {
            console.log(item);
          }


          for (const item of items) {
            // Get the name, year published, and image of the item
            const name = item.getElementsByTagName('name')[0].textContent;
            const year = item.getElementsByTagName('yearpublished')[0].textContent;
            const image = item.getElementsByTagName('image')[0].textContent;
            // Get the statistics for the item
            const stats = item.getElementsByTagName('stats')[0];
            const rating = stats.getElementsByTagName('rating')[0].getAttribute('value');
            const usersRated = stats.getElementsByTagName('usersrated')[0].getAttribute('value');
            const average = stats.getElementsByTagName('average')[0].getAttribute('value');
            // Get the status and number of plays for the item
            const status = item.getElementsByTagName('status')[0].getAttribute('own');
            const owned = "No"
            try {
              if (status === 0) {
                owned = "No";
              }
              else if (status === 1) {
                owned = "Yes";
              }
            }
            catch {
              // error
              console.error("Something went wrong with the ownership status.");
            }
            const numPlays = item.getElementsByTagName('numplays')[0].textContent;
            // Create a new list item and add it to the list
            const listItem = document.createElement('li');
            listItem.innerHTML = `
              <img src="${image}" alt="${name}">
              <h2>${name}</h2>
              <p>Year Published: ${year}</p>
              <p>Rating: ${rating}</p>
              <p>Users Rated: ${usersRated}</p>
              <p>Average Rating: ${average}</p>
              <p>Do I own this game?: ${owned}</p>
              <p>Number of Plays: ${numPlays}</p>
            `;
            collectionList.appendChild(listItem);
          }
        } 
        
        else {
          // error
          console.error(bggData.statusText);
        }
      }
    };
    //API 2
    //bggData.open('GET', 'https://boardgamegeek.com/xmlapi2/plays?username=theexecutive2011');

    //API 1
    bggData.open('GET', 'https://boardgamegeek.com/xmlapi/collection/theexecutive2011?played=1');
    bggData.send();
  }
  catch {
    console.log('getGames() error catch reached...successfully?')
    console.error(error);
  }
}