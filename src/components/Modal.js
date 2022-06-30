const Modal = ({ isCorrect, turn, solution }) => {
    return (
        <div className='modal'>
            {isCorrect && (
                <div>
                    <h1>You Win!</h1>
                    <p className='solution'>{solution}</p>
                    <p>Found The Solution In {turn} Guesses :)</p>
                </div>
            )}

            {!isCorrect && (
                <div>
                    <h1>Never Mind!</h1>
                    <h5>
                        The Answer Was: <p className='solution'>{solution}</p>
                    </h5>
                    <p>Better Luck Next Time :(</p>
                </div>
            )}
        </div>
    );
};

export default Modal;
