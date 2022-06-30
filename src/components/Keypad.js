import React, { useEffect, useState } from 'react';

const Keypad = ({ usedKeys }) => {
    const [letters, setLetters] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('http://localhost:3001/letters');
            const data = await response.json();

            setLetters(data);
        };

        fetchData();
    }, []);

    return (
        <div className='keypad'>
            {letters &&
                letters.map((letter) => {
                    const color = usedKeys[letter.key];
                    return (
                        <div key={letter.key} className={color}>
                            {letter.key}
                        </div>
                    );
                })}
        </div>
    );
};

export default Keypad;
