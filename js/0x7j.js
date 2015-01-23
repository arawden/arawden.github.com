/*
0x7j.js - Function library file
*/
if(document.querySelector('body.about')){
  document.querySelector('.listening').load = lastfm();
}

if(document.querySelector('html.history')){
  document.querySelector('.history').load = getLinks();
}

/*
getLinks - get the valid links to use with html shenanigans
*/
function getLinks(){
  var links =  document.getElementsByTagName('a');
  for(var i= 0; i <links.length; i++){
    if(links[i].getAttribute('href')){
      if(!links[i].getAttribute('href').match(/http/)){
        links[i].addEventListener("click",historySetup, false);
      }
    }
  }
}

/*
historySetup - handle click events on urls
*/
function historySetup(e){
  e.preventDefault();
  var bClass = document.querySelector('body').getAttribute('class');
  document.querySelector('body').setAttribute('class', bClass + ' load-out'); // Add class for animations
  setTimeout(function(){
    switcherino(e.target.getAttribute('href'));
  }, 1500); // Wait a bit to switch content
  history.pushState(null, e.target.getAttribute('title'), e.target.getAttribute('href')); // update history
  window.addEventListener("popstate", function(e) {
        switcherino(location.pathname);
  });
}



/*
switcherino - pull content in from the new page on history shit using url
*/
function switcherino(u){
  var request = new XMLHttpRequest();
  var html;
  request.open("GET",u,true);
  try{
    request.send(null);
  } catch(e){
    console.log("Error:", e.name);
  }
  request.onreadystatechange = function(){ // Once the request has been created and sent
    if(request.readyState == 4){ // If the request succeeds
      var wrapper = document.createElement('div'); // Create a placeholder div
      wrapper.innerHTML = request.responseText; // Make the response html the content of the div 
      wrapper.setAttribute('class', 'wrapper');
      var body = request.responseText.match(/body class="\w*"/); // Search through response text for body class
      var bClass = body[0].match(/"\w*"/); 
      var newcontent = wrapper.querySelector('.wrapper .content').innerHTML; // content from requested page
      document.querySelector('.content').innerHTML = newcontent; // replace the html from current page with newContent
      bClass = bClass[0].replace(/"/g,''); // Strip the newclass
      document.querySelector('body').setAttribute('class', bClass + ' load-in'); // set new class on body
      setTimeout(function(){
        document.querySelector('body').setAttribute('class', bClass);
      }, 1000); // Body animation shit
      getLinks(); // Reattach event handlers! otherwise some clicks won't have it attached
      if(document.querySelector('body.about')){
        document.querySelector('.listening').load = lastfm();
      }
    }
  }
  return;
}

/*
Last.fm pulling
*/

function lastfm(){
  var url = "http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=nitanima&api_key=61a791127993f3fa48d04ba07efa9bd0&format=json" 
  var request = new XMLHttpRequest();
  if("withCredentials" in request){
    request.open("GET", url, true);
  } else if (typeof XDomainRequest != "undefined") {
    request = new XDomainRequest();
    request.open("GET", url);
  } else {
    request = null;
    console.log("CORS not supported");
  }
  try{
    request.send(null);
  }
  catch(e){
    console.log("Error:", e.name); 
  }
  request.onreadystatechange = function(){
    if(request.readyState == 4){
      var response = JSON.parse(request.responseText);
      if(response.recenttracks.track[0]['@attr']){
        var html="<b>Listening to: </b>";
      } else {
        var html="<b>Listens to: </b>";
      }
      html +=   "<i>" + response.recenttracks.track[0].name + "</i> by " + 
                response.recenttracks.track[0].artist['#text'] + " from " + 
                "<b>" + response.recenttracks.track[0].album['#text'] + "</b>";
      var listen = document.querySelector('.listening');
      listen.insertAdjacentHTML('beforeend', html);
    }
  }
}

/*
Day/Night toggle
*/
function lightswitch(){ 
  var body = document.querySelector('html');
  var bclass = body.getAttribute('class');
  //if(bclass.contains('night')){
  if(bclass.match(/night/)){
    bclass = bclass.replace(' night', '');
    body.setAttribute('class', bclass);
  } else {
    body.setAttribute('class', bclass + ' night');
  }
}

/*
Mail replacement to stop spam (I hope)
*/
function mail(){
  var mail = document.querySelector('.mail');
  mail.setAttribute('href','mailto:arawde@gmail.com');
}


