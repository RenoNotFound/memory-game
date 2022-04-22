import React, { useEffect, useRef, useState } from "react";
// import { getCats, catsSelector, Cat } from "../../features/cat/catsSlice";
// import { useSelector, useDispatch } from "react-redux";
import { ICard, Cards } from "../../features/cards/cardsSlice";

import Card from "./Card";
import Timer from "./Timer";

import { useNavigate } from "react-router-dom";
import API from "../../http-common";

import "./game.css";

export enum Levels {
  easy = 90,
  medium = 60,
  hard = 30,
}

const GameView: React.FC = (): JSX.Element => {
  const [cards, setCards] = useState<Cards>([]);
  const [startGame, setStartGame] = useState<boolean>(false);
  const [gameTimer, setGameTimer] = useState<number>(Levels.easy);
  const [firstChoice, setFirstChoice] = useState<ICard | null>(null);
  const [secondChoice, setSecondChoice] = useState<ICard | null>(null);
  const [greenHighlight, setGreenHighlight] = useState<string>("");
  const [redHighlight, setRedHighlight] = useState<string>("");
  const [score, setScore] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const timer: { current: NodeJS.Timeout | null } = useRef(null);

  useEffect(() => {
    if (cards.length !== 0) {
      if (score === cards.length / 2) {
        navigate(`/score?points=${score}`);
      }
    }

    if (firstChoice && secondChoice) {
      if (firstChoice.url === secondChoice.url) {
        setGreenHighlight("green-highlight");
        setScore((prev) => prev + 1);

        const matchedCards = JSON.parse(JSON.stringify(cards));
        matchedCards.forEach((card: ICard) => {
          if (card.url === firstChoice.url) {
            return (card.matched = true);
          }
        });

        timer.current = setTimeout(() => {
          clearChoices();
          setGreenHighlight("");
          setCards(matchedCards);
        }, 1000);
      } else {
        setRedHighlight("red-highlight");

        timer.current = setTimeout(() => {
          clearChoices();
          setRedHighlight("");
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

  const fetchCards = (difficulty: Levels): void => {
    setGameTimer(difficulty);
    setLoading(true);
    if (cards.length === 0) {
      setLoading(true);
      API.get<Cards>("/images/search?limit=9&size=small&order=random").then(
        (response) => {
          shuffleCards(response.data);
          setLoading(false);
        }
      );
    }
  };

  const shuffleCards = (deck: Cards): void => {
    const deckCopy: Cards = JSON.parse(JSON.stringify(deck));
    deckCopy.forEach((card) => {
      return (card.id = card.id + "copy");
    });

    const tempCards: Cards = [...deck, ...deckCopy];
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
        redHighlight={redHighlight}
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
    <>
      {!startGame ? (
        <div className="center-container">
          {loading ? (
            <button className="btn-start-game">
              <i className="fa fa-spinner fa-spin fa-xl" aria-hidden="true"></i>
            </button>
          ) : (
            <>
              <button
                className="btn-start-game"
                onClick={() => fetchCards(Levels.easy)}
              >
                Easy
              </button>
              <button
                className="btn-start-game"
                onClick={() => fetchCards(Levels.medium)}
              >
                Medium
              </button>
              <button
                className="btn-start-game"
                onClick={() => fetchCards(Levels.hard)}
              >
                Hard
              </button>
            </>
          )}
        </div>
      ) : (
        <>
          <div className="score-bar">
            <div className="col-3">
              <button onClick={() => window.location.reload()}>
                <i className="fa fa-refresh fa-2x" aria-hidden="true"></i>
              </button>
            </div>
            <div className="score">{`${score} / ${cards.length / 2}`}</div>
            <Timer time={gameTimer} score={score} />
          </div>

          <div className="container cards-container">
            <> {renderCards()}</>
          </div>
        </>
      )}
    </>
  );
};

export default GameView;
