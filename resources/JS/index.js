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
    const collectionUrl = 'https://boardgamegeek.com/xmlapi/collection/theexecutive2011?played=1';
    const playsUrl = 'https://boardgamegeek.com/xmlapi2/plays?username=theexecutive2011';

    const [collectionData, playsData] = await Promise.all([fetchXmlData(collectionUrl), fetchXmlData(playsUrl)]);

    const items = Array.from(collectionData.getElementsByTagName('item'));
    const plays = Array.from(playsData.getElementsByTagName('play'));

    const mergedItems = items.map((item) => {
      const objectid = item.getAttribute('objectid');
      const relatedPlay = plays.find((play) => play.getElementsByTagName('item')[0].getAttribute('objectid') === objectid);
      return { item, relatedPlay };
    });

    mergedItems.sort((a, b) => {
      const aDate = a.relatedPlay ? a.relatedPlay.getAttribute('date') : '-';
      const bDate = b.relatedPlay ? b.relatedPlay.getAttribute('date') : '-';
      return aDate < bDate ? 1 : aDate > bDate ? -1 : 0;
    });

    const collectionList = document.getElementById('collection-list');
    for (const { item, relatedPlay } of mergedItems) {
      displayItem(item, relatedPlay, collectionList);
    }
  } catch (error) {
    console.error('getGames() error:', error);
  }
}

function findRelatedItem(xmlData, objectid) {
  const plays = xmlData.getElementsByTagName('play');
  for (const play of plays) {
    const item = play.getElementsByTagName('item')[0];
    if (item.getAttribute('objectid') === objectid) {
      return item;
    }
  }
  return null;
}

function displayItem(item, relatedPlay, collectionList) {
  const name = item.getElementsByTagName('name')[0].textContent;
  const year = item.getElementsByTagName('yearpublished')[0].textContent;
  const image = item.getElementsByTagName('image')[0].textContent;
  const stats = item.getElementsByTagName('stats')[0];
  const rating = stats.getElementsByTagName('rating')[0].getAttribute('value');
  const usersRated = stats.getElementsByTagName('usersrated')[0].getAttribute('value');
  const average = stats.getElementsByTagName('average')[0].getAttribute('value');

  const numPlays = relatedPlay ? relatedPlay.getAttribute('quantity') : '0';
  const date = relatedPlay ? relatedPlay.getAttribute('date') : 'Unknown';

  const listItem = document.createElement('li');
  listItem.innerHTML = `
      <div class="GameContainer">
        <div class="GameImageContainer">  
          <img src="${image}" alt="${name}" class="bgg_image">
        </div>
        <h3>${name}</h3>
        <p>Date: <i>${date}</i></p>
        <p>Year Published: <i>${year}</i></p>
        <p>My Total Number of Plays: <i>${numPlays}</i></p>
        <p>My Rating: <i>${rating} / 10</i></p>
        <p>Total Number of Ratings: <i>${usersRated}</i></p>
        <p>Average Rating: <i>${average} / 10</i></p>
        <br>
      </div>
    `;
  collectionList.appendChild(listItem);
}

async function fetchXmlData(url) {
  try {
    const response = await fetch(url);
    if (response.status === 200) {
      const textData = await response.text();
      const parser = new DOMParser();
      const xmlData = parser.parseFromString(textData, 'application/xml');
      return xmlData;
    } else {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }
  } catch (error) {
    console.error('Error fetching XML data:', error);
    throw error;
  }
}

async function handleSubmit(e) {
  e.preventDefault();
  
  const name = e.target.elements.name.value;
  const email = e.target.elements.email.value;
  const message = e.target.elements.message.value;
  const responseMessage = document.querySelector('#form-response');

  try {
    const formResponse = await fetch('https://portfolio-site-back-end.herokuapp.com/api/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, message })
    });

    const data = await formResponse.json();

    if (data.success) {
      alert('Thanks for reaching out!');
      responseMessage.textContent = 'Thanks for reaching out!';
    } else {
      alert('There was an error sending your message.');
      responseMessage.textContent = 'There was an error sending your message. Please try again.';
    }
  } catch (error) {
    console.error('Error:', error);
    alert('There was an error sending your message. Please try again.');
    responseMessage.textContent = 'There was an error sending your message. Please try again.';
  }

  // Clear form
  e.target.elements.name.value = '';
  e.target.elements.email.value = '';
  e.target.elements.message.value = '';
}

document.querySelector('#inputForm').addEventListener('submit', handleSubmit);