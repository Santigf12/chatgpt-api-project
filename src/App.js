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



  const onAddchat = (model) => {
    let pretty = ""

    if (model === 1) {
      model = "gpt-3.5"
      pretty = "ChatGPT 3.5"
    } else if (model === 2) {
      model = "gpt-4"
      pretty = "ChatGPT 4"
    } else if (model === 3) {
      model = "image"
      pretty = "DALL-E 2"
    }

    const chats_new = {
      chatId: nanoidv2(),
      chatModel: model,
      chatTitle: `AI Chat: ${pretty}`,
      messages: [], 
    };

    const updatedChats = [chats_new, ...chats];
    localStorage.setItem("chats", JSON.stringify(updatedChats));
    setChats(updatedChats);
  };

  const activeChat = () => {
    return chats.find((chat) => chat.chatId === active);
  };

  const onSaveMessage = (chatId, model, question) => {
    const message = {
      messageId: nanoidv2(),
      messageBody: question,
      messageModel: model,
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

  const onReceiveMessage = (chatId, model, messageText) => {
    const message = {
      messageId: nanoidv2(),
      messageBody: messageText,
      messageModel: model,
      sender: "AI",
      date: new Date().toISOString(),
    };
  
    const updatedChats = chats.map((chat) => {
      if (chat.chatId === chatId) {
        // Create a new chat object with the updated messages array
        return {
          ...chat,
          messages: [...chat.messages, message],
        };
      }
      return chat;
    });
  
    setChats(updatedChats); // Update the state with the new message
    localStorage.setItem("chats", JSON.stringify(updatedChats));
  };

  useEffect(() => {
    // Save the active chat to localStorage
    localStorage.setItem("active", active);
  }, [active]);


  return (
    <dev className={`grid`}>
        <Sidebar chats={chats} onAddchat={onAddchat} active={active} setActive={setActive} />
        <Navbar/>
        <Chatmain setChats={setChats} chats={chats} active={activeChat()} onSaveMessage={onSaveMessage} onReceiveMessage={onReceiveMessage} />
    </dev>
  );
}

export default App;
