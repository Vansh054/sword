var play;
var end;
var gamestate = "play";
var sword,sword_sprite;
var fruit1,fruit2,fruit3,fruit4;
var fruits;
var alien1,alien2;
var aliens;
var fruitG, alienG;
var gameover, gameisover;
var gameoverS,knifeS; 
var chance = 0
var score = 0;

function preload(){
  sword = loadImage("sword.png");
  fruit1 = loadImage("fruit1.png"); 
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  alien1 = loadImage("alien1.png");
  alien2 = loadImage("alien2.png");
  gameover = loadImage("gameover.png")
  gameoverS = loadSound("gameover.mp3");
  knifeS = loadSound("knifeSwooshSound.mp3");
}

function setup(){
 createCanvas(400,400);
  
  sword_sprite = createSprite(200,200,10,10);
  sword_sprite.addImage(sword);
  sword_sprite.scale = 0.75;
  
  fruitG = createGroup();
  alienG = createGroup();
  
}

function draw(){
  background("white");
  
  if(gamestate == "play")
    {
  spawnboth();
  sword_sprite.y = World.mouseY;
  sword_sprite.x = World.mouseX;
      text("Score:"+ score, 320, 30);
  text("Chance:"+ chance, 40, 30);
  
  if(sword_sprite.isTouching(fruitG))
    {
      score = score + 1
      fruitG.destroyEach();
      knifeS.play();
    }
  if(sword_sprite.isTouching(alienG))
    {
      chance = chance + 1
      alienG.destroyEach();
      knifeS.play();
    }
  if (chance == 5)
    {
      gamestate = "end"
    }
    }
  drawSprites();
  
  if(chance == 5 && gamestate == "end")
    {
      gameisover = createSprite(200,200,400,400);
      gameisover.addImage(gameover);
      fruitG.velocityX = 3;
      alienG.velocityX = 3;
      sword_sprite.visible = false;
      textSize(15)
      textFont("times new roman")
      text("Press Space to Restart",135,250)
      gameoverS.play();
    }
  
  if(keyDown("space") && gamestate == "end")
    {
      gamestate = "play"
    }
  
    
}

function createfruits(){
fruits=createSprite(Math.round(random(420,425)),Math.round(random(75,275)),10,10);
  rand = Math.round(random(1,4));
  switch(rand)
    {
      case 1: fruits.addImage(fruit1);
              break;
      case 2: fruits.addImage(fruit2);
              break;
      case 3: fruits.addImage(fruit3);
              break;
      case 4: fruits.addImage(fruit4);
              break;
    }
  fruits.velocityX = -5.0;
  fruits.scale = 0.18;
  fruitG.add(fruits);
  }

function createaliens(){
aliens=createSprite(Math.round(random(420,425)),Math.round(random(75,275)),10,10);
    ran = Math.round(random(1,2));
  switch(ran)
    {
      case 1: aliens.addImage(alien1);
              break;
      case 2: aliens.addImage(alien2);
              break;
   }
  aliens.velocityX = -5.0;
  alienG.add(aliens);
}

function spawnboth(){
  if (frameCount % 75 == 0)
   {
  rando = Math.round(random(1,2));
  switch(rando)
    {
      case 1: createfruits();
              break;
      case 2: createaliens();
              break;
    }
   }
}



