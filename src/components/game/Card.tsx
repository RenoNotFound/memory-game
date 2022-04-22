import React from "react";
import {
  ICard,
  //   activeCardsSelector,
  //   addActiveCard,
  //   resetActiveCards,
} from "../../features/cards/cardsSlice";
// import { useSelector, useDispatch } from "react-redux";

import "./game.css";

interface CardProps {
  card: ICard;
  matched: boolean;
  flipped: boolean;
  greenHighlight: string;
  redHighlight: string;
  firstChoice: ICard | null;
  secondChoice: ICard | null;
  setFirstChoice: React.Dispatch<React.SetStateAction<ICard | null>>;
  setSecondChoice: React.Dispatch<React.SetStateAction<ICard | null>>;
}

const Card: React.FC<CardProps> = ({
  card,
  flipped,
  greenHighlight,
  redHighlight,
  firstChoice,
  secondChoice,
  setFirstChoice,
  setSecondChoice,
}): JSX.Element => {
  const handleClick = (): void => {
    if (!(firstChoice && secondChoice)) {
      if (card !== firstChoice) {
        firstChoice ? setSecondChoice(card) : setFirstChoice(card);
      }
    }
  };

  return (
    <div className="cards-container" onClick={handleClick}>
      {flipped ? (
        <img
          className={`${greenHighlight} ${redHighlight} ${
            card.matched ? "hidden" : ""
          }`}
          src={card.url}
          alt="cats"
          width="150"
          height="150"
        />
      ) : (
        <img src="/back-img.png" alt="cats" width="150" height="150" />
      )}
    </div>
  );
};

export default Card;
