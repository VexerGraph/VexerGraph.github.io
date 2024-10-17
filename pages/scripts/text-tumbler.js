const input = document.getElementById('text-box');
const clearAll = document.getElementById('clear');

let sprites = [];
let lSprites = [];
let floor, mouse, ceiling;
let walls = [];
let { spriteIndex, lSpriteIndex } = 0;

let collisionGroup, stupidGroup;

let canvasWidth = 850, canvasHeight = 350;

input.addEventListener("keyup", ({key}) => {
    if (key === "Enter") {
        //console.log(input.value);
        if(input.value == ""){
            input.value = "TEXT";
        };
          sprites[spriteIndex] = new Sprite();
          sprites[spriteIndex].y = 35;
          sprites[spriteIndex].width = input.value.length * 20;
          sprites[spriteIndex].x = canvasWidth/2;
          sprites[spriteIndex].height = 35;
          sprites[spriteIndex].color = 'white';
          sprites[spriteIndex].stroke = 'white';
          sprites[spriteIndex].textSize = 40;
          sprites[spriteIndex].text = input.value;
          collisionGroup.add(sprites[spriteIndex]);
          stupidGroup.add(sprites[spriteIndex]);
          spriteIndex++;
    }
});

clearAll.onclick = () => {
    stupidGroup.removeAll();
}

function setup(){
    let canvas = createCanvas(canvasWidth,canvasHeight);
    canvas.parent('canvas');
    //canvas.parent('canvas');
    collisionGroup = new Group();
    stupidGroup = new Group();

    world.gravity.y = 10;
  
    createWalls(walls);
    
    floor = new Sprite();
    floor.y = 350;
    floor.w = 850;
    floor.h = 5;
    floor.color = color(76, 175, 80);
    floor.collider = 'static';
    floor.visible = false;
    collisionGroup.add(floor);

    floor = new Sprite();
    floor.y = 0;
    floor.w = 850;
    floor.h = 5;
    floor.color = color(76, 175, 80);
    floor.collider = 'static';
    floor.visible = false;
    collisionGroup.add(floor);

    mouse = new Sprite();
    mouse.diameter = 15;
    mouse.color = 'white';
    mouse.collider = 'kinematic';
}

function draw(){
    background("white");
    mouse.moveTowards(mouseX,mouseY,0.5);

    for (let b = 0; b < sprites.length; b++){
        if(sprites[b].colliding(collisionGroup)){
            let textArr = [...sprites[b].text];
            let angleStep = 360 / textArr.length;

        for (let j = 0; j < textArr.length; j++){
            let angle = radians(sprites[b].rotation + j * angleStep);
            let yAngleTrans = sin(angle) * 100;

            if(sprites[b].rotation < 0){
                
                yAngleTrans *= -1;
            };

            let xTrans = j * textArr.length;
            createLSprite(sprites[b].x + xTrans,sprites[b].y + yAngleTrans, textArr[j]);
        };
        sprites[b].remove();
        sprites.splice(b,1);
    };
  };
  if(sprites){
    spriteIndex = 0;
  }
  if(lSprites){
    lSpriteIndex = 0;
  }
};

function createWalls(wall){
  for (let i = 0; i < 2; i++){
    wall[i] = new Sprite();
    wall[i].w = 5;
    wall[i].visible = false;
    wall[i].h = 350;
    wall[i].collider = 'static';
    wall[i].color = color(76, 175, 80);
    if(i == 0){
      wall[i].x = 0;
    }
    else{
      wall[i].x = canvasWidth;
    };
  };
};

function createLSprite(x, y, char){
  let capitalized = 0;
  if (char === char.toUpperCase()){
    capitalized = 5;
  }
          lSprites[lSpriteIndex] = new Sprite();
          lSprites[lSpriteIndex].y = y + capitalized;
          lSprites[lSpriteIndex].diameter = 25 + capitalized;
          lSprites[lSpriteIndex].x = x;
          lSprites[lSpriteIndex].color = 'white';
          lSprites[lSpriteIndex].stroke = 'white';
          lSprites[lSpriteIndex].textSize = 40;
          lSprites[lSpriteIndex].text = char;
          collisionGroup.add(lSprites[lSpriteIndex]);
          stupidGroup.add(lSprites[lSpriteIndex]);
          lSpriteIndex++;
};
