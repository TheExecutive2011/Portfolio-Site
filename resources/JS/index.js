const g_maps_url = "https://portfolio-site-back-end.herokuapp.com/api/maps"

async function getGMaps() {
  console.log('getGMaps() reached successfully')
  fetch(g_maps_url)
    console.log('fetch reached successfully')
    .then(response => response.text())
    .then(iframe => {
      document.getElementById('gMaps').innerHTML = iframe;
    })
    .catch(error => {
      console.log('error reached successfully')
      console.error(error);
    });
}

