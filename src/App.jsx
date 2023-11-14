// Import section here
import { useState } from "react";
import Player from "./Components/Player.jsx";
import GameBoard from "./Components/GameBoard.jsx";
import Log from "./Components/Log.jsx";
import { WINNING_COMBINATIONS } from "./Components/Winning-Combinations";
import GameOver from "./Components/GameOver.jsx";

// Creating a variable for displaying players name Dynamically
const PLAYERS = {
    X: "Player1",
    O: "Player2",
};

// Creating a multidimensional arrays or matrix for making game board
const initialGameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
];

//  creating a function which shows who is playing currently or active player.
function deriveActivePlayer(gameTurns) {
    let currentPlayer = "X";

    if (gameTurns.length > 0 && gameTurns[0].player === "X") {
        currentPlayer = "O";
    }
    return currentPlayer;
}

// Creating a function which can store the game turns or player history
function deriveGameBoard(gameTurns) {
    // Create deep copy of initial game board
    let gameBoard = [...initialGameBoard.map((array) => [...array])];

    // Iterate through game turns
    for (const turn of gameTurns) {
        const { square, player } = turn;
        const { row, col } = square;

        // Update game board with player move
        gameBoard[row][col] = player;
    }
    return gameBoard;
}

//  Creating a function for finding the winner.
function deriveWinner(gameBoard, Players) {
    // initialize winner as undefined
    let winner;

    // iterate through each winning combination
    for (const combination of WINNING_COMBINATIONS) {
        // get the symbols of the three squares in the current combination
        const firstSquareSymbol =
            gameBoard[combination[0].row][combination[0].column];
        const secondSquareSymbol =
            gameBoard[combination[1].row][combination[1].column];
        const thirdSquareSymbol =
            gameBoard[combination[2].row][combination[2].column];

        // check if all three squares have the same symbol
        if (
            firstSquareSymbol &&
            firstSquareSymbol === secondSquareSymbol &&
            secondSquareSymbol === thirdSquareSymbol
        ) {
            // set the winner to the player who has the same symbol
            winner = Players[firstSquareSymbol];
        }
    }

    // return the winner
    return winner;
}

function App() {
    // Define players state
    const [Players, setPlayers] = useState(PLAYERS);

    // Define game turns state
    const [gameTurns, setGameTurns] = useState([]);

    // Get active player based on game turns
    const ActivePlayer = deriveActivePlayer(gameTurns);

    // Get game board configuration based on game turns
    const gameBoard = deriveGameBoard(gameTurns);

    // Determine game winner
    const winner = deriveWinner(gameBoard, Players);

    // Check for a draw
    const hasDraw = gameTurns.length === 9 && !winner;

    // Handle square selection
    function handleSelectSquare(rowIndex, colIndex) {
        setGameTurns((prevTurns) => {
            const currentPlayer = deriveActivePlayer(prevTurns);
            const updatedTurns = [
                {
                    square: { row: rowIndex, col: colIndex },
                    player: currentPlayer,
                },
                ...prevTurns,
            ];
            return updatedTurns;
        });
    }

    // Below function used to restart the game
    function handleRestart() {
        setGameTurns([]);
    }
    // This function is used to display the player name instead of symbol.
    function handlePlayerNameChange(symbol, newName) {
        setPlayers((prevPlayers) => {
            return {
                ...prevPlayers,
                [symbol]: newName,
            };
        });
    }
    return (
        <main>
            <div id="game-container">
                <ol id="players" className="highlight-player">
                    <Player
                        initialName={PLAYERS.X}
                        symbol="X"
                        isActive={ActivePlayer === "X"}
                        onChangeName={handlePlayerNameChange}
                    />
                    <Player
                        initialName={PLAYERS.O}
                        symbol="O"
                        isActive={ActivePlayer === "O"}
                        onChangeName={handlePlayerNameChange}
                    />
                </ol>
                {(winner || hasDraw) && (
                    <GameOver winner={winner} onRestart={handleRestart} />
                )}
                <GameBoard
                    onSelectSquare={handleSelectSquare}
                    board={gameBoard}
                />
            </div>
            <Log turns={gameTurns} />
        </main>
    );
}

export default App;
