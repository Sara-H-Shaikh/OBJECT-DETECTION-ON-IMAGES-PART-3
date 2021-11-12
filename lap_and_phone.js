img = "";
objects = [];
status = "";

function preload()
{
  img = loadImage('lap_and_phone.jpg');
}


function setup() 
{
  canvas = createCanvas(740, 480);
  canvas.position(310,160);
  objectDetector = ml5.objectDetector('cocossd', modelLoaded);
  document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function modelLoaded() 
{
  console.log("Model Loaded!")
  status = true;
  objectDetector.detect(img, gotResult);
}

function gotResult(error, results) 
{
  if (error) 
  {
    console.log(error);
  }
  console.log(results);
  objects = results;
}


function draw() 
{
  image(img, 0, 0, 740, 480);

      if(status != "")
      {
        for (i = 0; i < objects.length; i++) 
        {
          document.getElementById("status").innerHTML = "Status : Object Detected";
          document.getElementById("inform").innerHTML = "There are 7 big objects in the image from which the cocossd model has detected 4 objects";
          fill("#FF0000");
          percent = floor(objects[i].confidence * 100);
          text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
          noFill();
          stroke("#FF0000");
          rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
      }
}
