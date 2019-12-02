import React, { useEffect, useState } from 'react';
import Card from './Card';
import icons from '../config/icons';

function Cards({ state, dispatch }) {
	// shuffle any array
	const shuffle = (array) => {
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[array[i], array[j]] = [array[j], array[i]];
		}

		return array;
	};

	// get random shuffles list of icons
	const [shuffledIcons, setShuffledIcons] = useState(() => shuffle(icons));
	// the set of cards for the game
	const [gameCards, setGameCards] = useState([]);
	// keep track of open cards
	const [openCards, setOpenCards] = useState([]);

	useEffect(() => {
		if (state.gameReset) {
			setShuffledIcons(shuffle(icons));
		}
	}, [state.gameReset]);

	// generate cards for the game [shuffledIcons]
	useEffect(() => {
		// convert card array to object
		const mapCardsToObject = (array) => {
			return array.map((cardIcon, index) => ({
				icon: cardIcon,
				hidden: false,
				key: index,
				removed: false,
			}));
		};

		// generate a pair of 8 cards for the game
		const generateGameCards = (array) => {
			const inGameCards = array.slice(0, 8);
			return shuffle([...inGameCards, ...inGameCards]);
		};

		if (shuffledIcons) {
			const cards = generateGameCards(shuffledIcons);
			const cardsToPlay = mapCardsToObject(cards);
			setGameCards(cardsToPlay);
		}
	}, [shuffledIcons]);

	// turn over all cards when game starts [gameStart]
	useEffect(() => {
		if (state.gameStart) {
			setGameCards((cards) =>
				cards.map((card) => ({
					...card,
					hidden: true,
				}))
			);
		}
	}, [state.gameStart]);

	// keep track of open cards [openCards]
	useEffect(() => {
		// check if cards match
		const checkCardsMatch = () => {
			if (openCards[0].icon === openCards[1].icon) {
				// remove cards
				setGameCards((gameCards) =>
					gameCards.map((card) => {
						if (card.icon === openCards[0].icon) {
							return {
								...card,
								removed: true,
								hidden: true,
							};
						}
						return {
							...card,
							hidden: true,
						};
					})
				);
				// clear open cards array
				setOpenCards([]);
			} else {
				// clear cards array
				setOpenCards([]);
				// fold open cards
				setGameCards((gameCards) =>
					gameCards.map((card) => ({
						...card,
						hidden: true,
					}))
				);
			}
		};

		// if open card length is 2, check if cards match
		if (openCards.length === 2) {
			setTimeout(() => {
				checkCardsMatch();
			}, 1000);
		}
	}, [openCards]);

	// keep track of gameCards [gameCards, setGameOver]
	useEffect(() => {
		const cardsLeft = gameCards.filter((cards) => !cards.removed);
		if (cardsLeft.length === 2) {
			dispatch({ type: 'OVER', payload: true });
		}
	}, [gameCards, dispatch]);

	// when game is over [gameOver]
	useEffect(() => {
		if (state.gameOver) {
			// reveal the last 2 cards
			setGameCards((gameCards) =>
				gameCards.map((card) => ({
					...card,
					hidden: !card.hidden,
				}))
			);

			// remove all cards
			setTimeout(() => {
				setGameCards((gameCards) =>
					gameCards.map((card) => ({
						...card,
						removed: true,
					}))
				);
				dispatch({ type: 'RESET', payload: true });
			}, 1000);
		}
	}, [state.gameOver, dispatch]);

	// when a cards is clicked
	const handelCardClick = (key) => {
		// turn the cards if more than 2 cards is not open
		if (openCards.length < 2) {
			setGameCards((cards) =>
				cards.map((card, index) => {
					if (key === index) {
						return {
							...card,
							hidden: !card.hidden,
						};
					}
					return {
						...card,
					};
				})
			);

			if (!cardPresent(gameCards[key])) {
				// add cards to open list
				setOpenCards([...openCards, gameCards[key]]);
			}
		}
	};

	// check if selected card is present in openCards array
	const cardPresent = (card) => {
		if (openCards.length > 0) {
			if (openCards[0].key === card.key) {
				return true;
			} else {
				return false;
			}
		} else {
			return false;
		}
	};

	return (
		<div className='cards'>
			{gameCards.map((card, index) => (
				<Card
					icon={card.icon}
					hidden={card.hidden}
					key={index}
					removed={card.removed}
					handelCardClick={() => {
						handelCardClick(index);
					}}
				/>
			))}
		</div>
	);
}

export default Cards;
