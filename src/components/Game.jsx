import React from "react";

function Game() {
  return (
    <>
      <header className="header">
        <h1>Hackafor IRB & ERDD</h1>
      </header>
      <div className="main">
        <div className="settings">
          <input type="color" id="colorPicker" value="#333333" />
        </div>
        <div id="grid" className="grid"></div>
      </div>
    </>
  );
}

export default Game;
