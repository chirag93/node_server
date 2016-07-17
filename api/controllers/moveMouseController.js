var robot = require("robotjs");

var MouseXMovement = 0;
var MouseYMovement = 0;

function processHackyAccel(x, y, z) {
  var maxy = 1000;
  var mayy = 1000;
  var thresh_x = 150, thresh_y = 200, thresh_z = 50;

  //SOORI's MAAAGICCCC !!!!!!!!!!!!!!!!! BOOOOMMM, IT' MAGIC... IT'S MAGIC

  if (Math.abs(y) > Math.abs(z) && Math.abs(y) > thresh_y && Math.abs(y) > Math.abs(x)) {
    MouseXMovement = 120 * y / maxy;
  } else {
    MouseXMovement = 0;
  }
  if (Math.abs(x) > Math.abs(z) && Math.abs(x) > thresh_x && Math.abs(x) > Math.abs(y)) {
    MouseYMovement = 120 * x / maxy;
  } else {
    MouseYMovement = 0;
  }
}
var button1Click = function () {
  robot.mouseClick(buttonConfig.button1);
  //res.send('respond with a resource');
};

var button2Click = function () {
  robot.mouseClick(buttonConfig.button2);
  res.send('respond with a resource');
};

var button3Click = function () {
  if (state == "up") {
    state = "down";
  } else {
    state = "up";
  }
  robot.keyToggle(buttonConfig.button3, state);

  console.log(buttonConfig.button3, state);
  //res.send('respond with a resource');
};

var moveMouse = function (req, res) {
  robot.setMouseDelay(0);
  var screenSize = robot.getScreenSize();
  var height = screenSize.height;
  var width = screenSize.width;
  if(req.query.key=="up"&& req.query.key!=""){
      button1Click();
  }
  if(req.query.key=="down"&& req.query.key!=""){
    button2Click();
  }

  if(req.query.key=="sel"&& req.query.key!=""){
    button3Click();
  }

  processHackyAccel(req.query.x, req.query.y, req.query.z);
  var pos = robot.getMousePos();
  var mov_x = pos.x + MouseXMovement;
  var mov_y = pos.y - MouseYMovement;
  mov_x = mov_x < 0 ? 0 : (mov_x > width ? width : mov_x);
  mov_y = mov_y < 0 ? 0 : (mov_y > height ? height : mov_y);
  robot.moveMouseSmooth(mov_x, mov_y);
  res.send('respond with a resource');
};


module.exports = {
  moveMouse: moveMouse
};
