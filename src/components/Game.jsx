import React from "react";
import { useState, useEffect, useRef } from "react";

const url = "http://13.38.113.187/grid/";
const updateUrl = "http://13.38.113.187/color";

function Game() {
  const [timeLastUpdate, setTimeLastUpdate] = useState(0);
  const [pixelSize, setPixelSize] = useState(10);
  const [pixelCount, setpixelCount] = useState(64);
  const [currentColor, setCurrentColor] = useState("#000000");
  const canvasRef = useRef(null);

  const updateGrid = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    fetch(url + timeLastUpdate)
      .then((res) => res.json())
      .then((data) => {
        setTimeLastUpdate(data.time_last_update);

        data.tiles.forEach((tile) => {
          ctx.beginPath();
          ctx.fillStyle = tile?.tile_color ? `#${tile.tile_color}` : "#FFFFFF";
          ctx.fillRect(
            (tile.tile_id % pixelCount) * pixelSize,
            ((tile.tile_id / pixelCount) >> 0) * pixelSize,
            pixelSize,
            pixelSize
          );
          ctx.stroke();
        });
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      updateGrid();
    }, 500);

    return () => clearInterval(intervalId);
  }, []);

  const handleCanvasClick = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const pixelX = Math.floor(x / pixelSize);
    const pixelY = Math.floor(y / pixelSize);
    const id = pixelY * pixelCount + pixelX;

    const updatePixel = {
      id,
      color: currentColor.substr(1),
    };
    fetch(updateUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatePixel),
    }).then((res) => {
      if (res.ok) {
        updateGrid();
      }
    });
  };

  return (
    <>
      <header className="header">
        <h1>Hackafor IRB & ERDD</h1>
      </header>
      <div className="main">
        <div className="settings">
          <input
            onInput={(e) => setCurrentColor(e.target.value)}
            type="color"
            id="colorPicker"
          />
        </div>
        <canvas
          ref={canvasRef}
          width="640"
          height="640"
          onClick={handleCanvasClick}
        ></canvas>
      </div>
    </>
  );
}

export default Game;
