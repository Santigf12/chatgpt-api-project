import {useEffect, useState} from "react";
import Message from "./Message";



function Chatmain({active, onSendMessage, onReceiveMessage}) {
  const [messageText, setMessageText] = useState("");
  const [canSendMessage, setCanSendMessage] = useState(true);

  const handleSendMessage = () => {
    if (messageText.trim() !== "") {
      onSendMessage(active.chatId, messageText);
      setMessageText("");
      setCanSendMessage(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && canSendMessage === true) {
      handleSendMessage();
    }
  };

  useEffect(() => {
    if (!active) return;

    if (active.messages.length > 0 && active.messages[active.messages.length - 1].sender === "You") { 
      setTimeout(() => {
        onReceiveMessage(active.chatId, "The existence of God is a deeply philosophical and theological question, and it's a topic that has been debated by scholars, theologians, and philosophers for centuries. There are various perspectives and beliefs regarding the existence of God, and it's important to note that opinions on this matter vary widely among individuals and cultures.");
        setCanSendMessage(true);
      }, 3000);
    }
  }, [active]);

  if(!active) return (
    <div className={`main-notes`}>
      <div className={`no-active-note`}>No active note</div>  
    </div>
  );

  


  return (
    <div className={`main-notes`}>
      <div className="main-note-edit">
        <div className="message-area">
          {active.messages.map((message) => (
            <Message key={message.messageId}   message={message} />
          ))}
        </div>
        <div className="input-area">
          <input
            type="text"
            placeholder="Type your message..."
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button className="button" onClick={handleSendMessage} disabled={!canSendMessage} >
            Send
          </button>
        </div>
      </div>
    </div>
  );

}

export default Chatmain;