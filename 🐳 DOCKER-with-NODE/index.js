const express = require("express");
const app = express();
const PORT = 8000;

app.get("/", (req, res) => {
    return res.end("Welcome to learn Docker..");
});

app.listen(PORT, () => console.log(`Server started at PORT:${PORT}`));

// Create Image ->  docker build -t myapp .
// Container create & run ->  docker run -d --name "webapp" --rm -p 8000:8000 myapp
// Container stop & remove ->  docker stop webapp

// docker image ls
// docker ps

// Pull any image from Docker Hub :------------------->
// docker pull nginx
// docker run -d --name "engine" --rm -p 8000:80 nginx:latest
// docker stop engine

// push code to Docker Hub for sharing our app to everyone------------>
// create repository in docker Hub like:- docker push ankitkumarbarik/docker-webapp-demo:tagname .
// in terminal login docker hub for connect with local system :-    docker login
// first build image:- docker build -t ankitkumarbarik/docker-webapp-demo:01 .
// now push to docker hub:- docker push ankitkumarbarik/docker-webapp-demo:01
// now logout:- docker logout

// Example as a TESTER👩🏻‍💻 - now pull my app
// https://hub.docker.com/repository/docker/ankitkumarbarik/docker-webapp-demo/tags
// now pull the image -> docker pull ankitkumarbarik/docker-webapp-demo:01
// then test/run container -> docker run -d --name "demoapp" --rm -p 8000:8000 ankitkumarbarik/docker-webapp-demo:01
// for stop/remove container -> docker stop demoapp
