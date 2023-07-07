import React from "react";

const Buttonscircle = (props) => {
  const { encryption, decryption } = props;

  return (
    <div className="enc btn">
      <button className="btn-1" onClick={encryption}>
        Encrypt
      </button>
      <button className="btn-2" onClick={decryption}>
        Decrypt
      </button>
    </div>
  );
};

export default Buttonscircle;
