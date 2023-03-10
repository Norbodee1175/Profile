import React from "react";
import { useRef, useState, useEffect, useCallback } from "react";
import { TILE_STATUSES, GAME_STATUS } from "./Constants";
import { countMinesAroundTile, findAdjacentTiles, getMinePositions } from "./Utils";
import Tile from "./Tile";

function Board(props) {
  const { size, numberOfMines } = props;
  const [gameStatus, setGameStatus] = useState(GAME_STATUS.RUNNING);
  const [minePositions] = useState(getMinePositions(size, numberOfMines)); // we want to persist this across re-renders
  console.log(minePositions);
  const [minesLeft, setMinesLeft] = useState(numberOfMines);
  const [tiles, setTiles] = useState(() => {
    const values = [];
    for (let i = 0; i < size; i++) {
      const row = [];
      for (let j = 0; j < size; j++) {
        const isMine = isMinePosition({ x: i, y: j });
        row.push({
          status: TILE_STATUSES.HIDDEN,
          isMine,
          text: '',
          coordinates: {x:i, y:j}
        });
      }
      values.push(row);
    }

    return values;
  });

  const boardRef = useRef();

  useEffect(() => {
    checkWin();
    updateMinesLeft();
  }, [tiles]);

  function isMinePosition(pos) {
    return minePositions.some((m) => m.x === pos.x && m.y === pos.y);
  }

  const updateTile = ({x,y}, properties) => {
    setTiles((t) => {
        const newVal = [...t];
        // t.forEach((row) => {
        //   newVal.push([...row]);
        // });

        newVal[x][y] = {
            ...newVal[x][y],
            ...properties
        };
        console.log("updated Tiles", newVal);

        return newVal;
      });
    // forceUpdate();
  }

  const updateTile_orig = ({x,y}, properties) => {
    setTiles((t) => {
        const newVal = [];
        t.forEach((row) => {
          newVal.push([...row]);
        });

        newVal[x][y] = {
            ...newVal[x][y],
            ...properties
        };
        console.log("updated Tiles", newVal);

        return newVal;
      });
    // forceUpdate();
  }

  function checkWin(){
    let countMarked=0, countHidden=0;
    tiles.forEach(row => {
      countMarked = row.reduce((sum, t) => {
         if(t.status === TILE_STATUSES.MARKED){
           return sum+1;
         }else if (t.status === TILE_STATUSES.HIDDEN){
          countHidden++;
         }

         return sum;
       }, countMarked);
    });

    console.log("inside checkWin", {countMarked, countHidden});
    if(countHidden===0 && countMarked == props.numberOfMines){
      setGameStatus(GAME_STATUS.WON)
      // alert("Game Won !!");
    }
  }

  function updateMinesLeft(){
    console.log("updateMinesLeft", tiles);

    let countMarked=0;
   tiles.forEach(row => {
     countMarked = row.reduce((sum, t) => {
        if(t.status === TILE_STATUSES.MARKED){
          return sum+1;
        }

        return sum;
      }, countMarked);
   });

    setMinesLeft(numberOfMines - countMarked);
  }

  const toggleMarkedTile = ({ x, y }) => {
    setTiles((v) => {
      const newVal = [];
      v.forEach((row) => {
        newVal.push([...row]);
      });
      newVal[x][y].status =
        newVal[x][y].status == TILE_STATUSES.MARKED
          ? TILE_STATUSES.HIDDEN
          : TILE_STATUSES.MARKED;

      return newVal;
    });
  };

  useEffect(() => {
    boardRef.current.style.setProperty("--size", size);
  }, []);

  const revealTile = (coordinates) => {
    const {x, y} = coordinates;
    if(tiles[x][y].status === TILE_STATUSES.MINE){
        return;
    }
    if(tiles[x][y].status !== TILE_STATUSES.HIDDEN){ // MARKED or NUMBER tile
        return;
    }

    const adjacentTiles = findAdjacentTiles(coordinates, tiles);
    const countNearbyMines = adjacentTiles.reduce((sum, t) => t.isMine ? sum+1 : sum, 0);
    console.log({adjacentTiles});
    console.log({countNearbyMines});
    if(countNearbyMines === 0){
        updateTile(coordinates, {status: TILE_STATUSES.NUMBER});
         //iterate over every adjacent tile & recursively call revealTile for that tile's coordinates
        adjacentTiles.forEach(tile => {
            // revealTile(tile.coordinates)
            setTimeout(() => revealTile(tile.coordinates), 20)
            //updateTile(tile.coordinates, {status: TILE_STATUSES.NUMBER});
        })
    }else{
        updateTile(coordinates, {status: TILE_STATUSES.NUMBER, text: countNearbyMines});
    }
  }

  const onTileClick = useCallback((e) => {
    e.preventDefault();
    if(gameStatus !== GAME_STATUS.RUNNING){
        return;
    }
    // update status of that tile
    const { target } = e;
    console.log("inside onTileClick", e.type);

    const x = Number(target.getAttribute("data-x"));
    const y = Number(target.getAttribute("data-y"));
    const coordinates = {x,y};

    if(e.type==="contextmenu"){
        toggleMarkedTile(coordinates);
    }else {
        if (isMinePosition(coordinates)) {
            setGameStatus(GAME_STATUS.END);
            // alert("???? BOOM !!");
            return;
        }
        revealTile(coordinates);
    }
  }, [gameStatus]);

  // draw tiles for size * size board
  const drawTiles = () => {
    let tilesJSX = [];
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        const tile = tiles[i][j];
        const props = {};
        if(gameStatus===GAME_STATUS.END || gameStatus===GAME_STATUS.WON){
            props.displayMine=true;
        }

        tilesJSX.push(
          <Tile
            key={i + "-" + j}
            x={i}
            y={j}
            status={tile.status}
            isMine={tile.isMine}
            onClick={onTileClick}
            text={tile.text}
            {...props}
          />
        );
      }
    }

    return tilesJSX;
  }

  return (
    <>
      {/* {gameStatus===GAME_STATUS.RUNNING && <div className="subtext">Mines Left: {minesLeft}</div>}
      {gameStatus===GAME_STATUS.END && <div className="subtext">You lose <button className="newgamebtn" onClick={() => window.location.reload()}>Restart</button> </div>}
      {gameStatus===GAME_STATUS.WON && <div className="subtext">???????? You Win ????????<button className="newgamebtn" onClick={() => window.location.reload()}>Restart</button> </div>} */}
      <button className="newgamebtn" onClick={() => window.location.reload()}>Restart Game</button><br/>
      <div className="board" ref={boardRef}>
        {drawTiles()}
      </div>
    </>
  );
}

export default Board;