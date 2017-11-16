/**
 * Creates a new game
 * @constructor
 */
let Game = function() {
};
Game.prototype.create = function() {
	return main();
};
/**
 * @description Encapsulate all the functions and variables, and call this at the initial load and initialize();
 */
function main() {
    let	thisButton, selectedTime, callInterval, callSetTimeout;
    let timer, minutes, seconds, timeInSec, min, sec,
    	cumulTime = 0;
	let target, numMove,
		listOfTwoSymbols = [],
		memoryForPair = [],
		totalMatch = 0;
	let myStorage = window.localStorage;
	let score;
	/**
	 * Shuffles the cards.
	 * @param {object} cardlist[]
	 * @description Shuffle function from http://stackoverflow.com/a/2450976
	 */
	function shuffle(array) {
	    let currentIndex = array.length, temporaryValue, randomIndex;
		// While there remain elements to shuffle...
	    while (currentIndex !== 0) {
	    	// Pick a remaining element
	        randomIndex = Math.floor(Math.random() * currentIndex);
	        currentIndex -= 1;
		    // And swap it with the current element
	        temporaryValue = array[currentIndex];
	        array[currentIndex] = array[randomIndex];
	        array[randomIndex] = temporaryValue;
	    }
	    return array;
	}

	let displayDeck = function() {
		let cardList = [];
		cardList = $('.card');
		cardList = shuffle(cardList);
		let newCardList = [];
		for (let i = 0; i < cardList.length; i++) {
			$(cardList[i]).removeClass('open show match animated flipInY flipInX tada');
			newCardList.push(cardList[i]);
		}
		$('.deck').html(newCardList);
	};
	/**
	 * removes award stars according to number of try
	 * @param {string} numTry
	 */
	let rateStar = function(numTry) {
			target = $('#thirdstar');
			if (numTry === '18') {
				target = $('#secondstar');
			}
			if (numTry === '25') {
				target = $('#firststar');
			}
			target.removeClass('fa-star').addClass('fa-star-o');
		},
		incrementMoveCnt = function() {
			numMove = $('.moves');
			numMove.html(parseInt(numMove.html()) + 1);
			// call rateStar() if number of try exceeds 14
			if (parseInt(numMove.html()) >= 14) {
				rateStar(numMove.html());
			}
		},
		executeMotion = function(cards, motion) {
			$(cards).removeClass('flipInY').addClass(motion);
			memoryForPair = [];
			listOfTwoSymbols = [];
		};

	/**
	 * Creates a new list for pair
	 * @constructor
	 */
	let Pair = [];
	let pairHolder = {
		create: function(a, b) {
					return [a, b]
				}
	};
	/**
	 * Push a pair in a list and see if they match
	 * @param {string} cardSltd - element of the '.card' selected
	 */
	let displayCdSymbol = function(cardSltd) {
		let nameOfSymbol = $(cardSltd).children().attr('class');
		listOfTwoSymbols.push(nameOfSymbol);
		memoryForPair.push(cardSltd);
		// everytime the list gets two cards, create new pair array in order to bypass clicking delay due to setTimeout
		if (listOfTwoSymbols.length === 2) {
			let pair = pairHolder.create(memoryForPair[0], memoryForPair[1]);
			incrementMoveCnt();
			// if the pair match, execute a tada animation
			if (listOfTwoSymbols[0] === listOfTwoSymbols[1]) {
				executeMotion(pair, 'match tada');
				totalMatch++;
				// if all cards have matched, get the end time, and display a key image and its animation
				if (totalMatch === 8) {
					getTimeSpent();
					score = cumulTime;
					myStorage.setItem('leaderboard', score);

					stopCountDown();
					$(cardSltd).children().removeClass(nameOfSymbol).addClass('fa fa-key magictime tinUpIn');
					starCounter();
					setTimeout(function() {
						targetPopup('winnerPopup');
						// get the card's class back to the default state
						$(cardSltd).children().removeClass('fa-key magictime tinUpIn').addClass(nameOfSymbol);
					}, 2500);
				}
			// if the pair do not match, execute a jello animation and flip them back to the default state
			} else {
				executeMotion(pair, 'not-match jello');
				setTimeout(function() {
					$(pair).removeClass('open show not-match animated jello');
				}, 1000);
			}
		}
	};
	/**
	 * Open and Show cards selected
	 * @param {string} cardSelected - element of the '.card' selected
	 */
	let	openShowCard = function(cardSelected) {
			$(cardSelected).addClass('open show animated flipInY');
			displayCdSymbol(cardSelected);
	};

	let getTimeSpent = function() {
			timeInSec = cumulTime;
		    min = parseInt(timeInSec / 60, 10);
		    sec = parseInt(timeInSec % 60, 10);
		    $('.time-spent').text(min + ' : ' + sec);
		},
		stopCountDown = function() {
			clearTimeout(callSetTimeout);
			clearInterval(callInterval);
		},
		startCountDown = function(duration, display) {
		    timer = duration, minutes, seconds;
		    callInterval = setInterval(function () {
		        minutes = parseInt(timer / 60, 10);
		        seconds = parseInt(timer % 60, 10);
		        minutes = minutes < 10 ? '0' + minutes : minutes;
		        seconds = seconds < 10 ? '0' + seconds : seconds;
		        display.text(minutes + ':' + seconds);
		        cumulTime++;

		        if (--timer < 0) {
		        	getTimeSpent();
		        	stopCountDown();
		            $('.deck').addClass('magictime puffOut');
		        	callSetTimeout = setTimeout(function() {
						$('.time-spent').text()
						$('.container').addClass('magictime fail-image tinUpIn');
						targetPopup('gameoverPopup');
					}, 1000);
		        }
			}, 1000);
	};

	/**
	 * Pass in an user-selected mode as a parameter
	 * @param {number} inputMode - 180|90|50 (easy|medium|impossible) each
	 */
	let selectMode = function(inputMode) {
	    popup.style.display = 'none';
    	if (inputMode === 'easy') {
			return (60 * 3);
		}
		if (inputMode === 'medium') {
			return (60 * 1.5);
		}
		if (inputMode === 'impossible') {
			return (40);
		}
	};

	// When the user starts, wins, or loses the game, open the popup
	let popup, starList,
		targetPopup = function(popupName) {
			popup = document.getElementById(popupName);
			openPopup();
		},
		openPopup = function() {
		    popup.style.display = 'block';
		},
		closePopup = function() {
		    popup.style.display = 'none';
		    $('.deck').removeClass('magictime puffOut');
		    $('.card').off('click');
		    $('.card').addClass('open show animated flipInX');
		},
		pushStarInPopup = function(times) {
			for (let i = 0; i < times; i++) {
				$('.awards').append('<li><i class="fa fa-star magictime tinUpIn"></i></li>');
			}
		},
		starCounter = function() {
			starList = $('.fa-star');
			$('.num-stars').html(starList.length);
			pushStarInPopup(starList.length);
		};

	let initialize = function() {
		// reset timer
		thisButton = {};
		selectedTime = null;
		cumulTime = 0;
		// reset the deck
		listOfTwoSymbols = [];
		memoryForPair = [];
		totalMatch = 0;
		// reset popup
		starList = [];
		$('#count-down').empty();
		$('.num-stars').empty();
		$('.awards').empty();
		$('.time-spent').text();
		// reset stars on score-panel
		$('.ratestars').removeClass('fa-star-o').addClass('fa-star');
		$('.moves').text('0');
		// reset the background on fail
		$('.container').removeClass('magictime fail-image tinUpIn');

		newGame = new Game();
		newGame.create();
	};

	displayDeck();
	// Open the first popup for user's game mode selection
	targetPopup('welcomePopup');

	// When the user clicks on (x), close the popup
	$('.close').click(function() {
	    closePopup();
	});
	// When the user clicks anywhere outside of the popup, close it
	window.onclick = function(event) {
	    if (event.target == popup) {
	    	if ($(popup).attr('id') != 'welcomePopup') {
	    		closePopup();
	    	}
	    }
	};
	/**
	 * Selects a game mode by getting the selected mode name which also is the id name, and then passing it as a parameter in selectMode() called.
	 * @returns {string} easy|medium|impossible - user gets to select one of these modes
	 */
	$('.mode').unbind('click').click(function() {
		thisButton = $(this);
		thisButton.addClass('animated flipInY');
		setTimeout(function() {
			thisButton.removeClass('animated flipInY');
			selectedTime = selectMode(thisButton.attr('id'));
			startCountDown(selectedTime, $('#count-down'));
		}, 700);
	});

	$('.play-again').unbind('click').click(function() {
		stopCountDown();
		closePopup();
		initialize();
	});

	$('.restart').unbind('click').click(function() {
		stopCountDown();
		initialize();
	});

	$('.card').click(function() {
		openShowCard(this);
	});

	// Add previous score panel
	leaderboard = myStorage.getItem("leaderboard");
	console.log(leaderboard);
	console.log(myStorage);
	$('.previous-score').html(leaderboard);
};

main();