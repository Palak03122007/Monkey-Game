//assigning the variables
var monkey_running;
var banana, bananaGroup;
var obstacle, obstaclesGroup;
var score;

function preload(){
  
//loading the images
  monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  banana = loadImage("banana.png");
  
  obstacle = loadImage("obstacle.png");
  
}

function setup(){
  
  createCanvas(600,600);
  
  //creating sprite for monkey
  monkey = createSprite(100,465,10,10);
  monkey.addAnimation("monkey_is_running",monkey_running);
  monkey.scale = 0.1;
  
  //creating sprite for ground
  ground = createSprite(400,500,1250,10);
  ground.velocityX = -5;
  
  //creating sprite for imvisible ground
  invisibleGround = createSprite(400,502,800,10);
  invisibleGround.visible = false;
  
  obstaclesGroup = new Group();
  bananaGroup = new Group();
  
  //assigning the initial value of score 0
  score=0
}

function draw(){
  background(0,300,400);
  
  //displaying score
  fill("black")
  textSize(20);
  text("Survival Time: "+ score, 420,50);
  
  
  
    //resetting the ground when it crosses half its width
  if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
  //if space is pressed, the monkey should jump
  if(keyDown("space")&& monkey.y >= 120){
    monkey.velocityY = -12;
  }
  
  //asigning gravity to the monkey
  monkey.velocityY = monkey.velocityY + 0.8
    
  //defining the functions for spawing obstacles and bananas
  spawnObstacles();
  spawnBananas();
  
  if(obstaclesGroup.isTouching(monkey)){
    ground.velocityX = 0;
    monkey.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    obstaclesGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
  }
    
  //increasing the score using FRAMERATE
  score = score + Math.round(getFrameRate()/60);
  
  //colliding the monkey with the invisible ground ao that it doesn't fall down
  monkey.collide(invisibleGround);
  
  drawSprites();
}

//function for spawning bananas
function spawnBananas(){
  if (frameCount % 80 === 0){
    
    banana_img = createSprite(660,300,10,40);
    banana_img.velocityX = -7;
    
    banana_img.addImage(banana);
    
    banana_img.scale = 0.2;
    
    banana_img.lifetime = 140;
    banana_img.y = Math.round(random(120,200));
    
    bananaGroup.add(banana_img);
  }
}

//function for spawning obstacles
function spawnObstacles(){
 if (frameCount % 300 === 0){
   obstacle_img = createSprite(680,440,10,40);
   obstacle_img.velocityX = -7;
   
   obstacle_img.addImage(obstacle);
   
    //assign scale and lifetime to the obstacle           
    obstacle_img.scale = 0.3;
    obstacle_img.lifetime = 140;
    
   obstaclesGroup.add(obstacle_img);
 }
}