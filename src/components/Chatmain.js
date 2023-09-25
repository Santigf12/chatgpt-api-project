import {useEffect, useState} from "react";
import Message from "./Message";



function Chatmain({active, onSaveMessage, onReceiveMessage}) {
  const [messageText, setMessageText] = useState("");
  const [canSendMessage, setCanSendMessage] = useState(true);
  const [apiResponse, setApiResponse] = useState("");

  const handleSendMessage = () => {
    if (messageText.trim() !== "") {
      onSaveMessage(active.chatId, active.chatModel, messageText);
      handeApiCall();
      setMessageText("");
      setCanSendMessage(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && canSendMessage === true) {
      handleSendMessage();
    }
  };

  const handeApiCall = async () => {

    const url = 'https://cors-anywhere.herokuapp.com/https://northamerica-northeast1-chatgpt-api-project.cloudfunctions.net/get-chat-ai-2';

    const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({"model": active.chatModel, "question": messageText}),
    });
    const data = await response.json();
    setApiResponse(data.response);
  };



  useEffect(() => {
    if (!active) return;
    
    if (active.messages.length > 0 && apiResponse !== "") { 
      onReceiveMessage(active.chatId, active.chatModel, apiResponse);
      setCanSendMessage(true);
      setApiResponse("");
    }
  }, [active, apiResponse]);

  if(!active) return (
    <div className={`main-notes`}>
      <div className={`no-active-note`}>No active chat</div>  
    </div>
  );

  
  return (
    <div className={`main-notes`}>
      <div className="main-note-edit">
        <div className="message-area">
          {active.messages.map((message) => (
            <Message key={message.messageId}   message={message} active={active} />
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