var direction = "r";
var speed =10;
var gridRes = 40;
var gameOver = true;
var snakeSize = 1;
var snakeTail = 1;
var snakeHead = {
  posX: gridRes / 2,
  posY: gridRes / 2
};

$(document).ready(function() {
  $(".container").on("click", ".play", function() {
  	$(".container").html("");
    startSetup();
    run();
  }).on("click", ".restart", function() {
  	location.reload();
  });
});

function startSetup() {
  direction = "r";
  speed = 10;
  gridRes = 40;
  gameOver = false;
  snakeSize = 1;
  snakeTail = 1;
  drawGrid();
}


function run(){
	if (!gameOver) {
    input();
    setInterval(function() {
      moveSnake(direction);
    }, 1000 / speed);
    setInterval(function() {
      addPickup();
    }, 1000);
	}
}

function drawGrid() {
  var container = $(".container");
  for (var i = 1; i < gridRes + 1; i++) {
    for (var j = 1; j < gridRes + 1; j++) {
      container.append(`<div class='block' data-coordinates-y="${i}" data-coordinates-x="${j}"> </div>`);
    }
  }
  var block = $(".block").width(container.width() / gridRes);
  $(".block").height(container.height() / gridRes);
  $(`[data-coordinates-x="${snakeHead.posX}"][data-coordinates-y="${snakeHead.posY}"]`).addClass("snake");
}

function moveSnake(direction) {
  if (snakeSize > 1) {
    if (snakeTail < snakeSize) {
      snakeTail += 1;
    } else {
      snakeTail = 1;
    }
    $(".snake-" + snakeTail).removeClass("snake");
    $(".snake-" + snakeTail).removeClass("snake-" + snakeTail);
  } else {
    $(".snake").removeClass("snake");
  }
  switch (direction) {
    case "l":
      snakeHead.posX -= 1;
      move(snakeHead.posX, snakeHead.posY);
      break;
    case "u":
      snakeHead.posY -= 1;
      move(snakeHead.posX, snakeHead.posY);
      break;
    case "r":
      snakeHead.posX += 1;
      move(snakeHead.posX, snakeHead.posY);
      break;
    case "d":
      snakeHead.posY += 1;
      move(snakeHead.posX, snakeHead.posY);
      break;
  }
}

function input() {
  $(document).keydown(function(e) {
    e.preventDefault();
    switch (e.keyCode) {
      case 37:
        if (snakeSize > 1 && direction === "r") {
          return;
        } else {
          direction = "l";
        }
        break;
      case 38:
        if (snakeSize > 1 && direction === "d") {
          return;
        } else {
          direction = "u";
        }
        break;
      case 39:
        if (snakeSize > 1 && direction === "l") {
          return;
        } else {
          direction = "r";
        }
        break;
      case 40:
        if (snakeSize > 1 && direction === "u") {
          return;
        } else {
          direction = "d";
        }
        break;
    }
  });

}

function move(x, y) {
	if(!gameOver){
    var hasSnake = $(`[data-coordinates-x="${x}"][data-coordinates-y="${y}"]`).hasClass("snake");
    checkForPickup(x, y);
    if ((x > gridRes || x === 0) ||
      (y > gridRes || y === 0) ||
      hasSnake) {
      gameOver = true;
      $(".container").html("<h1 class='gameover'>Game Over</h1><h2 class='play restart'>Restart </h2>");
    } else {
      $(`[data-coordinates-x="${x}"][data-coordinates-y="${y}"]`).addClass("snake");
      $(`[data-coordinates-x="${x}"][data-coordinates-y="${y}"]`).addClass("snake-" + snakeTail);
    }
  }
}

function addPickup() {
  var hasPickup = $("div").hasClass("pickup");
  var posX = Math.floor((Math.random() * gridRes) + 1);
  var posY = Math.floor((Math.random() * gridRes) + 1);
  var hasSnake = $(`[data-coordinates-x="${posX}"][data-coordinates-y="${posY}"]`).hasClass("snake");
  if (!hasPickup && !hasSnake) {
    $(`[data-coordinates-x="${posX}"][data-coordinates-y="${posY}"]`).addClass("pickup");
  }
}

function checkForPickup(x, y) {
  var div = $(`[data-coordinates-x="${x}"][data-coordinates-y="${y}"]`);
  if (div.hasClass("pickup")) {
    div.removeClass("pickup");
    snakeSize += 1;
    speed += 1;
    $("#points").text("Points:" + snakeSize);
  }
}
