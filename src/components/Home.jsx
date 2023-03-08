import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./Home.css";
import { useState } from "react";

function Home() {

  const [display, setDisplay] = useState("hide")

  return (
    <div className="main-container">
      <div className="content">
        <div className="box">
          <div className="title">
            <h1>Pixel Art</h1>
            <h2>HackAfor</h2>
          </div>
          <div className="gameHome">
            <NavLink className="buttonGame" to={"/pixel"}>
              Jugar
            </NavLink>
            <button onClick={() => setDisplay("show")}>Cómo se juega</button>
          </div>
        </div>
        <div className={display}>
          <div className="buttonContainer">
          <button className="buttonX" onClick={() => setDisplay("hide")}>x</button>
          </div>
          <ul>
            <li>- Escoge un color de los 16 que tienes disponibles y empieza a crear arte con la comunidad!</li><br />
            <li>- En la versión de escritorio puedes aumentar o reducir el tamaño del Pixel Art con los botones + Y - o ALT + Scroll</li><br />
            <li>- Si hay franceses, son los enemigos.</li><br />
            <li>- Seguir a @elrincondeldev en Instagram</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Home;
