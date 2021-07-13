var trex_walking , trex_sprite , groundimage , ground_sprite , gamestate="play" , obstacle_group , cloud_group, trexdied, score=0, checkPoint_sound, die_sound, jump_sound
var invisible_ground , cloudimage , cloud_sprite , obstacle1 , obstacle2, obstacle3, obstacle4, obstacle5, obstacle6,obstacle,A, gameover, restart
function preload(){
  trex_walking=loadAnimation("trex1.png","trex3.png","trex4.png")
  groundimage=loadImage("ground2.png")
  cloudimage=loadImage("cloud.png")
  obstacle1=loadImage("obstacle1.png")
  obstacle2=loadImage("obstacle2.png")
  obstacle3=loadImage("obstacle3.png")
  obstacle4=loadImage("obstacle4.png")
  obstacle5=loadImage("obstacle5.png")
  obstacle6=loadImage("obstacle6.png")
  gameover= loadImage("gameOver.png")
  restart= loadImage("restart.png")
  trexdied= loadAnimation("trex_collided.png")
  checkPoint_sound= loadSound("checkPoint.mp3")
  die_sound= loadSound("die.mp3")
  jump_sound= loadSound("jump.mp3")
 
  
}

function setup() {
  createCanvas(600,200)
  gameover_sprite = createSprite(300,50)
  gameover_sprite.addImage("End", gameover)
  restart_sprite = createSprite(300,125)
  restart_sprite.addImage("Start", restart)
  trex_sprite = createSprite(40,150,1,1)
  trex_sprite.addAnimation("moving",trex_walking)
  trex_sprite.addAnimation("died",trexdied)
  trex_sprite.scale=0.5
  ground_sprite = createSprite(300,174,600,5)
  ground_sprite.addImage("ground",groundimage)
  invisible_ground = createSprite(300,180,600,5)
  invisible_ground.visible=false
  obstacle_group=createGroup()
  cloud_group=createGroup()
 
}

function draw() {
  background("white")
  if(gamestate=="play") {
  trex_sprite.changeAnimation("moving",trex_walking)
  if (keyDown("space")&&trex_sprite.y>139) {
    trex_sprite.velocityY = -12
    jump_sound.play()
  } 
   trex_sprite.velocityY = trex_sprite.velocityY +1
   score+=1
    
    ground_sprite.velocityX = -10
    gameover_sprite.visible=false;
    restart_sprite.visible=false;
     
    if (ground_sprite.x<0){
    ground_sprite.x=300
  }
     makingclouds()
  makingobstacles()
  if(trex_sprite.isTouching(obstacle_group)) {
  gamestate="end"
  die_sound.play()
}
    if(score%200==0){
      checkPoint_sound.play()
    }
     }
  
text("score="+score,470, 10 )  
  if(gamestate=="end")  {
    ground_sprite.velocityX = 0
    obstacle_group.setVelocityXEach(0); 
    cloud_group.setVelocityXEach(0);
    gameover_sprite.visible=true;
    restart_sprite.visible=true;
    if(mousePressedOver(restart_sprite)){
      gamestate="play"
      cloud_group.destroyEach();
      obstacle_group.destroyEach();
    }
    trex_sprite.velocityY = trex_sprite.velocityY +1
    trex_sprite.changeAnimation("died",trexdied)
     }
  
  
  
  
  trex_sprite.collide(invisible_ground)
 
  
  drawSprites()
  
  
}
function makingclouds() {
  if (frameCount%60==0){
  cloud_sprite=createSprite(600,20,15,15)
  cloud_sprite.addImage("cloud" , cloudimage)
  cloud_sprite.velocityX=-10
  cloud_sprite.y=Math.round(random(10,45))
  cloud_group.add(cloud_sprite) 
  }

}

function makingobstacles() {
  if (frameCount%65==0){
   obstacle=createSprite(600,156,10,10)
    obstacle.velocityX=-10
  A=Math.round(random(1,6))
switch(A){
case 1:
  obstacle.addImage("cactus" , obstacle1)
break
case 2:
  obstacle.addImage("cactus" , obstacle2)
break
case 3:
  obstacle.addImage("cactus" , obstacle3)
break
case 4:
  obstacle.addImage("cactus" , obstacle4)
break
case 5:
  obstacle.addImage("cactus" , obstacle5)
break
case 6:
  obstacle.addImage("cactus" , obstacle6)
break

}
obstacle.scale=0.5
    
    
obstacle_group.add(obstacle)
  }
  
  
}


