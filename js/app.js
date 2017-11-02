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
	$(cardSelected).addClass("open show");
	pushCardInList(cardSelected);
}

let listOfCardClassNm = [];
let listOfSeltCard = [];
let listMatched = [];
let pushCardInList = function(cardSltd) {
	var classNmOfCard = $(cardSltd).children().attr('class');
	listOfCardClassNm.push(classNmOfCard);
	listOfSeltCard.push(cardSltd);
	if (listOfCardClassNm.length === 2) {
		incrementMoveCnt();
		if (listOfCardClassNm[0] === listOfCardClassNm[1]) {
			$(listOfSeltCard).addClass("match");
			listOfCardClassNm = [];
			// listOfSeltCard = [];
		} else {
			setTimeout(function() {
				$(listOfSeltCard).removeClass("open show");
				listOfSeltCard = [];
			}, 1500);
			listOfCardClassNm = [];
			// listOfSeltCard = [];
		}
		// listOfCardClassNm = [];
		// listOfSeltCard = [];
	}
	// listOfCardClassNm = [];
	// listOfSeltCard = [];
}

// let mat = new Match();

let incrementMoveCnt = function() {
	var numMove = $(".moves");
	numMove.html(parseInt(numMove.html()) + 1);
	// mat.openShowCard();
}

$(".card").click(function() {
	openShowCard(this);
});



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