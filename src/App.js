import React from 'react';
import Game from './components/Game';

function App() {
	return (
		<div className='App'>
			<Game />
			<a
				href='https://github.com/dheeraj-murali/memory-cards/issues'
				className='btn btn-small'
				target='_blank'
				rel='noopener noreferrer'
			>
				View on Github
			</a>
			<span className='version'>v0.8.6</span>
		</div>
	);
}

export default App;
