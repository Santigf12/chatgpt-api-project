import React from "react";

function Message({ message , active }) {
  const isImageMessage = active.chatModel === "image" && message.messageModel === "image";

  let truncatedMessage = message.messageBody.slice(0, 40);

  return (
    <div className="message">
      {isImageMessage ? (
        <div>
          <p>{message.sender}: {truncatedMessage}</p>
          <img src={message.messageBody} alt="" />
        </div>
      ) : (
        <p>
          {message.sender}: {message.messageBody}
        </p>
      )}

    </div>
  );
}

export default Message;
