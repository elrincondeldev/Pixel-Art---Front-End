import React, { useState, useEffect } from "react";
import "./active.css";
import "./noActive.css";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function ColorBar(props) {
  const [tabs, setTabs] = useState([
    {
      id: 0,
      name: "#1a1c2c",
      bg: "#1a1c2c88",
      bg2: "#1a1c2c44",
      current: true,
    },
    {
      id: 1,
      name: "#5d275d",
      bg: "#5d275d88",
      bg2: "#5d275d44",
      current: false,
    },
    {
      id: 2,
      name: "#b13e53",
      bg: "#b13e5388",
      bg2: "#b13e5344",
      current: false,
    },
    {
      id: 3,
      name: "#ef7d57",
      bg: "#ef7d5788",
      bg2: "#ef7d5744",
      current: false,
    },
    {
      id: 4,
      name: "#ffcd75",
      bg: "#ffcd7588",
      bg2: "#ffcd7544",
      current: false,
    },
    {
      id: 5,
      name: "#a7f070",
      bg: "#a7f07088",
      bg2: "#a7f07044",
      current: false,
    },
    {
      id: 6,
      name: "#38b764",
      bg: "#38b76488",
      bg2: "#38b76444",
      current: false,
    },
    {
      id: 7,
      name: "#257179",
      bg: "#25717988",
      bg2: "#25717944",
      current: false,
    },
    {
      id: 8,
      name: "#29366f",
      bg: "#29366f88",
      bg2: "#29366f44",
      current: false,
    },
    {
      id: 9,
      name: "#3b5dc9",
      bg: "#3b5dc988",
      bg2: "#3b5dc944",
      current: false,
    },
    {
      id: 10,
      name: "#41a6f6",
      bg: "#41a6f688",
      bg2: "#41a6f644",
      current: false,
    },
    {
      id: 11,
      name: "#73eff7",
      bg: "#73eff788",
      bg2: "#73eff744",
      current: false,
    },
    {
      id: 12,
      name: "#f4f4f4",
      bg: "#f4f4f488",
      bg2: "#f4f4f444",
      current: false,
    },
    {
      id: 13,
      name: "#94b0c2",
      bg: "#94b0c288",
      bg2: "#94b0c244",
      current: false,
    },
    {
      id: 14,
      name: "#566c86",
      bg: "#566c8688",
      bg2: "#566c8644",
      current: false,
    },
    {
      id: 15,
      name: "#333c57",
      bg: "#333c5788",
      bg2: "#333c5744",
      current: false,
    },
  ]);
  const [display, setDisplay] = useState(true);
  const [color, setColor] = useState("#1a1c2c88");

  useEffect(() => {
    document.body.style.backgroundColor = "#1a1c2c44";
  }, []);

  return (
    <div className="flex flex-col items-center">
      <div className="sm:hidden">
        <div className="flex flex-wrap mt-10 w-96 rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 fixed bottom-[20%]">
          {tabs.map((tab, tabIdx) => (
            <option
              onTouchEnd={() => {
                setTabs((prevTabs) =>
                  prevTabs.map((prevTab, prevTabIndex) => ({
                    ...prevTab,
                    current: prevTabIndex === tabIdx,
                  }))
                );
                props.setCurrentColor(tab.id);
                document.body.style.backgroundColor = tab.bg2;
              }}
              style={{ backgroundColor: tab.name }}
              key={tab.name}
              className="w-1/4 h-24 text-center"
            ></option>
          ))}
        </div>
      </div>
      <div className="flex flex-col h-full items-center">
        <button
          onClick={() => setDisplay(true)}
          className={
            display === true
              ? "hidden"
              : "bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded mt-auto fixed bottom-0 text-2xl"
          }
        >
          Mostrar Colores
        </button>
      </div>
      <div
        style={{ backgroundColor: color, transition: "all 0.5s" }}
        className={
          display === true
            ? "hidden xl:flex flex-col items-center justify-center h-[10vw] py-10 gap-3 w-[90vw] rounded-xl bg-slate-400 mb-10 fixed bottom-0"
            : "hidden"
        }
      >
        <button
          onClick={() => setDisplay(false)}
          className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded text-2xl"
        >
          Ocultar colores
        </button>
        <div className="flex flex-wrap">
          <nav className="isolate flex gap-4 rounded-lg" aria-label="Tabs">
            {tabs.map((tab, tabIdx) => (
              <div
                key={tab.name}
                style={{ backgroundColor: tab.name }}
                onClick={() => {
                  props.chooseColor(tab.name);
                  setColor(tab.bg);

                  setTabs((prevTabs) =>
                    prevTabs.map((prevTab, prevTabIndex) => ({
                      ...prevTab,
                      current: prevTabIndex === tabIdx,
                    }))
                  );
                  props.setCurrentColor(tab.id);
                  document.body.style.backgroundColor = tab.bg2;
                }}
                className={classNames(
                  tab.current === true ? "shadow-custom" : "",
                  "group cursor-pointer relative min-w-0 flex-1 overflow-hidden w-[4vw] h-[4vw] p-4 text-sm font-medium text-center focus:z-10 rounded-xl "
                )}
                aria-current={tab.current ? "page" : undefined}
              ></div>
            ))}
          </nav>
        </div>
      </div>
      <div
        style={{ backgroundColor: color }}
        className={
          display === true
            ? "hidden sm:flex xl:hidden flex-col items-center justify-center h-[180px] py-10 gap-3 w-[450px] rounded-xl bg-slate-400 mb-10 fixed bottom-0"
            : "hidden"
        }
      >
        <button
          onClick={() => setDisplay(false)}
          className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded text-lg"
        >
          Ocultar colores
        </button>
        <div className="flex">
          <nav
            className="isolate grid grid-cols-8 gap-4 rounded-lg"
            aria-label="Tabs"
          >
            {tabs.map((tab, tabIdx) => (
              <div
                key={tab.name}
                style={{ backgroundColor: tab.name }}
                onClick={() => {
                  props.chooseColor(tab.name);
                  setColor(tab.bg);

                  setTabs((prevTabs) =>
                    prevTabs.map((prevTab, prevTabIndex) => ({
                      ...prevTab,
                      current: prevTabIndex === tabIdx,
                    }))
                  );
                  props.setCurrentColor(tab.id);
                  document.body.style.backgroundColor = tab.bg2;
                }}
                className={classNames(
                  tab.current === true ? "shadow-custom" : "",
                  "group cursor-pointer relative min-w-0 flex-1 overflow-hidden w-[2vw] h-[2vw] p-4 text-sm font-medium text-center focus:z-10 rounded-xl "
                )}
                aria-current={tab.current ? "page" : undefined}
              ></div>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
