import './App.css';
import React, { useState, useEffect, useRef } from 'react';

interface Card {
  id: string;
  match: string;
  matched: boolean;
  open: boolean;
}

let cards: Card[] = [
  {
    id: '0001',
    match: 'heart',
    matched: false,
    open: false,
  },
  {
    id: '0002',
    match: 'star',
    matched: false,
    open: false,
  },
  {
    id: '0003',
    match: 'wave',
    matched: false,
    open: false,
  },
  {
    id: '0004',
    match: 'heart',
    matched: false,
    open: false,
  },
  {
    id: '0005',
    match: 'star',
    matched: false,
    open: false,
  },
  {
    id: '0006',
    match: 'wave',
    matched: false,
    open: false,
  },
];

const TOTAL_CARDS_TO_MATCH = 2;

function App() {
  const mounted = useRef(false);
  const [cardList, setCardList] = useState(cards);
  const [cardsToMatch, setCardsToMatch] = useState([] as Card[]);

  const handleCardsSelected = (cardSelected: Card) => {
   setCardList(cardList.map((card) => setCardOpen(cardSelected.id === card.id, card)));
    setCardsToMatch([...cardsToMatch, cardSelected]);
  }

  useEffect(() => {
    if (!mounted.current) {
      shuffleCards(cards);
      mounted.current = true;
    } else {
      if(cardsToMatch.length === TOTAL_CARDS_TO_MATCH) {
        handleCardsWhenTryMatch();
      }
      handleCardsWhenFinish();
    }
  });

  function shuffleCards(cards: Card[]) {
    var m = cardList.length, t, i;
    // While there remain elements to shuffle…
    while (m) {
      // Pick a remaining element…
      i = Math.floor(Math.random() * m--);
      // And swap it with the current element.
      t = cards[m];
      cards[m] = cards[i];
      cards[i] = t;
    }
    return setCardList([...cards]);
  }


  const setCardOpen = (openCard: boolean, card: Card): Card => (openCard ? {...card, open: true} : card);
  const matchCard = (isMatched: boolean, card: Card): Card => (isMatched ? {...card, matched: true} : card);
  const handleCardsWhenTryMatch = () => {
    setCardList(
      cardList.map((card) =>  {
        if(cardsToMatch[0].match === cardsToMatch[1].match) {
          const isCardMatched: boolean = !!cardsToMatch.find((cardMatched) =>  card.id === cardMatched.id);
          return matchCard(isCardMatched, card);
        } else {
          return {...card, open: false, matched: false}
        }
      }),
    );
    setCardsToMatch([]);
  }
  const handleCardsWhenFinish = () => {
    if(cardList.filter((card) => card.matched).length === cardList.length) {
      alert('Winner!!!');
      shuffleCards(cards)
    }
  }

  const renderListOfCards = () => cardList.map(card => <li className={`App-card-item color--${card.open ? 'lightblue' : ''}`} key={card.id} onClick={() => handleCardsSelected(card)}>{card.match}</li>);
  return (
    <div className="App">
      <ul>
        {renderListOfCards()}
      </ul>
    </div>
  );
}

export default App;
