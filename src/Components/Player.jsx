import{ useState} from "react";

export default function Player({
    initialName,
    symbol,
    isActive,
    onChangeName,
}) {
    // Declare and initialize playerName state variable with initialName prop
    const [playerName, setPlayerName] = useState(initialName);
    // Declare and initialize isEditing state variable
    const [isEditing, setEditing] = useState(false);

    // Define handleEditing function
    function handleEditing() {
        // Toggle isEditing state variable
        setEditing((editing) => !editing);
        // If isEditing state variable is true, call onChangeName function with symbol and playerName as arguments
        if (isEditing) {
            onChangeName(symbol, playerName);
        }
    }

    // Define handleChange function
    function handleChange(event) {
        // Update playerName state variable with input value
        setPlayerName(event.target.value);
    }

    // Declare and initialize editablePlayerName variable with current playerName value
    let editablePlayerName = <span className="player-name">{playerName}</span>;

    // If isEditing state variable is true, replace playerName span with input field
    if (isEditing) {
        editablePlayerName = (
            <input
                type="text"
                required
                value={playerName}
                onChange={handleChange}
            />
        );
    }

    // Return JSX
    return (
        <li className={isActive ? "active" : undefined}>
            <span className="player">
                {editablePlayerName}
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleEditing}>
                {isEditing ? "Save" : "Edit"}
            </button>
        </li>
    );
}