/*
last.fm JS to retrieve music data
*/
window.onload = function() {
  var url = "http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=nitanima&api_key=61a791127993f3fa48d04ba07efa9bd0&format=json"
  var request = new XMLHttpRequest();
  request.open("GET", url, false);
  try{
    request.send(null);
  }
  catch(e){
    console.log("Error:", e.name); 
  }
  var response = JSON.parse(request.responseText);
  var html="<b>Listens to: </b>" +
            response.recenttracks.track[0].name + " by " + 
            response.recenttracks.track[0].artist['#text'] + " from " + 
            response.recenttracks.track[0].album['#text'];
  var listen = document.querySelector('.listening');
  listen.insertAdjacentHTML('beforeend', html);
}

