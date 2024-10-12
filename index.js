fetch('gif-list.json')
    .then(response => response.json())
    .then(data => {
        loadRandomGif(data);
    }).catch(error => console.error('Error fetching JSON:', error));

function loadRandomGif(data){
    let img = document.getElementById("random-gif");
    let chosenImage = data[Math.floor(Math.random()*data.length)];

    //console.log("Chose gif:" + chosenImage);

    img.src = chosenImage.link;
    img.alt = chosenImage['alt-text'];
}