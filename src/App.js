import { useEffect, useState } from 'react';
import Wordle from './components/Wordle';

const App = () => {
    const [solution, setSolution] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const api = await fetch('http://localhost:3001/solutions');
            const json = await api.json();
            const randomSolution = json[Math.floor(Math.random() * json.length)];

            setSolution(randomSolution.word);
        };

        fetchData();
    }, [setSolution]);

    return (
        <div className='App'>
            <h1>Wordle (Lingo)</h1>
            {solution && <Wordle solution={solution} />}
        </div>
    );
};

export default App;
