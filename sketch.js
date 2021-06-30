var tower, towerImg;
var door, doorImg, doorsGroup;
var climber, climberImg, climbersGroup;
var ghost,  ghostImg;
var invisibleBlock, invisibleblocksGroup;
var sound,gameOver,gameOverImg;
var gameState = "play"
var score = 0;

function preload(){
 
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("b.png");
  sound = loadSound("spooky.wav");
  gameOverImg = loadImage("go.png");
  
}

function setup(){
  createCanvas(600,600);
  
  //sound.loop();
  
  tower = createSprite(300,300);
  tower.addImage(towerImg);
  tower.velocityY = 2;
  
  ghost = createSprite(200,200);
  ghost.addImage("ghost", ghostImg);
  ghost.scale = 0.15;

 
  
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleblocksGroup = new Group();
  
}
function draw(){
  background(0);
  
  if(gameState==="play"){
    
    score = score + Math.round(getFrameRate()/60);
    
    
  if(keyDown("left_arrow")){
    ghost.x = ghost.x - 3;
  }
  
   if(keyDown("right_arrow")){
    ghost.x = ghost.x + 3;
  }
  
  if(keyDown("space")){
    ghost.velocityY = -5;
  }
  
  ghost.velocityY = ghost.velocityY + 0.8;
  
  if(climbersGroup.isTouching(ghost)){
    ghost.velocityY = 0;
  }
  
  if(invisibleblocksGroup.isTouching(ghost)||ghost.y>600){
    ghost.destroy();
    gameState = "end"
  }
  
 if(tower.y > 200){
    tower.y = 100;
  }
 
  
  spawnDoors();
  
  camera.position.x = displayWidth/2 - 380;
   camera.position.y = ghost.y;
 
  }
  
  if(gameState === "end"){
   
    gameOver = createSprite(300,300);
    gameOver.addImage(gameOverImg);
    gameOver.scale = 1.2;
    
    var rect = createSprite(400,600,1000,10000)
  // rect.mode(CENTER);
   rect.shapeColor = "black";

   rect.depth = gameOver.depth;
    gameOver.depth = gameOver.depth + 1;

   
    
 }
 stroke("black");
 fill("black");
 textSize(30);
 text("Score:"+score, 600,600);
 
  drawSprites();

}

function spawnDoors(){
  
  if(frameCount%60===0){
    door = createSprite(200,-50);
    door.addImage(doorImg);
    
    climber = createSprite(200,10);
    climber.addImage(climberImg);
    
    invisibleBlock = createSprite(200,10);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    
    door.x = Math.round(random(120,400));
    
    climber.x = door.x;
    invisibleBlock.x = door.x;
    
    door.velocityY = 2;
    climber.velocityY = 2;
    invisibleBlock.velocityY = 2;
    
    ghost.depth = door.depth;
    ghost.depth = ghost.depth + 1;
    
    door.lifetime = 800;
    climber.lifetime = 800;
    doorsGroup.add(door);
    climbersGroup.add(climber);
    invisibleBlock.debug = true;
    invisibleblocksGroup.add(invisibleBlock);
    
  }
}