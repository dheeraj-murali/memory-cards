import React, { useReducer } from 'react';
import Cards from './Cards';

const initialState = {
	gameStart: false,
	gameOver: false,
	gameReset: false,
};

const reducer = (state, action) => {
	switch (action.type) {
		case 'START':
			return {
				...state,
				gameStart: action.payload,
			};
		case 'OVER':
			return {
				...state,
				gameOver: action.payload,
			};
		case 'RESET':
			return {
				...state,
				gameReset: action.payload,
			};
		case 'RESTART':
			return {
				...state,
				gameStart: false,
				gameOver: false,
				gameReset: false,
			};
		default:
			return state;
	}
};

function Game() {
	const [state, dispatch] = useReducer(reducer, initialState);

	return (
		<div className='game-container'>
			<div
				className={state.gameStart ? 'overlay hidden' : 'overlay'}
				onClick={() => {
					if (!state.gameStart) {
						dispatch({ type: 'START', payload: true });
					}
				}}
			></div>
			{state.gameReset ? (
				<button
					className='btn btn-big'
					onClick={() => dispatch({ type: 'RESTART' })}
				>
					Play Again
				</button>
			) : (
				<Cards state={state} dispatch={dispatch} />
			)}
		</div>
	);
}

export default Game;
