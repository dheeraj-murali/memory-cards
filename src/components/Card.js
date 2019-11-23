import React from 'react';

function Card({ icon, hidden, handelCardClick, removed }) {
	return removed ? (
		<div className='card'></div>
	) : (
		<div className='card' onClick={handelCardClick}>
			<div className={!hidden ? 'card-inner card-flip' : 'card-inner'}>
				<div className='card-front'></div>
				<div className='card-back'>{icon}</div>
			</div>
		</div>
	);
}

export default Card;
