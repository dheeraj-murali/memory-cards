import React, { useState } from 'react';
import Cards from './Cards';

function Game() {
	const [gameStart, setGameStart] = useState(false);
	const [gameOver, setGameOver] = useState(false);

	return (
		<div className='game-container'>
			<div
				className={gameStart ? 'overlay hidden' : 'overlay'}
				onClick={() => {
					if (!gameStart) {
						setGameStart(true);
					}
				}}
			></div>
			<Cards
				gameStart={gameStart}
				gameOver={gameOver}
				setGameOver={setGameOver}
				setGameStart={setGameStart}
			/>
		</div>
	);
}

export default Game;
