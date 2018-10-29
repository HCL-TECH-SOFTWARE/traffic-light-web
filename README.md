# traffic-light-web
A traffic light controller implemented in [HCL RTist](https://www.devops-community.com/realtime-software-tooling-rtist.html). Communicates with a web server (implemented in Node JS) for visualizing application behavior in a web application.
## Starting the web server
* `cd webapp`

* `npm install`

* `node app.js`

Open [http://localhost:4000/](http://localhost:4000/) in a web browser
## Building and running the traffic light controller software
* Create an Eclipse workspace and import the project in the TrafficLightsDemo folder.
* By default, the code will be compiled and linked with MinGW. If you want to use other build tools, double-click the transformation configuration (TC) called 'app' and edit the properties as necessary (typically "TargetRTS configuration", "Make type" and "Make command").
* Right-click on the TC and do **Build**.
* `cd <workspace-folder>\TrafficLightsDemo_target\default`
* `executable.exe -URTS_DEBUG=quit`



