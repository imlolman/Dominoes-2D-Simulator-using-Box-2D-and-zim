mode = "NoFriction" // Possible Values: Custom, NoFriction, Bulky, Auto

switch(mode){
  case "NoFriction": {
    blocksCount = 18
    gravity = 10

    var baseProperties = {
    height: 200,
    }

    var ballProperties = {
      radius: 30,
      friction: 0,
      restitution: 1,
      angular: 0,
      density: 10
    }

    var blockProperties = {
      width: 10,
      height: 100,
      gap: 50,
      restitution: 0,
      density: 100,
      friction: 0,
      angular: 0
    }

    ballbottomWidth = 200
    ballbottomHeight = 200
    ballslopeWidth = 200

    break;
  }
  case "Bulky": {
    blocksCount = 7
    gravity = 20

    var baseProperties = {
      height: 200,
    }

    var ballProperties = {
      radius: 60,
      friction: 1,
      restitution: 0.5,
      angular: 1,
      density: 10
    }

    var blockProperties = {
      width: 40,
      height: 200,
      gap: 100,
      restitution: 0,
      density: 100,
      friction: 1,
      angular: 1
    }

    ballbottomWidth = 200
    ballbottomHeight = 200
    ballslopeWidth = 200

    break;
  }
  case "Auto":{
    blocksCount = 12
    gravity = 20

    var baseProperties = {
      height: 300
    }

    var ballProperties = {
      radius: 30,
      friction: 0.5,
      restitution: 1,
      angular: 0.5,
      density: 1
    }

    var blockProperties = {
      width: 20,
      height: 160,
      gap: 80,
      restitution: 0,
      density: 1,
      friction: 0.5,
      angular: 0.5
    }

    ballbottomWidth = 99
    ballbottomHeight = 200
    ballslopeWidth = 300

    break;
  }
  default: {
    blocksCount = 12
    gravity = 20

    var baseProperties = {
      height: 300
    }

    var ballProperties = {
      radius: 30,
      friction: 0.5,
      restitution: 1,
      angular: 0.5,
      density: 1
    }

    var blockProperties = {
      width: 20,
      height: 160,
      gap: 80,
      restitution: 0,
      density: 1,
      friction: 0.5,
      angular: 0.5
    }

    ballbottomWidth = 99
    ballbottomHeight = 200
    ballslopeWidth = 300

    break;
  }
}


/* End of Properties */

colorArray = ['#FF1493','#9400D3','#DC143C','#FF4500', '#98FB98','#4169E1'];
const frame = new Frame("full");
frame.on("ready", ()=>{ 
    zog("ready from ZIM Frame"); 

    // often need below - so consider it part of the template
    let stage = frame.stage;
    let stageW = frame.width;
    let stageH = frame.height;
    frame.outerColor = "#555";
    frame.color = "#EEE";

    var load = frame.loadAssets(["images/ball.png"]);
		load.on("complete", ()=>{
			
      window.physics = new Physics(frame,undefined,gravity);
      
      // physics ball (we add the Body suffix by convention)
      
      const baseBody = physics.makeRectangle(stageW,baseProperties.height,false); // a static body
      baseBody.y = stageH-baseProperties.height/2;
      baseBody.x = stageW/2
			const base = new Rectangle(stageW,baseProperties.height,frame.dark).centerReg(); 
      physics.addMap(baseBody, base);

      const ballbottomBody = physics.makeRectangle(ballbottomWidth,ballbottomHeight,false); // a static body
      ballbottomBody.y = stageH-baseProperties.height-ballbottomHeight/2;
      ballbottomBody.x = ballbottomWidth/2
			const ballbottom = new Rectangle(ballbottomWidth,ballbottomHeight,frame.dark).centerReg(); 
      physics.addMap(ballbottomBody, ballbottom);

      const ballslopeBody = physics.makeTriangle(ballslopeWidth,Math.sqrt((ballslopeWidth**2)+(ballbottomHeight**2)),ballbottomHeight,false); // a static body
      ballslopeBody.y = stageH-baseProperties.height-ballbottomHeight/2;
      ballslopeBody.x = ballbottomWidth+ballslopeWidth/2;
			const ballslope = new Triangle(ballslopeWidth,Math.sqrt((ballslopeWidth**2)+(ballbottomHeight**2)),ballbottomHeight,frame.dark).centerReg(); 
      physics.addMap(ballslopeBody, ballslope);
      

      ballBody = physics.makeCircle(ballProperties); // restitution is how bouncy
      ballBody.x = 100
      ballBody.y = ballProperties.radius*2
      name = "images/ball.png";
      ball = frame.asset(name).siz(ballProperties.radius*2).centerReg().cur(); // Box2D objects are all center registration			
      physics.addMap(ballBody, ball);

      blockBodies = []
      blocks = []

      for(i=0;i<blocksCount;i++){
        blockBodies[i] = physics.makeRectangle(blockProperties);
        blockBodies[i].x = ballbottomWidth + ballslopeWidth + blockProperties.width/2 + i*(blockProperties.width+blockProperties.gap)
        blockBodies[i].y = stageH - baseProperties.height - blockProperties.height/2;
        blocks[i] = new Rectangle(blockProperties.width,blockProperties.height,colorArray[Math.floor(Math.random() * colorArray.length)]).centerReg();
        physics.addMap(blockBodies[i], blocks[i]);
      }
			
			physics.drag(); // drags all dynamic bodies or pass in an array of bodies to drag
			
		});	// end asset load
	
    new Label("Domino 2D Simulator By Lolman").alp(.5).pos(150, 50, stage)
    new Label("Mode: "+mode,undefined,undefined,"red").pos(stageW - 500, 50, stage)

}); // end of ready