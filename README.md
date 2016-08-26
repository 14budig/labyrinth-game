# Labyrinth Game



### User Stories and Game Mechanics
1. There is a Labyrinth made up of wall tiles and floor tiles.
2. In the Labyrinth there are four objects: the player, the treasure, the exit, and the Minotaur
3. If the Minotaur catches the player, the player loses.
4. If the player manages to first find the treasure and then reach the exit, then the player wins.

### Data Structures

#### Objects and properties/methods

##### Actors
+ Type: either player or Minotaur
+ Tile: @ for player, M for Minotaur
+ location
+ getLineOfSight() method //optional
+ moveUp(), moveDown(), moveLeft(), and moveRight() methods
+ for the Minotaur: getDirection() method, and canSeePlayer boolean
+ Custom or choosable picture for the player?

##### Labyrinth
+ map array: series of '#' for wall or '.' for floor
+ Initialize() method to randomly place the player, Minotaur, and treasure into the map
+ getTreasure() - removes the treasure from the map, and sets a hasTreasure variable to true, either in Labyrinth or in player
+ Escape() method - wins the game.
+ treasureLocation: the coordinates of the treasure

### Development Stories
1. There is a Labyrinth made up of wall tiles and floor tiles.
  + Labyrinth object has a map key, which uses as it's value a 2-dimensional array of strings
  + each string is either '#' or '.' for walls and floors
2. In the Labyrinth there are four objects: the player, the treasure, the exit, and the Minotaur
  + At game start, use Labyrinth.initialize() to semi-randomly place the player, the Minotaur, and the treasure.  The exit's location is static.
    - place the player first, check if he would be placed into a wall, and move him as much as necessary until legal placement.
    - next is the treasure.  Take the x and y that were used to generate the player location, and subtract them from the map array's lengths.  Reposition the treasure as necessary.
    - Last is Minotaur, who is placed near the middle with a small distribution of legal locations.
    - Check to see if treasure or Minotaur start near to player, re-initialize if so
  + Player and Minotaur locations are tracked by their respective objects, treasure is tracked in Labyrinth object.
3. If the Minotaur catches the player, the player loses.
  + The player moves with either the arrow keys, or w,a,s,d.  
  + Every time the player moves, the Minotaur also moves.
    - The Minotaur will call his own move method to pick a legal direction at random.  He can not move through walls.
    - Have the event listener for player movement also check for, and ignore illegal moves.
    - As a possible bonus/stretch goal: Have the Minotaur chase the player if it can see them.
  + If the player's position is within one tile of the Minotaur's, the game is over, and it displays a lose message.
4. If the player manages to first find the treasure and then reach the exit, then the player wins.
  + Whenever the player moves, check their location against that of the treasure, as well as the exit.
    - The treasure's location will be tracked by the Labyrinth Object
  + If the player occupies the same tile as the treasure, it is removed, and a treasureGrabbed variable is set to true.
  + If treasureGrabbed is true, and the player is adjacent to the exit, the game is over, and displays a victory message.
    - victory and defeat messages should both prompt player if they wish to play again.

### Potential Challenges / Development Questions
1. How to minimize the number of steps for moving the start locations
2. How to program the Minotaur's AI to chase the player
3. How to do the line of sight function properly.
4. What is the best way to display the game, and how will I show motion?  Will I just move the squares around the player, or will I actually animate something?
5. Need to figure out how to display victory/defeat messages, with a prompt to play again, without pop-ups, alert()s, or prompt()s
