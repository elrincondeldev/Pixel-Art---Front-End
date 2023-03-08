import "./App.css";
import Game from "./components/Game";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";

function App() {

  return (
    <div className="w-full">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pixel" element={<Game />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
