import React, { useEffect, useRef, useState, Suspense } from "react";
// import { getCats, catsSelector, Cat } from "../../features/cat/catsSlice";
// import { useSelector, useDispatch } from "react-redux";
import { ICard, Cards, ResponseData } from "../../features/cards/cardsSlice";
import { cacheImages } from "../utils/cache/loadImage";

import Card from "./Card";
import Timer from "./Timer";
import DiffButtons from "./DiffButtons";
import Loader from "../utils/Loader";

import { useNavigate } from "react-router-dom";
import API from "../../http-common";

import "./game.css";

export enum Levels {
  easy = 90,
  medium = 60,
  hard = 30,
}

export enum Highlights {
  green = "green-highlight",
  red = "red-highlight",
  none = "",
}

const GameView: React.FC = (): JSX.Element => {
  const [cards, setCards] = useState<Cards>([]);
  const [gameStart, setGameStart] = useState<boolean>(false);
  const [gameTimer, setGameTimer] = useState<number>(Levels.easy);
  const [firstChoice, setFirstChoice] = useState<ICard | null>(null);
  const [secondChoice, setSecondChoice] = useState<ICard | null>(null);
  const [highlight, setHighlight] = useState<string>("");
  const [score, setScore] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const highScore: number = cards.length / 2;

  const navigate = useNavigate();

  const timer: { current: NodeJS.Timeout | null } = useRef(null);

  useEffect(() => {
    checkGameEnd();
    gameLogic();

    return () => {
      timer.current && clearTimeout(timer.current);
    };
  }, [firstChoice, secondChoice, cards]);

  const clearChoices = (): void => {
    setFirstChoice(null);
    setSecondChoice(null);
  };

  const checkGameEnd = () => {
    if (cards.length !== 0) {
      if (score === highScore) {
        navigate(`/score?points=${score}`);
      }
    }
  };

  const startGame = (difficulty: Levels): void => {
    setLoading(true);
    setGameTimer(difficulty);
    fetchCards();
  };

  const gameLogic = (): void => {
    if (firstChoice && secondChoice) {
      if (firstChoice.url === secondChoice.url) {
        setHighlight(Highlights.green);
        setScore((prev) => prev + 1);

        const matchedCards: Cards = JSON.parse(JSON.stringify(cards));
        matchedCards.forEach((card: ICard) => {
          if (card.url === firstChoice.url) {
            return (card.matched = true);
          }
        });

        timer.current = setTimeout(() => {
          clearChoices();
          setHighlight(Highlights.none);
          setCards(matchedCards);
        }, 1000);
      } else {
        setHighlight(Highlights.red);

        const flippedCards: Cards = JSON.parse(JSON.stringify(cards));
        flippedCards.forEach((card: ICard) => {
          if (card.flipped) {
            return (card.flipped = false);
          }
        });

        timer.current = setTimeout(() => {
          clearChoices();
          setHighlight(Highlights.none);
          setCards(flippedCards);
        }, 1000);
      }
    }
  };

  const fetchCards = (): void => {
    if (cards.length === 0) {
      API.get<Array<ResponseData>>(
        "/images/search?limit=9&size=small&order=random"
      ).then((response) => {
        const cards = response.data.map(({ id, url, ...rest }) => {
          return { id, url };
        });
        shuffleCards(cards);
        cacheImages(
          cards.map(({ url }) => {
            return url;
          })
        );
        setLoading(false);
        setGameStart(true);
      });
    }
  };

  const shuffleCards = (deck: Array<ResponseData>): void => {
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
  };

  const renderCards = () => {
    return cards.map((card) => (
      <Card
        key={card.id}
        card={card}
        highlight={highlight}
        firstChoice={firstChoice}
        setFirstChoice={setFirstChoice}
        secondChoice={secondChoice}
        setSecondChoice={setSecondChoice}
      />
    ));
  };

  return (
    <>
      {!gameStart ? (
        <div className="center-container">
          {loading ? <Loader /> : <DiffButtons startGame={startGame} />}
        </div>
      ) : (
        <Suspense
          fallback={
            <div className="center-container">
              <Loader />
            </div>
          }
        >
          <div className="score-bar">
            <div className="col-3">
              <button onClick={() => window.location.reload()}>
                <i className="fa fa-refresh fa-2x" aria-hidden="true"></i>
              </button>
            </div>
            <div className="score">{`${score} / ${highScore}`}</div>
            <Timer time={gameTimer} score={score} />
          </div>

          <div className="container cards-container">{renderCards()}</div>
        </Suspense>
      )}
    </>
  );
};

export default GameView;
