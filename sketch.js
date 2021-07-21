var PLAY = 1;
var END = 0;
var gameState = PLAY;

var sonic, sonic_running, sonic_colided;
var background, backgroundImg;

var cloudsGroup, cloudsImg;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6 ;

var score = 0;

var gameOver, restart;



function preload(){
    sonic_running =   loadAnimation("sonic.png");
    sonic_collided = loadAnimation("sonic_collided.png");
        
    backgroundImage = loadImage("background2.jpg");
    
    cloudImage = loadImage("cloud.png");
    
    obstacle1 = loadImage("obstacle1.png");
    obstacle2 = loadImage("obstacle2.png");
    obstacle3 = loadImage("obstacle3.png");
    obstacle4 = loadImage("obstacle4.png");
    obstacle5 = loadImage("obstacle5.png");
    obstacle6 = loadImage("obstacle6.png");
    
    gameOverImg = loadImage("gameOver.png");
    restartImg = loadImage("restart.png");
  }
  
  function setup() {
    createCanvas(400, 300);
    
    sonic = createSprite(50,180,20,50);
    
    sonic.addAnimation("running", sonic_running);
    sonic.addAnimation("collided", sonic_collided);
    sonic.scale = 0.1;

    background = createSprite(200,120,400,20);
    background.addImage("background",backgroundImage);
    background.x = background.width /2;
    background.velocityX = -(6 + 3*score/100);
    
    gameOver = createSprite(200,100);
    gameOver.addImage(gameOverImg);
    
    restart = createSprite(180,140);
    restart.addImage(restartImg);
    
    gameOver.scale = 0.5;
    restart.scale = 0.5;
  
    gameOver.visible = false;
    restart.visible = false;
    
    invisiblebackground = createSprite(200,233,400,10);
    invisiblebackground.visible = false;

    sonic.setCollider("rectangle",0,0,sonic.width,sonic.height);
    sonic.debug = false;

    
    cloudsGroup = new Group();
    obstaclesGroup = new Group();
    
    score = 0;
  }
  

  function draw() {
    
    if (gameState===PLAY){
      score = score + Math.round(getFrameRate()/60);
      background.velocityX = -(6 + 3*score/100);

      if(keyDown("space")&& sonic.y >= 100) {
        sonic.velocityY = -12;
    }
    
      sonic.velocityY = sonic.velocityY + 0.8
    
      if (background.x < 0){
        background.x = background.width/2;
      }
    
      sonic.collide(invisiblebackground);
      spawnClouds();
      spawnObstacles();

      if(obstaclesGroup.isTouching(sonic)){
          gameState = END;
      }
    }
    else if (gameState === END) {
      gameOver.visible = true;
      restart.visible = true;
      
      //set velcity of each game object to 0
      background.velocityX = 0;
      sonic.velocityY = 0;
      obstaclesGroup.setVelocityXEach(0);
      cloudsGroup.setVelocityXEach(0);
      
      //change the sonic animation
      sonic.changeAnimation("collided",sonic_collided);
      
      //set lifetime of the game objects so that they are never destroyed
      obstaclesGroup.setLifetimeEach(-1);
      cloudsGroup.setLifetimeEach(-1);
      
      if(keyDown("space")) {
        reset();
      }
    }
    
    
    drawSprites();
  }
  
  function spawnClouds() {
    //write code here to spawn the clouds
    if (frameCount % 60 === 0) {
      var cloud = createSprite(600,120,40,10);
      cloud.y = Math.round(random(80,120));
      cloud.addImage(cloudImage);
      cloud.scale = 0.5;
      cloud.velocityX = -3;
      
       //assign lifetime to the variable
      cloud.lifetime = 200;
      
      //adjust the depth
      cloud.depth = sonic.depth;
      sonic.depth = sonic.depth + 1;
      
      //add each cloud to the group
      cloudsGroup.add(cloud);
    }
    
  }
  
  function spawnObstacles() {
    if(frameCount % 60 === 0) {
      var obstacle = createSprite(600,217,10,40);
      //obstacle.debug = true;
      obstacle.velocityX = -(6 + 3*score/100);
      

      //generate random obstacles
      var rand = Math.round(random(1,6));
      switch(rand) {
        case 1: obstacle.addImage(obstacle1);
                break;
        case 2: obstacle.addImage(obstacle2);
                break;
        case 3: obstacle.addImage(obstacle3);
                break;
        case 4: obstacle.addImage(obstacle4);
                break;
        case 5: obstacle.addImage(obstacle5);
                break;
        case 6: obstacle.addImage(obstacle6);
                break;
        default: break;
      }
      
      //assign scale and lifetime to the obstacle           
      obstacle.scale = 0.5;
      obstacle.lifetime = 300;
      //add each obstacle to the group
      obstaclesGroup.add(obstacle);
    }
  }
  
  function reset(){
    gameState = PLAY;
    gameOver.visible = false;
    restart.visible = false;
    
    obstaclesGroup.destroyEach();
    cloudsGroup.destroyEach();
    
    sonic.changeAnimation("running",sonic_running);
    
   
    
    score = 0;
    
  }
