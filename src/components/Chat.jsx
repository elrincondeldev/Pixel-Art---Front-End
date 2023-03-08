import React, { useState } from "react";
import { useEffect } from "react";
import Picker from "emoji-picker-react";

const wsChat = new WebSocket("ws://13.38.113.187:3033");

function Chat() {
  const [messages, setMessages] = useState([""]);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState(false);
  const [emoji, setEmoji] = useState(false);

  const scrollDown = () => {
    const item = document.getElementById("chat");
    item.scrollTop = item.scrollHeight;
  };

  useEffect(() => {
    wsChat.onmessage = function (e) {
      setMessages((prev) => [...prev, e.data]);
    };
  }, []);

  useEffect(() => {
    scrollDown();
  }, [messages]);

  const onEmojiClick = (event, emojiObject) => {
    setMessage(message + event.emoji);
    console.log(event);
  };

  return (
    <div>
      <div
        style={{ backgroundColor: "#1a1c2c", transition: "all 0.5s" }}
        className={
          chat === true
            ? "hidden sm:flex flex-col gap-3 fixed bottom-1/4 right-[33px] w-[400px] h-[500px] items-center p-3 justify-between rounded-md"
            : "hidden sm:flex flex-col gap-3 fixed bottom-1/4 -right-[388px] w-[400px] h-[500px] items-center p-3 justify-between rounded-md"
        }
      >
        <ul
          id="chat"
          className="flex flex-col h-4/5 bg-[#f4f4f4] w-full overflow-y-auto break-all p-3 rounded-md gap-1"
        >
          {messages.map((element, i) => (
            <li className="text-[20px] border-b-2" key={i}>
              {element}
            </li>
          ))}
        </ul>
        <form
          className="flex flex-col items-center gap-3 w-full"
          onSubmit={(e) => {
            if (message != "") {
              wsChat.send(message);
              setMessage("");
            }
            e.preventDefault();
          }}
        >
          <input
            placeholder="Enviar un mensaje"
            className="w-full h-10 px-3 rounded-md bg-[#f4f4f4]"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            type="text"
            name="chat"
            id="chat"
          />
          <div
            className={emoji === true ? "hidden sm:flex flex-col fixed bottom-1/3" : "hidden"}
          >
            <Picker onEmojiClick={onEmojiClick} height="400px" theme="dark" lazyLoadEmojis="true"/>
          </div>
          <div className="flex justify-between w-full">
            <button
              className="bg-blue-500 hover:bg-blue-400 text-white font-bold  border-b-4 border-blue-700 hover:border-blue-500 rounded-md mt-auto"
              type="button"
              onClick={() => {
                if (emoji === true) {
                  setEmoji(false);
                } else {
                  setEmoji(true);
                }
              }}
            >
              <img className="h-8" src="assets\emojidef.png" alt="emoji" />
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-400 text-white font-bold px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded-md mt-auto text-2xl"
              type="submit"
            >
              Enviar
            </button>
            <button
              type="button"
              onClick={() => setChat(false)}
              className="bg-blue-500 hover:bg-blue-400 text-white font-bold px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded-md mt-auto text-2xl"
            >
              Cerrar
            </button>
          </div>
        </form>
      </div>
      <button
        type="button"
        onClick={() => setChat(true)}
        className={
          chat === false
            ? "hidden sm:flex fixed bottom-1/2 -right-4  w-30 transform -rotate-90 bg-blue-500 hover:bg-blue-400 text-white font-bold p-3 border-b-4 border-blue-700 hover:border-blue-500 rounded-md mt-auto text-4xl"
            : "hidden"
        }
      >
        Chat
      </button>
    </div>
  );
}

export default Chat;
