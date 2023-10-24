# mapbox
## About
This is a homework assignment given to me by GLI-Solutions.
The project is an interactive route planner with Veszprém at it's center, but of course you can explore & plan routes to your heart's desire.

## Experience
This was a really fun project to work on. I learnt a lot about how modern navigation and map data are made and had a blast while doing so.

## How to start?
First, You have to have docker desktop installed. If not, you can download it from here: https://www.docker.com/products/docker-desktop/.
If you're from windows, you might have to install wsl, you can do that by executing "wsl --install" in powershell.
If you're from linux, you have everything you need.
Navigate to the folder where you saved the project in bash/ps. 
In the mapbox (parent) folder you have to see docker-compose.yml file.
You just have to execute the "docker-compose up" command in the mapbox folder, from there on it's automated.
If you notice that you have the docker container running, you can open a browser, and write localhost:3000 in the browser.
There you go, you can see the application. Have fun with exploring, so had I while writing the app.

## Tech Stack
### FrontEnd
  - React (using Vanilla JS)
### BackEnd
  - Mapbox GL JS API
  - Mapbox GL Geocoder
  - Mapbox Directions API
### Planning
  - GitHub Projects Table planner
### Containerizing
  - Docker

## Semantic Commit Messages
  - Add : Adding new, non-existing feature
  - Update : Editing existing feature
  - Remove : Deleting existing feature
  - Fix : Fix existing bug
  - Doc : Adding documentation, commenting or non-code related info
