# traffic-light-web
<img src="https://github.com/hcl-pnp-rtist/traffic-light-web/blob/master/webapp/public/images/screenshot.png" width="100" height="100">

A traffic light controller implemented in [HCL RTist](https://www.devops-community.com/realtime-software-tooling-rtist.html). Communicates with a web server (implemented in Node JS) for visualizing application behavior in a web application. Also shows how a web application can send messages to the C++ application.

Note: The communication with the web server uses the [lib-http-server](https://github.com/hcl-pnp-rtist/lib-http-server) library, so you must clone that repository also into your workspace.

## Starting the web server
* `cd webapp`

* `npm install`

* `node app.js`

* Open [http://localhost:4000/](http://localhost:4000/) in a web browser

## Building and running the traffic light controller software
* Create an Eclipse workspace and import the project in the TrafficLightsDemo folder.
* Also import the project from the [lib-http-server](https://github.com/hcl-pnp-rtist/lib-http-server) library.
* Choose a transformation configuration (TC) to build according to your platform. Two TCs are provided - one for Windows using the Visual Studio 2017 compiler, and one for Raspberry Pi using GCC 6.0.3. If you want to build for a different platform or using a different compiler, copy one of those TCs and update it accordingly. Typical TC properties to update are "TargetRTS configuration", "Make type" and "Make command".
* Right-click on the TC and do **Build**. If you build for the Raspberry Pi you need to transfer the built executable to the Pi (the Eclipse Remote Systems Plugin can help with that).
* `cd <workspace-folder>\TrafficLightsDemo_target\default`
* `executable.exe -URTS_DEBUG=quit -webhost=<HOST> -webport=<PORT>` where you should set <HOST> and <PORT> to where you run the web application.

## How the application works
When started the application begins to cycle the traffic light from red to green to yellow and back to red again. This cycling is driven by a timer. When the application receives a request for a pedestrian to cross the street (it can for example be triggered by pressing the button in the web application), it will put the traffic light to the Red state. After a while it will then turn the pedestrian signal from Stop to Walk and then back to Stop. Finally it starts to cycle the traffic light again.  
Each time the traffic light or pedestrian light changes state, a message is sent to the web application using an HTTP request. The web application in turn translates this into changing the graphics in the web application by sending a message over a web socket.


