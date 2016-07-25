# Trippy (in progress) #

### Make trip plans in realtime with your friends! ###
* Part of the Main family hackathon, MAINATHON. Five days, make a cool MVP.
* App that hybridizes chat rooms and trip planners. No more passing around links in a Facebook group or chat thread.
* Real-time chat and real-time creation of Waypoints(Google Maps, Directions, Places, AirBnB listings, etc.) so that everyone can see these things in the same place at the same time.

### In Progress. Todos: ###
* Hookup maps waypoints.
* Display waypoints/show waypoints to friends functionality.
* Validation/sanitization everywhere. If you try really hard to break something at the moment you probably can.
* Implement final index/entry design. It'll be way shiny!
* Integration of additional waypoints, Maps being highest priority. 
* Authentication/ownership.
* Server-side rendering.
* Micro-ui polishing across app.
* Mobile-version (?)

### Caveats ###
* Chose to use material-ui to aid in focusing on functionality over style while working quickly. Any decisions it makes on a micro-ui level don't necessarily reflect the same ones that I would make.
* As development on this began with a set time limit, mobile/client UA responsiveness is currently low priority (mobile would be its own app/set of concerns). Traditionally I'd develop with those things (and things like ownership/validation) in mind as I went. I do believe in progressive enhancement! Tested on a 17" Macbook Air running latest Chrome.


### Mainathon specs: ###
* Technologies: Node(Express), React(Redux), [material-ui](http://www.material-ui.com/#/), [Ducks](https://github.com/erikras/ducks-modular-redux), socket.io, Mongo.





