// TO DO:
// Could add score keeping

const {performance} = require('perf_hooks');

class RPSGame {
    // these players are the socket connections
    // arrays would be cleaner
    constructor(player1, player2) {
        this._player1 = player1;
        this._player2 = player2;

        this._player1Choice = null;
        this._player2Choice = null;

        // send messages to both players that the game has started when constructed
        this._sendPlayer1('Time to play Rock Paper Scissors!<br><br>');
        this._sendPlayer2('Time to play Rock Paper Scissors!<br><br>');

        // event listener for player1 choice
        this._player1.on('choice', (choice) => {
            var t12 = performance.now();
            this._onChoiceP1(choice);
            var t13 = performance.now();
            console.log("_onChoiceP1() execution time: " + (t13 - t12) + " ms.");
        });

        // event listener for player2 choice
        this._player2.on('choice', (choice) => {
            var t14 = performance.now();
            this._onChoiceP2(choice);
            var t15 = performance.now();
            console.log("_onChoiceP2() execution time: " + (t15 - t14) + " ms.");
        });
    }

    // send message to the player1
    _sendPlayer1(text) {
        this._player1.emit('message', text);
    }

    // send message to the player2
    _sendPlayer2(text) {
        this._player2.emit('message', text);
    }

    // feedback for players to know that their choice was registered
    _onChoiceP1(choice) {
        this._player1Choice = choice;
        this._player2.emit('opponentChose', choice);
        this._player1.emit('hide');
        this._player2.emit('hide');
        this._sendPlayer1(`You chose ${choice}.`);

        var t6 = performance.now();
        this._endGame();
        var t7 = performance.now();
        console.log("_endGame() execution time: " + (t7 - t6) + " ms.");
    }

    _onChoiceP2(choice) {
        this._player2Choice = choice;
        this._player1.emit('opponentChose', choice);
        this._player2.emit('hide');
        this._player1.emit('hide');
        this._sendPlayer2(`You chose ${choice}.`);

        var t6 = performance.now();
        this._endGame();
        var t7 = performance.now();
        console.log("_endGame() execution time: " + (t7 - t6) + " ms.");
    }

    _winConditions(choice1, choice2) {
        // Game is a draw
        if (choice1 == choice2) {
            this._sendPlayer1('Game is a draw!');
            this._sendPlayer2('Game is a draw!');
        }

        // Player1 wins
        if ((choice1 + choice2 == 'RockScissors') || (choice1 + choice2 == 'PaperRock') || (choice1 + choice2 == 'ScissorsPaper')) {
            this._sendPlayer1('You win!');
            this._sendPlayer2('You lose!');
        }

        // Player2 wins
        if ((choice2 + choice1 == 'RockScissors') || (choice2 + choice1 == 'PaperRock') || (choice2 + choice1 == 'ScissorsPaper')) {
            this._sendPlayer2('You win!');
            this._sendPlayer1('You lose!');
        }
    }

    _endGame() {
        const choice1 = this._player1Choice;
        const choice2 = this._player2Choice;

        if (choice1 && choice2) {
            this._player1.emit('show');
            this._player2.emit('show');

            this._sendPlayer1(choice1 + ' vs ' + choice2 + ' : Game over!');
            this._sendPlayer2(choice2 + ' vs ' + choice1 + ' : Game over!');

            var t8 = performance.now();
            this._winConditions(choice1, choice2);
            var t9 = performance.now();
            console.log("_winConditions() execution time: " + (t9 - t8) + " ms.");

            this._player1Choice = null;
            this._player2Choice = null;

            this._sendPlayer1('Play again?<br><br>');
            this._sendPlayer2('Play again?<br><br>');
        }
    }
}

module.exports = RPSGame;
