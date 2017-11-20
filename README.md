# ESCAPE THE ROOM! Matching Game

## Table of Contents

* [Instructions](#instructions)
* [Features](#features)
* [Contributing](#contributing)

## Instructions

1. GOAL:

Mel is locked up in this room, and it will EXPLODE soon! Count-down clock is ticking upon the deck of the cards. Match all the cards in time, and you will find the key under the last card revealed! Help Mel to survive!

2. How to Play:

	1. On the initial load of the game, Select-A-Mode window will pop up, the player can choose one of the three mode, 'EASY', 'MEDIUM', and 'IMPOSSIBLE', which will set different count-down time durations: 3 minutes, 1.5 minutes, and 50 seconds respectively.
	2. Match all the cards in time and in as less clicks as possible. If you make more than 20 moves, star rating will decrease by one, and if more than 25 moves, by another one.
	3. If you fail, a game-over window will pop up and show two buttons: 'SEE-LEADERBOARD' and 'PLAY AGAIN'.
	4. If you win, a congratulations window will pop up and show the star ratings, play time spent, and number of moves made.
	5. If the player wins in less than 20 moves, she/he gets three stars. Then, a pop-up will appear asking for the player's name, which she/he can find on 'THREE-STARS CLUB' that will appear upon clicking on 'SEE-LEADERBOARD' button next to 'PLAY-AGAIN' button.
	6. The player can reset the leader board's record by clicking on 'RESET RECORD' button.
	7. Press ESC shortcut button or the restart-the-game button to restart the game.

3. HAVE FUN!




## Features

This complete browser-based card matching game is made with JavaScript, HTML, and CSS.
The game includes following features including interactivity:

	1. Keyboard shortcut : pressing ESC key restarts the game.
	2. A 'Three-Star Club' leaderboard with the time recorded and the user's names retrieved from user's input on a prompt box, using local storage.
	3. CSS animations when cards are clicked, unsuccessfully matched, and successfully matched.
	4. Selectable buttons for user to select a game mode on the welcome pop-up;
	they set different durations for a session.
	5. Count-down timer : When the player starts a game, a displayed timer should also start. Once the player wins the game, the timer stops. If not, the card deck bombs up, and a game-over pop-up displays.
	6. Stars(rating) retrieved and displayed on the congratulations pop-up.
	7. A leaderboard with scores automatically sorted by value.
	8. A reset-record button that allows clear the local storage and the leaderboard.
	9. X-marks that allow user to close pop-ups (also all the pop-ups (except for the welcome pop-up) can be closed by clicking anywhere outside.
	10. Restart and play-again buttons that allow user to  reset the game board, the timer, the star rating, and etc.
	11. Four pop-ups : welcome, winner, leaderboard, and gameover pop-ups.
	12. The game randomly shuffles the cards. A user wins once all cards have successfully been matched.
	13. Move counter : Game displays the current number of a set of moves a user has made.
	14. Star rating : The game displays a star rating (from 1-3) that reflects the player's performance. At the beginning of a game, it displays 3 stars. After 15 moves, it should change to a 2 star rating. After 18 moves, to a 1 star rating, and after 22 moves, to a 0 star rating.
	15. Media Query: This game app is a responsive website that changes its components' size and ratio according to specific devices.


## Contributing

I'd love to accept pull requests.

For details, check out [CONTRIBUTING.md](CONTRIBUTING.md).
