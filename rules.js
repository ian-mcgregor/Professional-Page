/*
[IMPORTANT]
You are free to create any number of helper function you want.
We know the problem could be seached online, and we are aware of those solutions. 
So please sight sources if you took help from any online resource.
*/

//count = number of moves made
var count = 0;

//IDs for all the table elements. You get the cell element just by using document.getElementById("A1")
var table_ids = ["A1", "A2", "A3", "B1", "B2", "B3", "C1", "C2", "C3"]

//table to keep track of moves
//This is slightly hilarious. I did not notice that board_state had already been included and came 
//to the same conclusion that this would be tne best way to track status
var statusTable = [-1, -1, -1, -1, -1, -1, -1, -1, -1];

/*
An integer array of length 9. 
Usaged: This is to store the state to the tictactoe board.
When a move is made 
(Example player 1 (who is X) move at Cell 'A1' --- The board_state[0] will be made 1 )
Similarly, A move by player 2(who is O) at Cell 'A3' --- The board_state[2] will be made 0 )
We store the move of player 1 as '1' and player 2 as '0'. So after the above two moves the state should look like
[1, -1, 0, -1, -1, -1, -1, -1, -1]
*/
var board_state = [-1,-1,-1,-1,-1,-1,-1,-1,-1]


// A flag to keep track of the status of the game, false means the game is not started. The default value is set to false
var started = false

/* 
A variable to keep track of each players turn. Since the game always starts with player 1 - The default value is set to '1'
1 means player_1
0 means player_0
*/
var turn = 1 

/*
 @Return boolean
 @Param _str - A string variable - Note the type is not checked in the implementation
 The methods @Returns true is the _str is null or it has a length of 0, otherwise, the methods returns false
*/
function isEmpty(_str) {
	return (!_str || 0 === _str.length)
}

/*
@Return int This return the turn variable. Please note that 
turn = 1 is for player_1 and 
turn = 0 is for player_2
@Param - No param
*/
function whose_move(){
	return this.turn
}

/*
@Return void
@Param 
This methods toggles the 'turn' variable.
if the turn is set to 1 it will make it 0
if the turn is set to 0 it will make it 1
*/
function toggle_move() {
	this.turn = !this.turn
}

/*
@Return boolean
@Param 
The method returns the value of the 'started' flag.
true means the game has started
false means the game has not started
When the game has not started the flag is set to false. As soon as the game starts the flag must be set to true.
Once the game has finished or user has clicked on reset_play the flag must be set to false.
*/
function game_started(){
	return this.started
}


/*
TODO - Rule 1
This is the first method you'll implement. This method is called when the Begin Play button is 
	clicked.
The method should do all the validations as stated in rule 1.
DONE
*/

function begin_play(){

	var name1 = document.getElementById("player1_id");
	var name2 = document.getElementById("player2_id");
	var turnInfo = document.getElementById("turn_info");
	console.log(name1.value);
	console.log(name2.value);
	if(started == true){
		alert("Game already started. Please select reset_play to start over.");
		return -1;
	}
	if((name1.value.length <= 0) || (name2.value.length <= 0)){
		alert("You must enter a name for both players to proceed!");
		return -1;
	}else{
		//Append user name with X or O accordingly to update player "moves"
		name1.value = name1.value + (" (X)");
		name2.value = name2.value + (" (O)");
		//Disable further text input in name fields
		name1.disabled = "disabled";
		name2.disabled = "disabled";
		//Update started flag
		started = true;
		//Update whose turn it is onscreen
		turnInfo.innerHTML = "Turn for: X";
	}
}

/*
TODO - Rule 2
This is the second method you'll implement. This method is called when the Reset Play button is clicked.
The method should do all the things as stated in rule 2.
DONE
*/
function reset_play(){
	//variables for easier access
	var name1 = document.getElementById("player1_id");
	var name2 = document.getElementById("player2_id");
	var turnInfo = document.getElementById("turn_info");
	var move = document.getElementById("move_text_id");
	//reset names, disalbed status, turnInfo message, move text box, turn variable and started status to original values
	name1.value = "";
	name2.value = "";
	name1.disabled = false;
	name2.disabled = false;
	turnInfo.innerHTML = "Game has not begun.";
	move.value = "";
	move.disabled = false;
	started = false;
	turn = 1;

	//change board elements to match original display
	document.getElementById("A1").innerHTML = "A1";
	document.getElementById("A2").innerHTML = "A2";
	document.getElementById("A3").innerHTML = "A3"; 
	document.getElementById("B1").innerHTML = "B1";
	document.getElementById("B2").innerHTML = "B2";
	document.getElementById("B3").innerHTML = "B3";
	document.getElementById("C1").innerHTML = "C1";
	document.getElementById("C2").innerHTML = "C2";
	document.getElementById("C3").innerHTML = "C3";
	//reset status table
	statusTable = [-1, -1, -1, -1, -1, -1, -1, -1, -1];
}

