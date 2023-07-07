import React, { useState } from "react";
import Buttonscircle from "./Buttonscircle";
import Display from "./Display";

const Encryption = () => {
  const [text, setText] = useState("");
  const [display, setDisplay] = useState("");
  const [shiftnum, setshiftNum] = useState();
  const [copyButtonText, setCopyButtonText] = useState("Copy Text");

  const handleOnchangeText = (e) => {
    const { value } = e.target;
    setText(value);
  };

  const handleOnclickDisplay = () => {
    setCopyButtonText("Copy Text");
  };
  const handleOnchangeShift = (e) => {
    const { value } = e.target;
    if (!isNaN(Number(value))) {
      setshiftNum(Number(value));
    } else {
      setshiftNum("");
      alert("Numbers Only!");
    }
  };

  const handleOnclickText = () => {
    setText("");
  };

  const handleOnclickEncrypt = () => {
    const encryptedText = text
      .split("") // Convert the string into an array of characters
      .map((letter) => {
        if (letter.match(/[a-z]/i)) {
          // Check if the character is a letter
          const code = letter.charCodeAt(0); // Get the ASCII code of the letter

          // Determine if the letter is uppercase or lowercase
          const isUppercase = code >= 65 && code <= 90;
          const isLowercase = code >= 97 && code <= 122;

          if (isUppercase || isLowercase) {
            // Shift the letter by one position
            const shiftedCode = code + shiftnum;
            const encryptedLetter =
              (isUppercase && shiftedCode > 90) ||
              (isLowercase && shiftedCode > 122)
                ? String.fromCharCode(shiftedCode - 26) // Wrap around to 'A' or 'a' if necessary
                : String.fromCharCode(shiftedCode);
            return encryptedLetter;
          }
        }
        return letter; // Return the character as is if it's not a letter
      })
      .reverse("") //reverse the array
      .join(""); // Convert the array back to a string
    setDisplay(encryptedText);
    setCopyButtonText("Copy Text");
  };

  const handleOnclickDecrypt = () => {
    const decryptedText = text
      .split("") // Convert the encrypted text into an array of characters
      .map((letter) => {
        if (letter.match(/[a-z]/i)) {
          // Check if the character is a letter
          const code = letter.charCodeAt(0); // Get the ASCII code of the letter

          // Determine if the letter is uppercase or lowercase
          const isUppercase = code >= 65 && code <= 90;
          const isLowercase = code >= 97 && code <= 122;

          if (isUppercase || isLowercase) {
            // Shift the letter back by the shiftnum
            const shiftedCode = code - shiftnum;
            const decryptedLetter =
              (isUppercase && shiftedCode < 65) ||
              (isLowercase && shiftedCode < 97)
                ? String.fromCharCode(shiftedCode + 26) // Wrap around to 'Z' or 'z' if necessary
                : String.fromCharCode(shiftedCode);
            return decryptedLetter;
          }
        }
        return letter; // Return the character as is if it's not a letter
      })
      .reverse("") // Reverse the array
      .join(""); // Convert the array back to a string

    setDisplay(decryptedText); // Update the text with the decrypted result
    setCopyButtonText("Copy Text");
  };

  const handleCopyText = () => {
    if (display !== "") {
      navigator.clipboard.writeText(display);
      setCopyButtonText("Copied");
    } else setCopyButtonText("Copy Text");
  };

  return (
    <div className="app-container">
      <div className="enc header">
        <h1 className="item-1">
          Put text below to <span className="span-2">hide</span>/
          <span className="span-1">uncover</span> messages
        </h1>
        <p className="item-2">
          Put and remember <span>Secret Code</span> to your messages when you
          encrypt and tell no soul about it.
        </p>
        <input
          className="item-3"
          placeholder="Numbers only..."
          value={shiftnum}
          onChange={handleOnchangeShift}
        ></input>
        <textarea
          className="item-4"
          value={text}
          onChange={handleOnchangeText}
          onClick={handleOnclickText}
        ></textarea>
      </div>

      <Buttonscircle
        encryption={handleOnclickEncrypt}
        decryption={handleOnclickDecrypt}
      />
      <Display
        btnDisplay={handleOnclickDisplay}
        displayText={display}
        copyText={handleCopyText}
        btnCopy={copyButtonText}
      />
    </div>
  );
};

export default Encryption;
