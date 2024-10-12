let slider = document.getElementById("name-length");
let output = document.getElementById("display-length");
let honorButton = document.getElementById("honorific");
let addTitle = true;
let nameBar = document.getElementById("name");

honorButton.onclick = function() {
    if (addTitle){
        honorButton.innerHTML = "No"
        honorButton.classList.replace("is-success","is-danger")
    }
    else{
        honorButton.innerHTML = "Yes"
        honorButton.classList.replace("is-danger","is-success")
    }
    addTitle = 1 - addTitle;
};

output.innerHTML = slider.value + " Syllables";

let nameLength = slider.value;
let previousName;

slider.oninput = function() {
    output.innerHTML = this.value + " Syllables";
    nameLength = slider.value;
};

nameBar.onclick = function(){
    previousName = nameBar.innerHTML;
   
    navigator.clipboard.writeText(nameBar.innerHTML);
    nameBar.classList.replace("is-text","is-success");
    nameBar.innerHTML = "Copied!";
};
nameBar.onmouseleave = function(){
    if (nameBar.innerHTML != "Copied!"){
        return;
    }
    nameBar.innerHTML = previousName;
    nameBar.classList.replace("is-success","is-text");
};

function fillName(){
    var textBox = document.getElementById("name");
    textBox.innerHTML = fullTitle();
  };
  
  function generateName(){
      const vowels = ["a","e","i","o","u","y"];
      const consonants = ["b","c","d","f","g","h","j","k","l","m","n","p","q","r","s","t","v","w","x","z","qu","ch","bl","cl","fl","gl","pl","sl","br","cr","dr","fr","gr","pr","tr","sc","sk","sm","sn","sp","st"];
    var name = "";
    for(let i = 0; i < Math.floor(Math.random() * nameLength - 1) + 2; i++){
      name += consonants[Math.floor(Math.random() * consonants.length)];
      name += vowels[Math.floor(Math.random() * vowels.length)];
    }
    return capitalize(name);
  }
  
  function fullTitle(name){
      const titles = [" the Third"," Junior",", Destroyer of Worlds"," the Exiled"," the Stupid"," the Fatty"];
  
    var name = generateName();
    var titlesLength = titles.length;
    titles.push(", King of " + generateName(), ", Son of " + generateName(), ", Heir of Clan " + generateName());
    
    var randomTitle = titles[Math.floor(Math.random() * titles.length)];
    
    for (let i = 0; i < titles.length - titlesLength; i++){
      titles.pop();
    }
    titles.pop();
    if (addTitle){
        return name + randomTitle;
    }
    return name
  }
  
  function capitalize(word){
    return word.charAt(0).toUpperCase() + word.slice(1);
  }
  