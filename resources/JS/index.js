const g_maps_url = "https://portfolio-site-back-end.herokuapp.com/api/maps"

async function getGMaps() {
  try {
    console.log('getGMaps() try reached successfully')
    const response = await fetch(g_maps_url);
    const iframe = await response.text();
    document.getElementById('gMaps').innerHTML = iframe;
  } 
  catch (error) {
    console.log('getGMaps() catch reached...successfully?')
    console.error(error);
  }
}

