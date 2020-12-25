var player,obstacle,back,banana,sound,gameOver,restart;
var playerImage,obstacleImage,backImage,bananaImage,gameOverImage,restartImage;
var obstacleGroup,bananaGroup;
var PLAY=1;
var END=0;

var gameState=PLAY;

var score=0;


function preload(){
    backImage  = loadImage("back.png");
    playerImage = loadImage("removed.png")
    bananaImage = loadImage("banana.png")
    obstacleImage = loadImage("stone.png")
    gameOverImage = loadImage("gameOver.png")
    restartImage = loadImage("restart.png")
    sound = loadSound("sound.mp3")
}

function setup() {
 createCanvas(600,600)
  
  back = createSprite(300,300,400,400)
  back.addImage(backImage)
  back.scale=4.65;
  back.velocityY=-3
  
  player = createSprite(300,80)
  player.addImage(playerImage)
  player.scale=0.5
  
  
  restart = createSprite(300,300)
  restart.addImage(restartImage)
  restart.visible=false;
  
    
  gameOver = createSprite(300,250)
  gameOver.addImage(gameOverImage)
  gameOver.visible=false;
  
  sound.loop();
  
  obstacleGroup = new Group();
  bananaGroup = new Group();
  
}

function draw() {
 
  background("white")

  camera.position.x = width/2;
  camera.position.y=height/2-50;
  
  if (gameState===PLAY){
    
    if (back.y<0){
    back.y=back.height/2
  }
  
  if (keyDown("left")){
    if (player.x>0)
     player.x=player.x-10;
  }
  
  if (keyDown("right")){
    if (player.x<600)
     player.x=player.x+10;
  }
  
  if (bananaGroup.isTouching(player)){
    bananaGroup.destroyEach();
    score=score+1;
  }
  
  
  spawnObstacle();
  spawnBanana();
  
  
  
    if (obstacleGroup.isTouching(player)){
      gameState=END
    }
    
  }else if(gameState===END){
    
    background("white")
   
    restart.visible=true;
    gameOver.visible=true;
  
    
    //player.destroy();
    obstacleGroup.destroyEach();
    bananaGroup.destroyEach();
    back.velocityY=0;
    
    if (mousePressedOver(restart)){
      
      reset();      
    }
    
  }

  
  drawSprites();
  textSize(30)
  fill("black")
  text("Score: "+score,20,40)
}

function spawnBanana(){
  if (frameCount%80===0){
  banana = createSprite(200,600)
  banana.addImage(bananaImage)
  banana.scale=0.1
  banana.velocityY=-3
  banana.lifeTime=132;
  bananaGroup.add(banana)
  banana.x = Math.round(random(0,400))
  }
}

function spawnObstacle(){
  if (frameCount%80===0){
  obstacle = createSprite(200,600)
  obstacle.addImage(obstacleImage)
  obstacle.scale=0.3
  obstacle.velocityY=-3
  obstacle.lifeTime=132;
  obstacleGroup.add(obstacle)
  obstacle.debug=false
  obstacleGroup.setColliderEach("rectangle",0,0,450,450)
  obstacle.x = Math.round(random(50,600))
  }
}

function reset(){
  
  gameState = PLAY;
  
  restart.visible=false;
  gameOver.visible=false;
  obstacleGroup.destroyEach();
  bananaGroup.destroyEach();
  back.velocityY=-3
  score=0;
}



