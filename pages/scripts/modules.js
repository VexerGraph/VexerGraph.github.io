function generateName(){
    const vowels = ["a","e","i","o","u","y"];
    const consonants = ["b","c","d","f","g","h","j","k","l","m","n","p","q","r","s","t","v","w","x","z","qu","ch","bl","cl","fl","gl","pl","sl","br","cr","dr","fr","gr","pr","tr","sc","sk","sm","sn","sp","st"];
  var name = "";
  for(let i = 0; i < Math.floor(Math.random() * 4 - 1) + 2; i++){
    name += consonants[Math.floor(Math.random() * consonants.length)];
    name += vowels[Math.floor(Math.random() * vowels.length)];
  }
  return capitalize(name);
}

function fullTitle(addTitle){
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
};

function shuffle(array) {
    let currentIndex = array.length;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  }

export {generateName, fullTitle, shuffle};