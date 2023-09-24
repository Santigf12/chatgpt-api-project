import React from "react";

function Message({ message }) {
  return (
    <div className="message">
      <p>{message.sender}: {message.messageBody}</p>

    </div>
  );
}

export default Message;
