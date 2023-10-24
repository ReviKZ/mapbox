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
You have to open a file in a text-editor or IDE and instead of "your-mapbox-token" you should write your own access token, which you can find here: https://account.mapbox.com/
You just have to execute the "docker-compose up" command in the mapbox folder, from there on it's automated.
If you notice that you have the docker container running, you can open a browser, and write localhost:3000 in the browser.
There you go, you can see the application.

## How to use?
You can drag the map to move, zoom in and out with mouse scroll and control the pitch with holding down right click.
If you click anywhere on the map, you will be able to put down a marker. Not just one, a lot.
Alternatively you can search for an address via the searchbar in the top-right corner of the screen. When you select the address with clicking on it, it will show you where that is, and puts down a marker.
You can see your markers listed on the top-left of your screen with their coordinates displayed. If you click on the X button besides them, they will be deleted from the map.
If you have more than 1 marker on the screen, you can click the Plan button, to plan a route between them. (via Car)
You can also add more markers and click the Plan button again to replan the route.
If you delete all your markers or leave one marker and click the Plan button, the route will disappear.
Wanna set the color & width of the navigation line? No problem!
You can do that with setting whichever you want from the roll down select menu. Once you click the save button, the navigation line will change accordingly.
Have fun with exploring, so had I while writing the app.

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
