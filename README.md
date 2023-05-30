It is kahoot like game. 

About it:

Game host hosts game on device and clients join to it by writing gamecode in input on landing page.
You have to be registered and logged to host a game or/and create/edit your game templates.
Game consists of few stages:
- host alternately shows questions and current points of all players
- players answers current question shown on host device and see if they answer was correct or not
- after whole set of questions on all devices there are shown winners of game
If while waiting for players to join, player enters a game and leave the game before start he is erased from game to not take 
slot for others.
If host closes website he have 15 seconds to come back to game or else game is considered closed and players will get communicate about
it being abandoned.
State of game on every device is being consistent after refresh of page by getting data from firebase database before rendering whole game component.
You can't create game on phone because it is too small for showing answers in game anyway, so host must be on bigger device.

TODO:
- between questions add possibility for players to buy special bonuses that will affect them or other players for their points


Link to website: https://zzzdreamm.github.io/Cacarrot/
