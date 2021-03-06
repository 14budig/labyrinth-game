function Actor(tile, location){
  this.tile = tile;
  this.location = location;
}
  Actor.prototype.moveUp = function(){
    this.location[1]--;
  }
  Actor.prototype.moveLeft = function(){
    this.location[0]--;
  }
  Actor.prototype.moveRight = function(){
    this.location[0]++;
  }
  Actor.prototype.moveDown = function(){
      this.location[1]++;
  }
  Actor.prototype.getMoves = function(){
    var moves = [];
    var location = this.location;
    if(isLegal([location[0]-1, location[1]])){
        moves.push("left");
    }
    if(isLegal([location[0]+1, location[1]])){
      moves.push("right");
    }
    if(isLegal([location[0], location[1]-1])){
      moves.push("up");
    }
    if(isLegal([location[0], location[1]+1])){
      moves.push("down");
    }
    return moves;
  }

var labyrinth = {
  map: testMap,
  grabbedTreasure: false,
  actors:[],

  initialize: function(){
    var location = [];
    location.push(Math.floor(Math.random(1, this.map.length)));
    location.push(Math.floor(Math.random(1, this.map.length)));
    this.gameOver = false;

    /*if(isLegal(location)){
      player = new Actor('@', location);
    }
    else{

    }
    newLocation = [this.map.length-1-location[0], this.map.length-1-location[1]];
    if(isLegal(location)){
      this.treasure = newLocation;
    }
    else{

    }*/
    player = new Actor('@', [1,1]);
    this.treasure = [9,9];
    minotaur = new Actor('M', [5,5]);
    this.player = player;
    this.minotaur = minotaur;
    this.minotaur.seenPlayer = [];
    minotaur.minoMove = function(){
      var moves = [];
      var location = this.location;
      if(this.seenPlayer.length > 0){
        if((location[0] === this.seenPlayer[0]) && (location[1] === this.seenPlayer[1]) && !labyrinth.gameOver){
          this.seenPlayer = [];
        }
        else{
          if(this.seenPlayer[0] > location[0]){
            if(getLineOfSight([location[1],(location[0] + 1)], [this.seenPlayer[1], this.seenPlayer[0]], labyrinth.map) && isLegal([location[1],(location[0] + 1)])){
              moves.push("right");
            }
          }
          if(this.seenPlayer[0] < location[0]){
            if(getLineOfSight([location[1],(location[0] - 1)], [this.seenPlayer[1], this.seenPlayer[0]], labyrinth.map) && isLegal([location[1],(location[0] - 1)])){
              moves.push("left");
            }
          }
          if(this.seenPlayer[1] > location[1]){
            if(getLineOfSight([location[1] + 1,location[0]], [this.seenPlayer[1], this.seenPlayer[0]], labyrinth.map) && isLegal([location[1] + 1,location[0]])){
              moves.push("down");
            }
          }
          if(this.seenPlayer[1] < location[1]){
            if(getLineOfSight([location[1] - 1,location[0]], [this.seenPlayer[1], this.seenPlayer[0]], labyrinth.map) && isLegal([location[1] - 1,location[0]])){
              moves.push("up");
            }
          }
        }
      }
      console.log("moves: " + moves);
      if(moves.length === 0){
        moves = this.getMoves();
      }
        var randomizer = moves[Math.floor(Math.random() * moves.length)];
        console.log(randomizer);
        switch (randomizer) {
          case "left":
            minotaur.moveLeft();
            break;
          case "right":
            minotaur.moveRight();
            break;
          case "up":
            minotaur.moveUp();
            break;
          case "down":
            minotaur.moveDown();
            break;
          default:
            console.error("Something went wrong in the Minotaur pathing");
            break;
        }
    }
    this.grabbedTreasure = false;
    draw(labyrinth.map)
  }


};

