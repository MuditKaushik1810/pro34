//Create variables here
var dog,happyDog,database,foodS,foodStock;

function preload()
{
  //load images here
  dog= loadImage("images/dogImg.png")
  happyDog = loadImage("images/dogImg1.png")
}

function setup() {
  database = firebase.database();
  createCanvas(1000, 1000);
  
  dog1 = createSprite(400,400,50,50);
  dog1.addImage(dog);
  
  

  foodStock = database.ref('Food');
  foodStock.on("value",readstock);
  
  
}


function draw() {  
  background(46,139,87)

  if(keyDown(UP_ARROW)){
    writeStock(foodS);
    
    dog1.addImage(happyDog);
    
  }
  drawSprites();
  //add styles here
  textSize(20);
  fill("red")
  stroke(5)
  text("Number of milk bottles left :    " + foodS,100,100);
  text("note:press UP_ARROW key to feed milk to the dog",0,700);

}
//function to read values from DB
function readstock (data){
    foodS = data.val();
}

//function to write values in DB
function writeStock(x){
 
  if(x<=0){
    x = 0;
  }
    else {
      x = x-1 ;
    }
    database.ref("/").update({
     Food :x 
    })
}