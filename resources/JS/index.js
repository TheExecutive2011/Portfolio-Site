const g_maps_url = "https://portfolio-site-back-end.herokuapp.com/api/maps"

fetch(g_maps_url)
  .then(response => response.text())
  .then(iframe => {
    document.getElementById('gMaps').innerHTML = iframe;
  })
  .catch(error => {
    console.error(error);
  });