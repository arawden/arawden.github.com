---
class: post
title: Cross Origin Requests
layout: default
date: 2015-01-16
summary: The most straightforward way to handle cross-site requests in Javascript (in my experience)
---
##Cross Origin Requests##
The idea behind cross origin requests comes up often: There's data I need from
another website, whether it be an API, an RSS feed, or just a table of values,
and I want to pull it onto my domain so I can manipulate it.

The problem arises from the fact that these outside resources can be malicious,
and so browsers are designed to protect a user from materials outside the site
introducing harmful code to their sessions.

Of course, within Javascript, there are tools that give us some wiggle room.
The only issue being that these tools are a little poorly documented.

##The code##
Here's the code that pulls last.fm data to this site (on my About page) so you
can see the music I'm currently into (because thats the kind of stuff I like to
do).
{% highlight javascript linenos %}
function lastfm(){
  var url = "APIKEY"
  var request = new XMLHttpREquest();
  if ("withCredentials" in request) {
    request.open("GET", url, true);
  } else if (typeof XDomainRequest != "undefined") {
    request = new XDomainRequest();
    request.open("GET", url);
  } else {
    request = null;
    console.log("CORS not supported");
  }
  try {
    request.send(null);
  } catch(e){
    console.log("Error", e.name);
  }
  request.onreadystatechange = function(){
    if (request.readyState == 4) {
      /* PARSE THE RESPONSE AND BUILD HTML */
    }
  }
}
{% endhighlight %}
So whats going on here? We start with the API key and create a new
[XMLHttpRequest](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest),
then check the status of the "withCredentials" boolean, which _"Indicates whether 
or not cross-site Access-Control requests should be made using credentials such 
as cookies or authorization headers."_ We can support IE by making an 
XDomainRequest. If neither of these are supported, we just log to the console
and dont bother with the rest of the function. 

It took me a long time to find this information (although on a recent search I
found it on html5rocks so maybe I was just having a bad day), so here it is for
you!   
