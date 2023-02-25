import React from "react";
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
          <ul className="list">
            <li>- Solo tienes que escoger un color de los 16 que tienes disponibles y empezar a crear arte con la comunidad!</li><br />
            <li>- Si hay franceses, son los enemigos.</li><br />
            <li>- Seguir a El Rincón Del Dev en Instagram</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Home;
