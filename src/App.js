import { useState, useEffect} from "react"

import Sidebar from "./components/Sidebar";
import Chatmain from "./components/Chatmain";
import Navbar from "./components/Navbar";
import '@coreui/coreui/dist/css/coreui.min.css'


function App() {
  const [chats, setChats] = useState(localStorage.chats ? JSON.parse(localStorage.chats) : []);
  const [active, setActive] = useState(localStorage.active !== undefined ? parseInt(localStorage.active) : false);

  const { customAlphabet } = require('nanoid')
  const nanoidv2 = customAlphabet('1234567890', 12)



  const onAddchat = () => {
    const chats_new = {
      chatId: nanoidv2(),
      chatTitle: "Untitled",
      messages: [], 
    };

    const updatedChats = [chats_new, ...chats];
    localStorage.setItem("chats", JSON.stringify(updatedChats));
    setChats(updatedChats);
  };

  const activeChat = () => {
    return chats.find((chat) => chat.chatId === active);
  };

  const onSendMessage = (chatId, messageText) => {
    const message = {
      messageId: nanoidv2(),
      messageBody: messageText,
      sender: "You", // Replace with sender's name or ID
      date: new Date().toISOString(),
    };

    // Find the chat by chatId and add the message to its messages array
    const updatedChats = chats.map((chat) => {
      if (chat.chatId === chatId) {
        return {
          ...chat,
          messages: [...chat.messages, message],
        };
      }
      return chat;
    });

    setChats(updatedChats);
    localStorage.setItem("chats", JSON.stringify(updatedChats));
  };

  useEffect(() => {
    // Save the active chat to localStorage
    localStorage.setItem("active", active);
  }, [active]);

  const onReceiveMessage = (chatId, messageText) => {
    const message = {
      messageId: nanoidv2(),
      messageBody: messageText,
      sender: "AI", // Replace with sender's name or ID
      date: new Date().toISOString(),
    };


    const updatedChats = chats.map((chat) => {
      if (chat.chatId === chatId) {
        return {
          ...chat,
          messages: [...chat.messages, message],
        };
      }
      return chat;
    });

    setChats(updatedChats);
    localStorage.setItem("chats", JSON.stringify(updatedChats));
  };


  return (
    <dev className={`grid`}>
        <Sidebar chats={chats} onAddchat={onAddchat} active={active} setActive={setActive} />
        <Navbar/>
        <Chatmain setChats={setChats} chats={chats} active={activeChat()} onSendMessage={onSendMessage} onReceiveMessage={onReceiveMessage} />
    </dev>
  );
}

export default App;


