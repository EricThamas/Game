var backgroundimage,background1;
var Goldcoin,GoldcoinsImage;
var Bill,BillImage;
var invisibleGround;
var spike,spikesimage;
var GoldcoinsGroup;
var spikesGroup;
var gameState = "play";
var life = 3;
var GameOver;
var restart,restartImage;

function preload(){
  backgroundimage = loadImage("Images/Background1.png");
  Billimage = loadImage("Images/C1.png");
  GoldcoinImage = loadImage("Images/Coin.png");
  SpikeImage = loadImage("Images/Spikes.png");
  gameover = loadImage("Images/Game over.png");
  restartImage = loadImage("Images/Restart.png");

}

function setup() {
  createCanvas(800,800);
  background1 = createSprite(500,250);
  background1.addImage("bg",backgroundimage);
  background1.scale = 3;
  background1.velocityX = -3.3;

  Bill = createSprite(90,480,50,50);
  Bill.addImage("Bill",Billimage);
  Bill.scale = 0.8;

  invisibleGround = createSprite(400,500,width,25);
  invisibleGround.visible = false;
  GoldcoinsGroup = new Group();
  spikesGroup = new Group();

  GameOver = createSprite(400,400);
  GameOver.addImage("Over",gameover);
  GameOver.scale = 0.6

  restart = createSprite(400,200);
  restart.addImage("Restart",restartImage);
  restart.scale = 0.4
 
  Bill.debug = true;
  Bill.setCollider("circle",0,0,90);

  spikesGroup.setColliderEach("rectangle",0,0,100,20);
  spikesGroup.debug = true;

}

function draw() {
  background(255);
  

  if(gameState==="play"){
   
    if(background1.x<0){
      background1.x = 800;
    }
    if(keyDown("space")&&Bill.y>=420){
      Bill.velocityY = -10
    }
    Bill.velocityY = Bill.velocityY+0.2;

    if(Bill.isTouching(GoldcoinsGroup)){
      GoldcoinsGroup.destroyEach();
      
    }
    GameOver.visible = false;
    restart.visible = false;
    Goldcoins();
    spikes();
    if(Bill.isTouching(spikesGroup)){
      spikesGroup.setVelocityEach(0);
      life = life-1;   
  }
  if(life===0){
    gameState = "end"
  }

  }

  else
    if(gameState==="end"){

      Bill.velocityY = 0;
      background1.velocityX = 0;
      spikesGroup.setVelocityXEach(0);
      GoldcoinsGroup.setVelocityXEach(0);
      background1.visible = false;
      Bill.visible = false;
      GoldcoinsGroup.setVisibleEach(false)
      spikesGroup.setVisibleEach(false)
      GameOver.visible = true;
      restart.visible = true;
      if(mousePressedOver(restart)){
        reset();
      }

    }
    
  //console.log(Bill.y);
  Bill.collide(invisibleGround);
 
  drawSprites();
  fill("white");
  textSize(30);
  text("Lives "+life,700,50);
  
  
 
}  

function Goldcoins(){

  if(frameCount%100===0){
    Goldcoin = createSprite(780,20);
    Goldcoin.addImage("GoldCoin",GoldcoinImage);
    Goldcoin.scale = 0.2;
    Goldcoin.velocityX = -7;
    Goldcoin.y = Math.round(random(80,300));
    GoldcoinsGroup.add(Goldcoin);
  }
  
} 
function spikes(){
  
  if(frameCount%120===0){
    spike = createSprite(400,495);
  spike.addImage("spikes",SpikeImage);
  spike.velocityX = -5;
  spike.scale = 0.2;
  spikesGroup.add(spike);

  }


} 
function reset(){
  
  gameState = "play"
  gameover.visible = false;
  restart.visible = false;


  
}                                                                                                                                                                                               