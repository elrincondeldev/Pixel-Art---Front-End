import React from "react";
import { useState, useEffect, useRef } from "react";
import "./Game.css";
import { ColorBar } from "./ColorBar";
import Chat from "./Chat";

const ws = new WebSocket("ws://13.38.113.187:80");

function Game() {
  const [pixelCount, setpixelCount] = useState(200);
  const [currentColor, setCurrentColor] = useState(0);
  const canvasRef = useRef(null);
  const colors = [
    "#1a1c2c",
    "#5d275d",
    "#b13e53",
    "#ef7d57",
    "#ffcd75",
    "#a7f070",
    "#38b764",
    "#257179",
    "#29366f",
    "#3b5dc9",
    "#41a6f6",
    "#73eff7",
    "#f4f4f4",
    "#94b0c2",
    "#566c86",
    "#333c57",
  ];
  const [canvasSize, setCanvasSize] = useState(800);
  const canvasInitialSize = 8000;
  const [colorBar, setColorBar] = useState("#1a1c2c");
  const [btnColor, setBtnColor] = useState("#f4f4f4");
  const [overflow, setOverflow] = useState(false)

  useEffect(() => {
    ws.send("33");
    ws.onmessage = function (e) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      const data = JSON.parse(e.data);
      const pixelSize = canvasInitialSize / pixelCount;

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
  }, [canvasRef, pixelCount]);

  const chooseColor = (color) => {
    setColorBar(color);
    if (
      color === "#f4f4f4" ||
      color === "#94b0c2" ||
      color === "#73eff7" ||
      color === "#ffcd75"
    ) {
      setBtnColor("#1a1c2c");
    } else {
      setBtnColor("#f4f4f4");
    }
  };

  const handleCanvasClick = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const pixelSize = canvasSize / pixelCount;
    const pixelX = Math.floor(x / pixelSize);
    const pixelY = Math.floor(y / pixelSize);
    const id = pixelY * pixelCount + pixelX;

    ws.send(`{"${currentColor}":[${id}]}`);
  };

  const handleIncreaseSize = () => {
    setCanvasSize(canvasSize * 1.2);
  };

  const handleDecreaseSize = () => {
    setCanvasSize(canvasSize / 1.2);
  };

  return (
    <>
      <div className="">
        <div className={overflow === true ? "h-screen overflow-hidden" : "h-screen"}>
          <div className="h-screen sm:flex">
            <canvas
              onWheel={(e) => {
                if (e.altKey) {
                  setOverflow(true)
                  e.preventDefault();
                  if (e.deltaY > 0) {
                    handleDecreaseSize();
                  } else if (e.deltaY < 0) {
                    handleIncreaseSize();
                  }
                } else {
                  setOverflow(false)
                }
              }}
              ref={canvasRef}
              width={canvasInitialSize}
              height={canvasInitialSize}
              style={{ width: `${canvasSize}px`, height: `${canvasSize}px` }}
              onClick={handleCanvasClick}
              className="m-auto"
            ></canvas>
          </div>
          <ColorBar
            currentColor={currentColor}
            setCurrentColor={setCurrentColor}
            chooseColor={chooseColor}
          />
          <div className="hidden sm:flex flex-col gap-3 fixed bottom-1/2 left-[33px]">
            <button
              style={{ color: btnColor, backgroundColor: colorBar }}
              className="w-10 h-10 bg-slate-400 rounded-md font-bold text-2xl"
              onClick={handleIncreaseSize}
            >
              +
            </button>
            <button
              style={{ color: btnColor, backgroundColor: colorBar }}
              className="w-10 h-10 bg-slate-400 rounded-md font-bold text-2xl"
              onClick={handleDecreaseSize}
            >
              -
            </button>
          </div>
          <Chat color={colorBar}/>
        </div>
      </div>
    </>
  );
}

export default Game;