/*
TODO - Rule 3
This is the last method you'll implement. This method is called everytime a move has been player( Play button was clicked).
The method should do all the things as stated in rule 2.

8. After all the moves have exhausted, you're not required to display any message. 
	(It should be obvious to Reset play.)<br/>

*/
function play() {

	var valid = false
	var move = document.getElementById("move_text_id");
	var turnInfo = document.getElementById("turn_info");

	//check status of game i.e. started or not started
	if(!started){
		alert("The game has not started!");
		return;
	}
	//iterate through table, check validity of input, check validity of move, make changes to board, update "Turn for: message" and reset move text box
	var i = 0;
	for(i; i < table_ids.length; i++){
		if(move.value == table_ids[i]){
			if((document.getElementById(table_ids[i]).innerHTML != "X") && (document.getElementById(table_ids[i]).innerHTML != "O")){
				valid = true;
				if(whose_move()){
					document.getElementById(table_ids[i]).innerHTML = "X";
					statusTable[i] = 1;
					toggle_move();
					turnInfo.innerHTML = "Turn for: O";
					count = count + 1;
				}else{
					document.getElementById(table_ids[i]).innerHTML = "O";
					statusTable[i] = 0;
					toggle_move();
					turnInfo.innerHTML = "Turn for: X";
					count = count + 1;
				}
				break;
			}
		}
	}
	if(valid == false){
		alert("Invalid move. Moves must correspond to available cells on board.");
		move.value="";
		return;
	}
	move.value="";

	//check status of table
	console.log(statusTable);
	//handle vertical, horizontal and diagonal X wins
	if((statusTable[0] == 1) && (statusTable[1] == 1) && (statusTable[2] == 1)){
		alert("X has won!");
		reset_play();
	}else if((statusTable[3] == 1) && (statusTable[4] == 1) && (statusTable[5] == 1)){
		alert("X has won!");
		reset_play();
	}else if((statusTable[6] == 1) && (statusTable[7] == 1) && (statusTable[8] == 1)){
		alert("X has won!");
		reset_play();
	}else if((statusTable[0] == 1) && (statusTable[3] == 1) && (statusTable[6] == 1)){
		alert("X has won!");
		reset_play();
	}else if((statusTable[1] == 1) && (statusTable[4] == 1) && (statusTable[7] == 1)){
		alert("X has won!");
		reset_play();
	}else if((statusTable[2] == 1) && (statusTable[5] == 1) && (statusTable[8] == 1)){
		alert("X has won!");
		reset_play();
	}else if((statusTable[0] == 1) && (statusTable[4] == 1) && (statusTable[8] == 1)){
		alert("X has won!");
		reset_play();
	}else if((statusTable[2] == 1) && (statusTable[4] == 1) && (statusTable[6] == 1)){
		alert("X has won!");
		reset_play();
	}

		//handle vertical, horizontal and diagonal O wins
	if((statusTable[0] == 0) && (statusTable[1] == 0) && (statusTable[2] == 0)){
		alert("O has won!");
		reset_play();
	}else if((statusTable[3] == 0) && (statusTable[4] == 0) && (statusTable[5] == 0)){
		alert("O has won!");
		reset_play();
	}else if((statusTable[6] == 0) && (statusTable[7] == 0) && (statusTable[8] == 0)){
		alert("O has won!");
		reset_play();
	}else if((statusTable[0] == 0) && (statusTable[3] == 0) && (statusTable[6] == 0)){
		alert("O has won!");
		reset_play();
	}else if((statusTable[1] == 0) && (statusTable[4] == 0) && (statusTable[7] == 0)){
		alert("O has won!");
		reset_play();
	}else if((statusTable[2] == 0) && (statusTable[5] == 0) && (statusTable[8] == 0)){
		alert("O has won!");
		reset_play();
	}else if((statusTable[0] == 0) && (statusTable[4] == 0) && (statusTable[8] == 0)){
		alert("O has won!");
		reset_play();
	}else if((statusTable[2] == 0) && (statusTable[4] == 0) && (statusTable[6] == 0)){
		alert("O has won!");
		reset_play();
	}
	if(count == 9){
		alert("Draw! Play Again!");
		reset_play();
	}
}

/*
Do not change this method.
*/
function moveEnter(event) {		
	if(event.keyCode == 13) {
		event.preventDefault()
		play()
	}

}
