import React from 'react';
import Game from './components/Game';

function App() {
	return (
		<div className='App'>
			<Game />
			<a
				href='https://github.com/dheeraj-murali/memory-cards'
				className='btn'
				target='_blank'
				rel='noopener noreferrer'
			>
				View on GitHub
			</a>
		</div>
	);
}

export default App;
