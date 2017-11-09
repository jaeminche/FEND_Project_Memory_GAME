let callSetTimeout, callInterval;

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;
	// While there remain elements to shuffle...
    while (currentIndex !== 0) {
    	// Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
	    // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

let displayCard = function() {
	let cardList = [];
	cardList = $(".card");
	cardList = shuffle(cardList);
	let newCardList = [];
	for (let i = 0; i < cardList.length; i++) {
		$(cardList[i]).removeClass("open show match");
		newCardList.push(cardList[i]);
	}
	$(".deck").html(newCardList);
}

let restart = function() {
	location.reload();
}

displayCard();

$(".restart").click(function() {
	restart();
})



// removes rateStar according to number of try
let rateStar = function(numTry) {
	let target = $(".third-star");
	if (numTry === '18') {
		target = $(".second-star");
	}
	if (numTry === '25') {
		target = $(".first-star");
	}
	target.removeClass('fa-star').addClass('fa-star-o');
}

let incrementMoveCnt = function() {
	let numMove = $(".moves");
	numMove.html(parseInt(numMove.html()) + 1);
	// call rateStar() if number of try exceeds 14
	if (parseInt(numMove.html()) >= 14) {
		rateStar(numMove.html());
	}
}

let t0, t1, timeSpent;
let listOfTwoSymbols = [];
let memoryForPair = [];
let totalMatch = 0;
let Pair = function() {};

let displayMotion = function(cards, motion) {
	$(cards).removeClass("flipInY").addClass(motion);
	memoryForPair = [];
	listOfTwoSymbols = [];
}

Pair.prototype.create = function(a, b) {
	return [a, b]
};
let pairHolder = new Pair();
// Push a pair in a list and see if they match
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
			displayMotion(pair, "match tada");
			totalMatch++;
			// if all cards have matched, get the end time, and display a key image and its animation
			if (totalMatch === 8) {
				t1 = performance.now()
				$(cardSltd).children().removeClass(nameOfSymbol).addClass('fa fa-key magictime tinUpIn');
				stopCountDown();
				starCounter();
				setTimeout(function() {
					targetPopup("finishPopup");
				}, 2500);
			}
		} else { // if the pair do not match, execute a jello animation and flip them back to the initial state
			displayMotion(pair, "not-match jello");
			setTimeout(function() {
				$(pair).removeClass("open show not-match animated jello");
			}, 1000);
		}
	}
}

let openShowCard = function(cardSelected) {
	$(cardSelected).addClass("open show animated flipInY");
	displayCdSymbol(cardSelected);
}

$(".card").click(function() {
	openShowCard(this);
});

let starCounter = function() {
	let list = [];
	list = $('.fa-star');
	$('.num-stars').html(list.length);
	pushStarInPopup(list.length);

}

let pushStarInPopup = function(times) {
	for (let i = 0; i < times; i++) {
		$('.awards').append('<li><i class="fa fa-star magictime tinUpIn"></i></li>');
	}
}

let getTimeSpent = function() {
	timeInSec = parseInt((t1 - t0)/1000);
    min = parseInt(timeInSec / 60, 10);
    sec = parseInt(timeInSec % 60, 10);
    $('.time-spent').text(min + " : " + sec);
}

function startCountDown(duration, display) {
	t0 = performance.now();
    let timer = duration, minutes, seconds;
    callInterval = setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.text(minutes + ":" + seconds);

        if (--timer < 0) {
            $(".deck").addClass("magictime puffOut");
        	callSetTimeout = setTimeout(function() {
				stopCountDown();
				$('.time-spent').text()
				$(".container").addClass("magictime fail-image tinUpIn");
				targetPopup("gameoverPopup");
			}, 1000);
        }
	}, 1000);
}


let selectMode = function(inputMode) {
    popup.style.display = "none";
    startCountDown(inputMode, display);
};

easy = 60 * 3,
medium = 60 * 1.5,
impossible = 50,
display = $('#count-down');

$('.mode').click(function() {
	let thisButton = $(this);
	setTimeout(function() {
		selectMode(window[thisButton.attr('class').split(' ')[1]]);
	}, 700);

})

$('.mode').click(function() {
	$(this).addClass('animated flipInY');
})

$(function ($) {
	targetPopup("startPopup");
})

let stopCountDown = function() {
	getTimeSpent();
	clearTimeout(callSetTimeout);
	clearInterval(callInterval);
}

 // Get the popup
let popup;
// When the user wins the game, open the popup
let targetPopup = function(popupName) {
	popup = document.getElementById(popupName);
	openPopup();
}
let openPopup = function() {
    popup.style.display = "block";
}
// When the user clicks on (x), close the popup
$(".close").click(function() {
    closePopup();
})
// When the user clicks anywhere outside of the popup, close it
window.onclick = function(event) {
    if (event.target == popup) {
    	if ($(popup).attr('id') != 'startPopup') {
    		closePopup();
    	}
    }
}

$('.play-again').click(function() {
	restart();
})

let closePopup = function() {
    popup.style.display = "none";
    $(".deck").removeClass("magictime puffOut");
    $(".card").off('click');
    $(".card").addClass("open show animated flipInX");
}






/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */


/*
 * Start by building a very simple grid of cards.
 * -- Don't worry about styling, just get something clickable on the page.
 * -- Figure out the HTML needed to represent a card. Remember, you have to represent two sides of the card.
 * ----Are you going to have two separate elements stacked on top of each other?
 * Add the functionality to handle clicks.
 * -- This should reveal the hidden side of each card.
 * Work on the matching logic. How does your game "know" if a player guesses correctly or incorrectly?
 * Work on the winning condition. How does your game “know” if a player has won?
 * We recommend saving styling until the very end. Allow your game logic and functionality to dictate the styling.
 */









// DisplayCard.prototype.open = function() {
// 	$(this).addClass("open");
// }
// DisplayCard.prototype.show = function() {
// 	$(this).addClass("show");
// }
// DisplayCard.prototype.match = function() {
// 	$(this).addClass("match");
// }


// let OpenCard = function() {
// 	DisplayCard.call(this);
// }