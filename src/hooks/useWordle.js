import { useState } from 'react';

const useWordle = (solution) => {
    const [turn, setTurn] = useState(0);
    const [currentGuess, setCurrentGuess] = useState('');
    const [guesses, setGuesses] = useState([...Array(6)]);
    const [history, setHistory] = useState([]);
    const [isCorrect, setIsCorrect] = useState(false);

    const formatGuess = () => {
        let solutionArray = [...solution];
        let formattedGuess = [...currentGuess].map((letter) => {
            return { key: letter, color: 'grey' };
        });

        formattedGuess.forEach((letter, index) => {
            if (solutionArray[index] === letter.key) {
                formattedGuess[index].color = 'green';
                solutionArray[index] = null;
            }
        });

        formattedGuess.forEach((letter, index) => {
            if (solutionArray.includes(letter.key) && letter.color !== 'green') {
                formattedGuess[index].color = 'yellow';
                solutionArray[solutionArray.indexOf(letter.key)] = null;
            }
        });

        return formattedGuess;
    };

    const addNewGuess = (formatted) => {
        if (currentGuess === solution) {
            setIsCorrect(true);
        }

        setGuesses((prevGuesses) => {
            let newGuess = [...prevGuesses];
            newGuess[turn] = formatted;

            return newGuess;
        });

        setHistory((prevHistory) => {
            return [...prevHistory, currentGuess];
        });

        setTurn((prevTurn) => {
            return prevTurn + 1;
        });

        setCurrentGuess('');
    };

    const handleKeyUp = ({ key }) => {
        if (key === 'Enter') {
            if (turn > 5) {
                console.log('u used all the guesses');
                return;
            }

            if (history.includes(currentGuess)) {
                console.log('u aleready tried that word');
                return;
            }

            if (currentGuess.length !== 5) {
                console.log("u didn't enter a 5 letter word");
                return;
            }

            const formatted = formatGuess();
            addNewGuess(formatted);
        }

        if (key === 'Backspace') {
            setCurrentGuess((prev) => {
                return prev.slice(0, -1);
            });
            return;
        }

        if (/^[A-Za-z]$/.test(key)) {
            if (currentGuess.length < 5) {
                setCurrentGuess((prev) => {
                    return prev + key;
                });
            }
        }
    };

    return { turn, currentGuess, guesses, isCorrect, handleKeyUp };
};

export default useWordle;
