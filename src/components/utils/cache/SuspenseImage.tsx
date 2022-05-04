import React from "react";
import loadImage from "./loadImage";

interface SuspenseImageProps {
  src: string;
  highlight: string;
  matched?: boolean;
}

const SuspenseImage: React.FC<SuspenseImageProps> = ({
  src,
  highlight,
  matched,
}): JSX.Element => {
  loadImage(src).read();
  return (
    <img
      className={`${highlight} ${matched ? "hidden" : ""}`}
      src={src}
      alt=""
    />
  );
};

export default SuspenseImage;
