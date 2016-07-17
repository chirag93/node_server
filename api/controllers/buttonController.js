var robot = require("robotjs");
var state = "up";

var button1Click = function (req, res) {
  robot.mouseClick(buttonConfig.button1);
  res.send('respond with a resource');
};

var button2Click = function (req, res) {
  robot.mouseClick(buttonConfig.button2);
  res.send('respond with a resource');
};

var button3Click = function (req, res) {
  if (state == "up") {
    state = "down";
  } else {
    state = "up";
  }
  robot.keyToggle(buttonConfig.button3, state);

  console.log(buttonConfig.button3, state);
  res.send('respond with a resource');
};

/*
module.exports = {
  button1Click: button1Click,
  button2Click: button2Click,
  button3Click: button3Click
};
*/
