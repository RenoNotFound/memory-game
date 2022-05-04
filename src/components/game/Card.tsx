import React from "react";
import {
  ICard,
  //   activeCardsSelector,
  //   addActiveCard,
  //   resetActiveCards,
} from "../../features/cards/cardsSlice";
// import { useSelector, useDispatch } from "react-redux";
import SuspenseImage from "../utils/cache/SuspenseImage";

import "./game.css";

interface CardProps {
  card: ICard;
  highlight: string;
  firstChoice: ICard | null;
  secondChoice: ICard | null;
  setFirstChoice: React.Dispatch<React.SetStateAction<ICard | null>>;
  setSecondChoice: React.Dispatch<React.SetStateAction<ICard | null>>;
}

const Card: React.FC<CardProps> = ({
  card,
  highlight,
  firstChoice,
  secondChoice,
  setFirstChoice,
  setSecondChoice,
}): JSX.Element => {
  const handleClick = (): void => {
    if (!(firstChoice && secondChoice)) {
      if (card !== firstChoice) {
        card.flipped = true;
        firstChoice ? setSecondChoice(card) : setFirstChoice(card);
      }
    }
  };

  return (
    <div className="cards-container" onClick={handleClick}>
      {card.flipped ? (
        <SuspenseImage
          src={card.url}
          highlight={highlight}
          matched={card.matched}
        />
      ) : (
        <img
          className={card.matched ? "hidden" : ""}
          src="/back-img.png"
          alt="cats"
          width="150"
          height="150"
        />
      )}
    </div>
  );
};

export default Card;
