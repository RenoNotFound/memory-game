import React, { useEffect, useRef, useState } from "react";
import { getCats, catsSelector, Cat } from "../../features/cat/catsSlice";
import { useSelector, useDispatch } from "react-redux";
import { ICard, Cards } from "../../features/cards/cardsSlice";

import Card from "./Card";

import "./game.css";

const urlsState = [
  {
    id: "1",
    url: "https://25.media.tumblr.com/tumblr_lrztqbupaJ1qdvbl3o1_250.jpg",
    matched: false,
  },
  {
    id: "2",
    url: "https://24.media.tumblr.com/tumblr_lg4lgybLpl1qfyzelo1_250.jpg",
    matched: false,
  },
  {
    id: "3",
    url: "https://24.media.tumblr.com/tumblr_m4224an9du1qf6rpvo1_250.jpg",
    matched: false,
  },
  {
    id: "4",
    url: "https://25.media.tumblr.com/tumblr_m2hz8rDh5x1qejbiro1_250.jpg",
    matched: false,
  },
  {
    id: "5",
    url: "https://30.media.tumblr.com/tumblr_m39bdvYka41rtuomto1_250.jpg",
    matched: false,
  },
  {
    id: "6",
    url: "https://cdn2.thecatapi.com/images/O2Xx5d4rV.jpg",
    matched: false,
  },
  {
    id: "7",
    url: "https://cdn2.thecatapi.com/images/NoQGHgPl7.jpg",
    matched: false,
  },
  {
    id: "8",
    url: "https://cdn2.thecatapi.com/images/YoyBUBch0.png",
    matched: false,
  },
  {
    id: "9",
    url: "https://cdn2.thecatapi.com/images/FPfhE8CWq.jpg",
    matched: false,
  },
];

const GameView: React.FC = (): JSX.Element => {
  const [cards, setCards] = useState<Cards>(urlsState);
  const [greenHighlight, setGreenHighlight] = useState<string>("");
  const [firstChoice, setFirstChoice] = useState<ICard | null>(null);
  const [secondChoice, setSecondChoice] = useState<ICard | null>(null);
  const [startGame, setStartGame] = useState<boolean>(false);

  const dispatch = useDispatch();
  const { cats, isLoading, error } = useSelector(catsSelector);

  const timer: { current: NodeJS.Timeout | null } = useRef(null);

  useEffect(() => {
    if (firstChoice && secondChoice) {
      if (firstChoice.url === secondChoice.url) {
        console.log("match");
        setGreenHighlight("green-highlight");
        const newCards = JSON.parse(JSON.stringify(cards));
        newCards.forEach((card: ICard) => {
          if (card.url === firstChoice.url) {
            return (card.matched = true);
          }
        });
        timer.current = setTimeout(() => {
          clearChoices();
          setGreenHighlight("");
          setCards(newCards);
        }, 1000);
      } else {
        console.log("no match");
        timer.current = setTimeout(() => {
          clearChoices();
        }, 1000);
      }
    }

    return () => {
      timer.current && clearTimeout(timer.current);
    };
  }, [firstChoice, secondChoice, cards]);

  const clearChoices = (): void => {
    setFirstChoice(null);
    setSecondChoice(null);
  };

  const shuffleCards = (): void => {
    const cardsCopy: Cards = JSON.parse(JSON.stringify(cards));
    cardsCopy.forEach((card) => {
      return (card.id = String(Number(card.id) + cardsCopy.length));
    });

    const tempCards: Cards = [...cards, ...cardsCopy];
    const length = tempCards.length;

    for (let i = length; i > 0; i--) {
      const randomIndex = Math.floor(Math.random() * i);
      const currentIndex = i - 1;
      const temp = tempCards[currentIndex];
      tempCards[currentIndex] = tempCards[randomIndex];
      tempCards[randomIndex] = temp;
    }

    setCards(tempCards);
    setStartGame(true);
  };

  const renderCards = () => {
    return cards.map((card) => (
      <Card
        key={card.id}
        card={card}
        greenHighlight={greenHighlight}
        matched={card.matched}
        firstChoice={firstChoice}
        setFirstChoice={setFirstChoice}
        secondChoice={secondChoice}
        setSecondChoice={setSecondChoice}
        flipped={card === firstChoice || card === secondChoice || card.matched}
      />
    ));
  };

  return (
    <div className="container cards-container">
      {!startGame ? (
        <button className="btn-start-game" onClick={shuffleCards}>
          Start
        </button>
      ) : (
        <>{renderCards()}</>
      )}
    </div>
  );
};

export default GameView;
