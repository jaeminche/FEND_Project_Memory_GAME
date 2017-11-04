/*
 * Create a list that holds all of your cards
 */
// let cardList = [];
// cardList = $(".card");
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

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
// let game = new DisplayCard();

displayCard();

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

$(".restart").click(function() {
	location.reload();
})


// let Match = function() {
// 	this.moves = 0;
// }

let openShowCard = function(cardSelected) {
	$(cardSelected).addClass("open show animated flip");
	$(cardSelected).css("pointer-events", "none");
	pushCardInList(cardSelected);
}

let listOfCardClassNm = [];
let listForMatch = [];
let totalMatch = 0;
let pushCardInList = function(cardSltd) {
	var classNmOfCard = $(cardSltd).children().attr('class');
	listOfCardClassNm.push(classNmOfCard);
	listForMatch.push(cardSltd);
	if (listOfCardClassNm.length === 2) {
		incrementMoveCnt();
		if (listOfCardClassNm[0] === listOfCardClassNm[1]) {
			$(listForMatch).addClass("match");
			totalMatch++;
			if (totalMatch === 8) {
				starCounter();
				openPopup();
			}
			$(listForMatch).off('click');
			listOfCardClassNm = [];
		} else {
			$(".card").css("pointer-events", "none");
			setTimeout(function() {
				$(listForMatch).removeClass("open show animated flip");
				listForMatch = [];
				$(".card").css("pointer-events", "auto");
			}, 700);
			listOfCardClassNm = [];
		}
	}
}

// let mat = new Match();

let incrementMoveCnt = function() {
	let numMove = $(".moves");
	numMove.html(parseInt(numMove.html()) + 1);
	if (parseInt(numMove.html()) >= 12) {
		rateStar(numMove.html());
	}
}
// let starsNum = 3;
let rateStar = function(numTry) {
	let target = $(".third-star");
	// let num = '2';
	if (numTry === '15') {
		target = $(".second-star");
		// num = '1';
	}
	if (numTry === '18') {
		target = $(".first-star");
		// $('.num-stars').html("0");
		// num = '0';
	}
	target.removeClass('fa-star').addClass('fa-star-o');
	// $('.num-stars').html("num");
}


$(".card").click(function() {
	openShowCard(this);
});

let starCounter = function() {
	let list = [];
	list = $('.fa-star');
	$('.num-stars').html(list.length);
}


// const listShow = [];
// $(".card").click(function() {
// 	$(this).addClass("open show");
// 	var cardClass = $(this).children().attr('class');
// 	listShow.push(cardClass);
// 	if (listShow[0] === listShow[1]) {
// 		// console.log("match");

// 	} else {
// 		console.log("unmatch");
// 	}
// })

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



 // Get the popup
var popup = document.getElementById('myPopup');

// Get the button that opens the popup
// var btn = document.getElementById("myBtn");

// Get the <span> element that closes the popup
var span = document.getElementsByClassName("close")[0];

// When the user wins the game, open the popup
let openPopup = function() {
    popup.style.display = "block";
}

// When the user clicks on <span> (x), close the popup
span.onclick = function() {
    popup.style.display = "none";
}

// When the user clicks anywhere outside of the popup, close it
window.onclick = function(event) {
    if (event.target == popup) {
        popup.style.display = "none";
    }
}



//plain timer
// var minutesLabel = document.getElementById("minutes");
// var secondsLabel = document.getElementById("seconds");
// var totalSeconds = 0;
// setInterval(setTime, 1000);

// function setTime()
// {
//     ++totalSeconds;
//     secondsLabel.innerHTML = pad(totalSeconds%60);
//     minutesLabel.innerHTML = pad(parseInt(totalSeconds/60));
// }

// function pad(val)
// {
//     var valString = val + "";
//     if(valString.length < 2)
//     {
//         return "0" + valString;
//     }
//     else
//     {
//         return valString;
//     }
// }
//plain timer ends



function startCountDown(duration, display) {
    let timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.text(minutes + ":" + seconds);

        if (--timer < 0) {
            $(".deck").addClass("magictime vanishOut");
            timer = 0;
        }
    }, 1000);
}

$(function ($) {
    let easyMode = 60 * 5,
    	mediumMode = 60 * 2,
    	extremeMode = 60 * 1,
    	impossibleMode = 60 * 0.5,
        display = $('#count-down');
    startCountDown(impossibleMode, display);
});
