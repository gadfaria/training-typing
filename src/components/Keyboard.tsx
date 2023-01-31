import styled from "@emotion/styled";
import { useEffect } from "react";

const Base = styled.div`
  max-width: 1085px;
  padding: 20px;
  margin: 20px;
  background-color: #9ca9b2;
  border-radius: 10px;
  display: grid;
  grid-template-columns: repeat(30, 30px);
  grid-template-rows: repeat(5, 60px);
  grid-gap: 5px;

  .key {
    background-color: rgb(243, 243, 243);
    border: 2px solid black;
    border-radius: 5px;
    grid-column: span 2;
    font-size: 20px;
    text-align: center;
    padding-top: 17px;
  }

  .press {
    border: 2px solid #d3e0ea;
  }

  .key:hover {
    border: 2px solid #d3e0ea;
  }

  .delete {
    grid-column: span 4;
  }

  .tab {
    grid-column: span 3;
  }

  .backslash {
    grid-column: span 3;
  }

  .capslock {
    grid-column: span 4;
  }

  .return {
    grid-column: span 4;
  }

  .leftshift {
    grid-column: span 5;
  }

  .rightshift {
    grid-column: span 5;
  }

  .leftctrl {
    grid-column: span 3;
  }

  .command {
    grid-column: span 3;
    font-size: 14px;
  }

  .space {
    grid-column: span 13;
  }
`;

const MAPPED_KEYS: { [key: string]: string } = {
  " ": "space",
  Backspace: "delete",
  CapsLock: "capslock",
  Control: "leftctrl",
  Enter: "return",
  Meta: "command",
  Shift: "leftshift",
  Tab: "tab",
  "[": "open-bracket",
  "]": "close-bracket",
  "\\": "backslash",
  ";": "semicolon",
  "'": "single-quote",
  ",": "comma",
  ".": "period",
  "/": "forwardslash",
  "-": "minus",
  "=": "more",
  "`": "tilde",
  "+": "more",
  "1": "one",
  "2": "two",
  "3": "three",
  "4": "four",
  "5": "five",
  "6": "six",
  "7": "seven",
  "8": "eigth",
  "9": "nine",
  "0": "zero",
  "!": "one",
  "@": "two",
  "#": "three",
  $: "four",
  "%": "five",
  "^": "six",
  "&": "seven",
  "*": "eigth",
  "(": "nine",
  ")": "zero",
  "{": "open-bracket",
  "}": "close-bracket",
  "|": "backslash",
  _: "minus",
};

const KEYS = [
  { label: "~", value: "tilde" },
  { label: "1", value: "one" },
  { label: "2", value: "two" },
  { label: "3", value: "three" },
  { label: "4", value: "four" },
  { label: "5", value: "five" },
  { label: "6", value: "six" },
  { label: "7", value: "seven" },
  { label: "8", value: "eigth" },
  { label: "9", value: "nine" },
  { label: "0", value: "zero" },
  { label: "-", value: "minus" },
  { label: "+", value: "more" },
  { label: "Delete", value: "delete" },
  { label: "Tab", value: "tab" },
  { label: "Q", value: "q" },
  { label: "W", value: "w" },
  { label: "E", value: "e" },
  { label: "R", value: "r" },
  { label: "T", value: "t" },
  { label: "Y", value: "y" },
  { label: "U", value: "u" },
  { label: "I", value: "i" },
  { label: "O", value: "o" },
  { label: "P", value: "p" },
  { label: "[", value: "open-bracket" },
  { label: "]", value: "close-bracket" },
  { label: "\\", value: "backslash" },
  { label: "CapsLock", value: "capslock" },
  { label: "A", value: "a" },
  { label: "S", value: "s" },
  { label: "D", value: "d" },
  { label: "F", value: "f" },
  { label: "G", value: "g" },
  { label: "H", value: "h" },
  { label: "J", value: "j" },
  { label: "K", value: "k" },
  { label: "L", value: "l" },
  { label: ";", value: "semicolon" },
  { label: "'", value: "single-quote" },
  { label: "Return", value: "return" },
  { label: "Shift", value: "leftshift" },
  { label: "Z", value: "z" },
  { label: "X", value: "x" },
  { label: "C", value: "c" },
  { label: "V", value: "v" },
  { label: "B", value: "b" },
  { label: "N", value: "n" },
  { label: "M", value: "m" },
  { label: ",", value: "comma" },
  { label: ".", value: "period" },
  { label: "/", value: "forwardslash" },
  { label: "Shift", value: "rightshift" },
  { label: "Ctrl", value: "leftctrl" },
  { label: "Alt", value: "leftalt" },
  { label: "Command", value: "command" },
  { label: "Space", value: "space" },
  { label: "Command", value: "command" },
  { label: "Alt", value: "rightalt" },
  { label: "Ctrl", value: "rightctrl" },
  { label: "Fn", value: "fn" },
];

export default function Keyboard() {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      const keyValue = MAPPED_KEYS[e.key] || e.key.toLowerCase();
      const keyElement = document.querySelector(`.${keyValue}`);
      if (keyElement) {
        keyElement.classList.add("press");
      }
    }
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    function handleKeyUp(e: KeyboardEvent) {
      const keyValue = MAPPED_KEYS[e.key] || e.key.toLowerCase();
      const keyElement = document.querySelector(`.${keyValue}`);
      if (keyElement) {
        keyElement.classList.remove("press");
      }
    }

    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return (
    <Base>
      {KEYS.map((key, index) => (
        <div key={key.value + index} className={`key ${key.value}`}>
          {key.label}
        </div>
      ))}
    </Base>
  );
}
