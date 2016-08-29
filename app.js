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

var labyrinth = {
  map: testMap,
  grabbedTreasure: false,
  actors:[],

  initialize: function(){
    var location = [];
    location.push(Math.floor(Math.random(1, this.map.length)));
    location.push(Math.floor(Math.random(1, this.map.length)));
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
    minotaur.minoMove = function(){
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
      console.log(moves);
      console.log(this.location);
      var randomizer = moves[Math.floor(Math.random(0,moves.length))];
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
  $(document).on('keydown', function(event){
    var key = event.keyCode;
    console.log(key);
    if(key === 65 || key===37){
      if(isLegal([(labyrinth.player.location[0] - 1), labyrinth.player.location[1]])){
        labyrinth.player.moveLeft();
        labyrinth.minotaur.minoMove();
      }
    }//left
    else if(key === 87 || 38){}//up
    else if(key === 68 || 39){}//right
    else if(key === 83 || 40){}//down
  });




});

var isLegal = function(location, map){console.log(location);
  if (labyrinth.map[location[1]][location[0]] === "."){
    return true;
  }
  else if (labyrinth.map[location[1]][location[0]] === "."){
    console.error("Unexpected tile at " + location);
  }
  return false;
}
