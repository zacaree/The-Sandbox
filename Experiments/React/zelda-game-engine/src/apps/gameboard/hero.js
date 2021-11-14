import React, { useState, useEffect } from "react";
import styled from "styled-components";
import linkSpriteLeft from "../../assets/link-sprite-left.png";
import linkSpriteRight from "../../assets/link-sprite-right.png";
import linkSpriteDown from "../../assets/link-sprite-down.png";
import linkSpriteUp from "../../assets/link-sprite-up.png";
import useKeyPress from "../../hooks/useKeyPress";
import getNextTile from "../../hooks/getNextTile";

export default function Hero({ boardWidthInPx, gridCellSize, mapLayout }) {
  const [yPos, setYPos] = useState(0);
  const [xPos, setXPos] = useState(0);
  const [isFacing, setIsFacing] = useState("down");

  const pressArrowRight = useKeyPress("ArrowRight");
  const pressArrowLeft = useKeyPress("ArrowLeft");
  const pressArrowUp = useKeyPress("ArrowUp");
  const pressArrowDown = useKeyPress("ArrowDown");

  const commonProperties = {
    mapLayout,
    xPos,
    yPos,
    gridCellSize,
  };

  useEffect(() => {
    if (pressArrowRight && xPos < boardWidthInPx) {
      const nextTile = getNextTile("right", { ...commonProperties });
      if (!nextTile.isSolid) setXPos(xPos + gridCellSize);
      setIsFacing("right");
    }
    if (pressArrowLeft && xPos > 0) {
      const nextTile = getNextTile("left", { ...commonProperties });
      if (!nextTile.isSolid) setXPos(xPos - gridCellSize);
      setIsFacing("left");
    }
    if (pressArrowUp && yPos > 0) {
      const nextTile = getNextTile("up", { ...commonProperties });
      if (!nextTile.isSolid) setYPos(yPos - gridCellSize);
      setIsFacing("up");
    }
    if (pressArrowDown && yPos < boardWidthInPx) {
      const nextTile = getNextTile("down", { ...commonProperties });
      if (!nextTile.isSolid) setYPos(yPos + gridCellSize);
      setIsFacing("down");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    pressArrowRight,
    pressArrowLeft,
    pressArrowUp,
    pressArrowDown,
    boardWidthInPx,
    gridCellSize,
  ]);

  return (
    <HeroComponent gridCellSize={gridCellSize} xPos={xPos} yPos={yPos}>
      {isFacing === "down" && <HeroImg src={linkSpriteDown} />}
      {isFacing === "up" && <HeroImg src={linkSpriteUp} />}
      {isFacing === "right" && <HeroImg src={linkSpriteRight} />}
      {isFacing === "left" && <HeroImg src={linkSpriteLeft} />}
    </HeroComponent>
  );
}

const HeroComponent = styled.div`
  position: absolute;
  width: ${(props) => props.gridCellSize}px;
  height: ${(props) => props.gridCellSize}px;
  transition: transform 300ms ease-out;
  transform: translate3d(
    ${(props) => props.xPos}px,
    ${(props) => props.yPos}px,
    0
  );
`;

const HeroImg = styled.img`
  width: 100%;
  height: 100%;
`;