$(document).ready(function(){
  labyrinth.initialize();
  for(var x = 0; x < labyrinth.map.length; x++){
    for(var y = 0; y < labyrinth.map[x].length; y++){
      var locString = '#' + x.toString() + "-" + y.toString();
      if(labyrinth.map[x][y] === "#"){
        $(locString).addClass('wall');
      }
    }
  }
  placeActors(labyrinth);
  $(document).on('keydown', function(event){
    event.preventDefault();
    var key = event.keyCode;
    console.log(key);
    if(getLineOfSight(labyrinth.minotaur.location, labyrinth.player.location, labyrinth.map)){
      labyrinth.minotaur.seenPlayer[0] = labyrinth.player.location[0];
      labyrinth.minotaur.seenPlayer[1] = labyrinth.player.location[1];
      console.log("Spotted at " + labyrinth.minotaur.seenPlayer + "!");
    }
    if(key === 65 || key===37){
      if(!labyrinth.gameOver && isLegal([(labyrinth.player.location[0] - 1), labyrinth.player.location[1]], labyrinth.map)){
        labyrinth.player.moveLeft();
        labyrinth.minotaur.minoMove();
        placeActors(labyrinth);
        draw(labyrinth.map)
      }
    }//left
    else if(key === 87 || key===38){
      event.preventDefault();
      console.log("up");
      if(!labyrinth.gameOver && isLegal([(labyrinth.player.location[0]), labyrinth.player.location[1] - 1], labyrinth.map)){
        labyrinth.player.moveUp();
        labyrinth.minotaur.minoMove();
        placeActors(labyrinth);
        draw(labyrinth.map)
      }
    }//up
    else if(key === 68 || key===39){
      event.preventDefault();
      console.log("right");
      if(!labyrinth.gameOver && isLegal([(labyrinth.player.location[0] + 1), labyrinth.player.location[1]],labyrinth.map)){
        labyrinth.player.moveRight();
        labyrinth.minotaur.minoMove();
        placeActors(labyrinth);
        draw(labyrinth.map)
      }
    }//right
    else if(!labyrinth.gameOver && (key === 83 || key===40)){
      event.preventDefault();
      if(isLegal([(labyrinth.player.location[0]), (labyrinth.player.location[1] + 1)],labyrinth.map)){
        labyrinth.player.moveDown();
        labyrinth.minotaur.minoMove();
        placeActors(labyrinth);
        draw(labyrinth.map)
      }
    }//down
    else if (key === 82){
      event.preventDefault();
      window.location.reload()
    }
  });




});

var isLegal = function(location, map){
  if(location[0] < 0 || location[1] < 0){
    return false;
  }
  if (labyrinth.map[location[1]][location[0]] === "."){
    return true;
  }
  else if (labyrinth.map[location[1]][location[0]] === "."){
    console.error("Unexpected tile at " + location);
  }
  return false;
}

var placeActors = function(labyrinth){
  //$('.player').html("");
  $('.player').removeClass("player");
  var position = labyrinth.player.location;
  var positionStr = "#" + position[1].toString() + "-" + position[0].toString();
  $(positionStr).addClass("player");

  if(labyrinth.player.location[0]== labyrinth.treasure[0] && labyrinth.player.location[1]== labyrinth.treasure[1]){
    labyrinth.treasure = false;
    $(".treasure").removeClass("treasure");
  }

  $('.minotaur').removeClass("minotaur");
  position = labyrinth.minotaur.location;
  positionStr = "#" + position[1].toString() + "-" + position[0].toString();
  $(positionStr).addClass("minotaur");


  if(getDistance(labyrinth.player.location, labyrinth.minotaur.location)<=1){
    //alert("Argh!");
    labyrinth.gameOver = true;
    $('p').html('Oh no! You\'ve been caught! Try Again by pressing "R"!');
  }

  if(labyrinth.treasure){
    positionStr = "#" + labyrinth.treasure[1].toString() + "-" + labyrinth.treasure[0].toString();
    $(positionStr).removeClass("treasure").addClass("treasure");
  }

  if(!labyrinth.treasure && labyrinth.player.location[0] == 5 && labyrinth.player.location[1] == 0){
    //alert("win");
    $('p').html('You win! Press "R" to play again');
    labyrinth.gameOver = true;
  }

}

function getDistance(start, end){
  return Math.abs(start[0] - end[0])+Math.abs(start[1] - end[1]);
}

function draw(map){
  map.forEach(function(is, i, map){
    is.forEach(function(js, j, is){
        var id = '#' + j.toString() + '-' + i.toString();
      if(!getLineOfSight(labyrinth.player.location, [i,j], labyrinth.map)){
        $(id).addClass('blocked');
      }
      else{
        $(id).removeClass('blocked');
      }
    });
  });
}
