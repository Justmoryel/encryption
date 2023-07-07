import React from "react";

const Display = (props) => {
  const { btnDisplay, copyText, displayText, btnCopy } = props;

  return (
    <div className="enc display">
      <div onClick={btnDisplay} className="display-1">
        <p>{displayText}</p>
      </div>
      <div className="display-2">
        <button onClick={copyText}>{btnCopy}</button>
      </div>
    </div>
  );
};

export default Display;
