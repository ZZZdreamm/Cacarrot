It is kahoot like game.

Link to website: https://zzzdreamm.github.io/Cacarrot/

Tools used in project
- ReactJS
- SCSS
- Typescript
- Node.js
- Socket.IO
- Firebase
- JWTToken
- FetchAPI
- async function
- media queries
About project:
- Logging system using JWTToken Authentication for verification.
- As logged user you can create, edit and save Game Templates for later usage of them.
After choosing one of created templates, there is generated random Gamecode which
needs to be given to players for them to join the game. After players have joined host
of game starts the game.
- All game calculations and timer is counted on serverFside and stored in Firebase
Realtime Database to maintain game consistency even if user loses connection.
- Also to maintain game after refreshing page or losing connection all data that is
needed is saved in local and cache storages.


