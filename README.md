# Rock Paper Scissors
This repo showcases a simple Rock Paper Scissors multiplayer game utilizing JavaScript with Node.js to be played in a web browser. It was built after following omgimanerd's "How To Build A Multiplayer Browser Game" template for a class assignment. After following that tutorial, Juriy's YouTube video series starting with "Building multiplayer game with JavaScript" was found and also helped in the construction of this project. This project is meant for educational purposes.

# How to run locally
In the Command Prompt, first you must initialize the project with `npm init -y` in the server directory.
Install Express.js, socket.io, and jest with `npm install express socket.io jest` in the same server directory.
Still in the server, run the program with `npm start`.
Two browsers can be open to observe the 2-player functionality with an interactive chat. The server is run on port 5000: http://localhost:5000/

# Software Quality Testing
Expanding on this project, I have included some unit tests for some of the functions using the Jest framework.
These tests can be done by using the commands `npm test` or `npm test fileName`. Another addition that has been made is the inclusion of the ProgramSlices folder for the purposes of static analysis.

# Project Author
Scott Garland

## Source code from previous authors
omgimanerd: https://github.com/omgimanerd/how-to-build-a-multiplayer-browser-game

Juriy: https://github.com/Juriy/gamedev
