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