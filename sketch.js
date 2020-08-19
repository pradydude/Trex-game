var trex,trexsupport,ground,game_over, restartimage,gamestate,cloudgroup,obstaclegroup, score ,quo,treximage,gameoverimage,cloud,groundimage,obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6,restart2,trexcollide,cloudImage;

function preload(){
treximage=loadAnimation('trex1.png','trex3.png','trex4.png');
  groundimage=loadImage('ground2.png')
  gameoverimage=loadImage('gameOver.png')
  restartimage=loadImage('restart.png')
  trexcollide=loadImage('trex_collided.png')
  obstacle1=loadImage('obstacle1.png')
  obstacle2=loadImage('obstacle2.png')
  obstacle3=loadImage('obstacle3.png')
  obstacle4=loadImage('obstacle4.png')
  obstacle5=loadImage('obstacle5.png')
  obstacle6=loadImage('obstacle6.png')
   cloudImage=loadImage('cloud.png')
}

function setup() {
  createCanvas(600, 400);
   trex = createSprite(50,180,20,50);
trex.addAnimation('running',treximage);
trex.scale=0.6;
trex.setCollider("circle",0,0,40);


//to give trex invisible support below ground;
 trexsupport = createSprite(200, 190,400,10);
trexsupport.visible=false;



//to create path and its animation;
 ground= createSprite(200,180,400,20);
ground.addImage(groundimage);

trex.depth=2;

 game_over = createSprite(300,100);
game_over.addImage(gameoverimage);
game_over.scale=0.5;
 restart = createSprite(300,150);
restart.addImage(restartimage);
restart.scale=0.5;
game_over.visible=false;
restart.visible=false;
 gamestate='play';

  cloudgroup = new Group();
 obstaclegroup = new Group();

 score = 0;

}

function draw() {
  background('white');
                                                        
    textSize(20);
 text('SCORE:'+score,450,50); 
  
  if (gamestate==='play') {
    ground.velocityX=-10;
ground.velocityY=0;
     score= score+Math.round(getFrameRate()/60)
  quo = Math.round(score/1000);
  if (quo%2===0) {
    background("white");
    fill("black");
     text('SCORE:'+score,450,50);                     
  
  }
  if (quo%2!=0) {
   background('black');
    fill("white");
     text('SCORE:'+score,450,50);   
  }
  
   if (keyDown("space")&&(trex.y>=159)){                                     
   trex.velocityY=-20;
   trex.velocityX=0;
  // playSound("", false);//
   }
   
  
 
  
  
   if (ground.x<0) {
    ground.x=ground.width/2;
   }
   
   trex.velocityY=trex.velocityY+1.5;
                                                         
  trex.collide(trexsupport);
  
  spawnclouds();
spawnobstacles();


if (obstaclegroup.isTouching(trex)) {
  gamestate='end';
  //trex.changeAnimation('collided');
  trex.pause()
  //playSound("sound://category_explosion/melodic_loss_1.mp3");//
  trex.velocityY=-15;
  
  
}


  }
  
  if (gamestate==="end") {
    ground.velocityX=0;
    cloudgroup.setVelocityXEach(0);
     obstaclegroup.setVelocityXEach(0);
           trex.velocityX=0;
           trex.velocityY=0;
           restart.visible=true;
           game_over.visible=true;
           }
           
          if (mousePressedOver(restart)) {
            gamestate='play';
            game_over.visible=false;
            restart.visible=false;
            obstaclegroup.destroyEach()
             cloudgroup.destroyEach()
            ground.velocityX=-10,
              ground.velocityY=0,
             //trex.changeAnimation('running')
            trex.play()
             score=0
          }
          
          
  

  
  
  
 // console.log(ground.x);
  
  

  //to draw the sprites on the canvas
  drawSprites();
  
}

function spawnclouds() {
  
 if (frameCount%40===0) {
    var cloud = createSprite(600,120,40,10) 
     cloud.Y=Math.round(random(80,120))                        
   cloud.addImage(cloudImage);
   cloud.velocityX=-5;
   cloud.velocityY=0;
   cloud.depth=trex.depth;
   trex.depth=trex.depth+1;
   cloud.scale=0.8;
       cloud.lifetime=200;
       cloudgroup.add(cloud);
  }

    }
function spawnobstacles() {
   if (frameCount%60===0) {
      var obstacle = createSprite(600,165);
      var rand = Math.round(random(1,6))  
      switch(rand)
      {
        case 1:obstacle.addImage(obstacle1)
          break
          case 2:obstacle.addImage(obstacle2)
          break
          case 3:obstacle.addImage(obstacle3)
          break
          case 4:obstacle.addImage(obstacle4)
          break
          case 5:obstacle.addImage(obstacle5)
          break
          case 6:obstacle.addImage(obstacle6)
          break
          default:break
      }
  obstacle.scale=0.6;
  obstacle.velocityX=-10;
  obstacle.velocityY=0;
  obstacle.lifetime=300;
  obstaclegroup.add(obstacle);
        
   }
   
}
  
