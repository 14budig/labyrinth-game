var getLineOfSight = function(start, end, map){
  if(getDistance(start, end) > 8){
    return false;
  }
  else if(start[0] === end[0] && start[1] === end[1]){
    return true;
  }

  var currentPos = [];
  currentPos[0] = start[0];
  currentPos[1] = start[1];


  if(map[currentPos[1]][currentPos[0]] == '#'){
    return false;
  }
  else{
    console.log()
    if(currentPos[0] < end[0]){
      currentPos[0]++;
    }
    else if(currentPos[0] > end[0]){
      currentPos[0]--;
    }
    if(currentPos[1] < end[1]){
      currentPos[1]++;
    }
    else if(currentPos[1] > end[1]){
      currentPos[1]--;
    }
    return getLineOfSight(currentPos, end, map);
  }
}
