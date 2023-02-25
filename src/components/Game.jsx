import React from "react";
import { useState, useEffect, useRef } from "react";
import "./Game.css";



function Game() {
  const [pixelSize, setPixelSize] = useState(5);
  const [pixelCount, setpixelCount] = useState(128);
  const [currentColor, setCurrentColor] = useState(0);
  const canvasRef = useRef(null);
  const ws = new WebSocket("ws://13.38.113.187:80");
  const colors = [
    "#000000",
    "#ffffff",
    "#c2c3c7",
    "#7f7f7f",
    "#ff0000",
    "#ffa500",
    "#ffff00",
    "#008000",
    "#98fb98",
    "#0000ff",
    "#4b0082",
    "#ff00ff",
    "#800000",
    "#a0522d",
    "#a0522d",
    "#ff69b4",
  ];

useEffect(() => {
    ws.onmessage = function (e) {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const data = JSON.parse(e.data);

    Object.entries(data).forEach(([key, values]) => {
      values.forEach((id) => {
        ctx.beginPath();
        ctx.fillStyle = colors[key];
        ctx.fillRect(
          (id % pixelCount) * pixelSize,
          ((id / pixelCount) >> 0) * pixelSize,
          pixelSize,
          pixelSize
        );
        ctx.stroke();
      });
    });
  };
}, [canvasRef, pixelCount, pixelSize])

  const handleCanvasClick = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const pixelX = Math.floor(x / pixelSize);
    const pixelY = Math.floor(y / pixelSize);
    const id = pixelY * pixelCount + pixelX;

    ws.send(`{"${currentColor}":[${id}]}`);
  };

  return (
    <>
      <div className="main">
        <div className="game">
          <canvas
            ref={canvasRef}
            width="640"
            height="640"
            onClick={handleCanvasClick}
          ></canvas>
          <div className="colorsRow">
            <div className="allColors">
              {colors.map((color, i) => (
                <div
                  key={i}
                  onClick={() => setCurrentColor(i)}
                  style={{ backgroundColor: color }}
                ></div>
              ))}
            </div>
            <div
              className="selectedColor"
              style={{ backgroundColor: colors[currentColor] }}
            ></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Game;
