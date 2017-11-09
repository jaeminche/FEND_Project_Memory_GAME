// Shuffle function from http://stackoverflow.com/a/2450976
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

let displayCard = function() {
	let cardList = [];
	cardList = $('.card');
	cardList = shuffle(cardList);
	let newCardList = [];
	for (let i = 0; i < cardList.length; i++) {
		$(cardList[i]).removeClass('open show match');
		newCardList.push(cardList[i]);
	}
	$('.deck').html(newCardList);
};

let restart = function() {
	location.reload();
};

displayCard();

$('.restart').click(function() {
	restart();
});

let t0, t1, timeSpent,
	listOfTwoSymbols = [],
	memoryForPair = [],
	totalMatch = 0,
	/**
	 * removes award stars according to number of try
	 * @param {string} numTry
	 */
	rateStar = function(numTry) {
		let target = $('.third-star');
		if (numTry === '18') {
			target = $('.second-star');
		}
		if (numTry === '25') {
			target = $('.first-star');
		}
		target.removeClass('fa-star').addClass('fa-star-o');
	},

	incrementMoveCnt = function() {
		let numMove = $('.moves');
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
}

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
				t1 = performance.now()
				$(cardSltd).children().removeClass(nameOfSymbol).addClass('fa fa-key magictime tinUpIn');
				stopCountDown();
				starCounter();
				setTimeout(function() {
					targetPopup('finishPopup');
				}, 2500);
			}
		} else { // if the pair do not match, execute a jello animation and flip them back to the initial state
			executeMotion(pair, 'not-match jello');
			setTimeout(function() {
				$(pair).removeClass('open show not-match animated jello');
			}, 1000);
		}
	}
	},

/**
 * Open and Show cards selected
 * @param {string} cardSelected - element of the '.card' selected
 */
	openShowCard = function(cardSelected) {
		$(cardSelected).addClass('open show animated flipInY');
		displayCdSymbol(cardSelected);
	};

$('.card').click(function() {
	openShowCard(this);
});

easy = 60 * 3,
medium = 60 * 1.5,
impossible = 50,
display = $('#count-down');

let callSetTimeout, callInterval,
	getTimeSpent = function() {
		timeInSec = parseInt((t1 - t0)/1000);
	    min = parseInt(timeInSec / 60, 10);
	    sec = parseInt(timeInSec % 60, 10);
	    $('.time-spent').text(min + ' : ' + sec);
	},
	stopCountDown = function() {
		getTimeSpent();
		clearTimeout(callSetTimeout);
		clearInterval(callInterval);
	},
	startCountDown = function(duration, display) {
		t0 = performance.now();
	    let timer = duration, minutes, seconds;
	    callInterval = setInterval(function () {
	        minutes = parseInt(timer / 60, 10);
	        seconds = parseInt(timer % 60, 10);

	        minutes = minutes < 10 ? '0' + minutes : minutes;
	        seconds = seconds < 10 ? '0' + seconds : seconds;

	        display.text(minutes + ':' + seconds);

	        if (--timer < 0) {
	            $('.deck').addClass('magictime puffOut');
	            stopCountDown();
	        	callSetTimeout = setTimeout(function() {
					$('.time-spent').text()
					$('.container').addClass('magictime fail-image tinUpIn');
					targetPopup('gameoverPopup');
				}, 1000);
	        }
		}, 1000);
	},
	selectMode = function(inputMode) {
	    popup.style.display = 'none';
	    startCountDown(inputMode, display);
	};

/**
 * Selects a game mode by getting the selected name which is also a class name, passing it as a parameter in selectMode() called.
 * @returns {string} easy|medium|impossible
 */
$('.mode').click(function() {
	let thisButton = $(this);
	setTimeout(function() {
		selectMode(window[thisButton.attr('class').split(' ')[1]]);
	}, 700);
});

$('.mode').click(function() {
	$(this).addClass('animated flipInY');
});

 // Get the popup
let popup,
// When the user wins the game, open the popup
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
		let list = [];
		list = $('.fa-star');
		$('.num-stars').html(list.length);
		pushStarInPopup(list.length);
	};

// When the user clicks on (x), close the popup
$('.close').click(function() {
    closePopup();
});
// When the user clicks anywhere outside of the popup, close it
window.onclick = function(event) {
    if (event.target == popup) {
    	if ($(popup).attr('id') != 'startPopup') {
    		closePopup();
    	}
    }
};

$('.play-again').click(function() {
	restart();
});

$(function ($) {
	targetPopup('startPopup');
});










