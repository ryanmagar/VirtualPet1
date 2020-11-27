//Create variables here
var dog,dogImg,dogImg1,database,FoodS,FoodStock;

function preload()
{
  //load images here
  dogImg = loadImage("image/dogImg.png");
  dogImg1 = loadImage("image/dogImage1.png");
}

function setup() {
	createCanvas(500, 500);
  database = firebase.database();
  FoodStock = database.ref("Food");
 FoodStock.on("value",readStock);
 FoodStock.set(20);

  dog = createSprite(250,350,10,60);
  dog.addImage(dogImg);  
  dog.scale=0.2;

}


function draw() {  
 background("green");
  if(FoodS!==undefined){
 textSize(20);
 fill (255);
 text("Note:Press UP Arrow to feed Drago milk",50,50);
 text("Food Remaning:"+FoodS,150,150);

 if(keyWentDown(UP_ARROW)){
  writeStock(FoodS);
  dog.addImage(dogImg1);
}
 if(keyWentDown(UP_ARROW)){
  dog.addImage(dogImg); 
}
 if(FoodS===0){
   FoodS=20
 }
  }
  drawSprites();
  //add styles here
}
 function writeStock(x){
 if(x<=0){
  x=0
 }
else{
  x=x-1
}



database.ref("/").update({
 food:x
})
 }
 function readStock(data){
   FoodS = data.val();
 }