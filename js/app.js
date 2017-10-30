/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
	// While there remain elements to shuffle...
    while (currentIndex !== 0) {
    	// Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

	    // And swap it with the current element.
        console.log('currentArray', array);
        temporaryValue = array[currentIndex];
        console.log('temporaryValue', temporaryValue);
        array[currentIndex] = array[randomIndex];
        console.log('array[randomIndex]', array[randomIndex]);
        var x = array[currentIndex];
        console.log('array[currentIndex]', x);
        array[randomIndex] = temporaryValue;
        console.log('finalarray', array);
    }
    return array;
}

var arr = [2, 11, 37, 42];
arr = shuffle(arr);
console.log(arr);


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
 * Don't worry about styling, just get something clickable on the page.
 * Figure out the HTML needed to represent a card. Remember, you have to represent two sides of the card.
 * Are you going to have two separate elements stacked on top of each other?
 * Add the functionality to handle clicks.
 * This should reveal the hidden side of each card.
 */