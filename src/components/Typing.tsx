import { css } from "@emotion/react";
import styled from "@emotion/styled";
import React, { useEffect, useMemo, useState } from "react";

import Texts from "../assets/texts.json";

const Text = styled.div`
  display: flex;
  flex-wrap: wrap;

  /* max-width: 70vw; */
  margin: 0 100px;
  height: 100%;

  font-weight: 300;
  font-size: 40px;

  overflow: hidden;
`;

const Word = styled.span`
  display: flex;
`;

interface LetterProps {
  isCurrentLetter: boolean;
  wasTyped: boolean;
  wasTypedWrong: boolean;
}

const Letter = styled.span<LetterProps>`
  position: relative;

  min-width: 21px;
  margin: 5px 2px 5px 0;
  background-color: ${(props) =>
    props.wasTypedWrong ? "#ff6961" : props.wasTyped ? "#d3e0ea" : "none"};

  color: ${(props) => (props.isCurrentLetter ? "#743600" : "#000")};
  text-align: center;

  border-radius: 5px;

  @keyframes blink {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
    100% {
      opacity: 0;
    }
  }

  ${(props) =>
    props.isCurrentLetter &&
    css`
      ::after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;

        width: 100%;
        height: 3px;
        background-color: #743600;

        animation: blink 0.75s infinite;
        animation-direction: alternate;
        animation-timing-function: ease-in-out;
      }
    `}
`;

interface Props {
  isFinish: boolean;
  setTotalLettersTyped: Function;
  setTotalLettersTypedWrong: Function;
  handleStart: Function;
}

interface MapppedText
  extends Array<
    {
      letter: string;
      index: number;
    }[]
  > {}

export default function Typing(props: Props) {
  const {
    isFinish,
    setTotalLettersTyped,
    setTotalLettersTypedWrong,
    handleStart,
  } = props;
  let [text, setText] = useState(Texts[1]);
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
  const [errorsIndexes, setErrorsIndexes] = useState<number[]>([]);

  const mappedText: MapppedText = useMemo(() => {
    let count = 0;

    return text.split(" ").map((word, index) => {
      const letters = word.split("").map((letter, index) => {
        return {
          letter,
          index: count++,
        };
      });

      return [...letters, { letter: " ", index: count++ }];
    });
  }, [text]);

  /*
      Calculating Words per Minute (WPM)

      In Type to Learn, because a lot of the lessons don't require typing actual words, we define a "word" as any five characters, including spaces, numbers, letters, and punctuation, but NOT function keys such as Shift or Backspace.
      Therefore, the number of words is calculated by dividing the number of characters typed by 5. The number of "words" is then divided by the total elapsed time (in minutes). Below is the actual calculation.

      Total Number of Words = Total Keys Pressed / 5
      WPM = Total Number of Words / Time Elapsed in Minutes (rounded down)

      Example:
        Total Keys Pressed = 200
        Time Elapsed in Minutes = 1.5
        WPM = ( (200 / 5) / 1.5 ) = 26
  */

  useEffect(() => {
    if (isFinish) return;

    let index = 0;
    let totalWordsTypedWrong = 0;
    let hasError = false;
    let currentLetterTop: number | null = null;
    function handleKeypress(evt: KeyboardEvent) {
      // Scroll to next line
      const currentLetterElement = document.querySelector(
        `.letter-${index}`
      ) as HTMLSpanElement;
      if (currentLetterElement) {
        if (currentLetterTop === null) {
          currentLetterTop = currentLetterElement.offsetTop;
        }

        if (currentLetterTop !== currentLetterElement.offsetTop) {
          currentLetterTop = currentLetterElement.offsetTop;
          const textElement = document.querySelector(
            ".text-to-type"
          ) as HTMLDivElement;
          if (textElement) {
            textElement.scrollTo({
              top: textElement.scrollTop + 56,
              behavior: "smooth",
            });
          }
        }
      }

      const pressedKey = evt.key;
      if (pressedKey == text[index]) {
        index++;
        if (index === 1) {
          handleStart();
        }
        hasError = false;
        setCurrentLetterIndex(index);
        setTotalLettersTyped(index);
      } else {
        if (index === 0) return;
        if (!hasError) {
          hasError = true;
          let currentErrorIndex = index;
          setErrorsIndexes((errorsIndexes) => [
            ...errorsIndexes,
            currentErrorIndex,
          ]);
          index++;
          setCurrentLetterIndex(index);
          totalWordsTypedWrong++;
          setTotalLettersTypedWrong(totalWordsTypedWrong);
        }
      }
    }
    document.addEventListener("keypress", handleKeypress);

    return () => {
      document.removeEventListener("keypress", handleKeypress);
    };
  }, [text, isFinish]);

  return (
    <Text className="text-to-type">
      {mappedText.map((mappedWord, index) => (
        <Word key={`word-${index}`}>
          {mappedWord.map((mappedLetter) => (
            <Letter
              key={`letter-${mappedLetter.index}`}
              className={`letter-${mappedLetter.index}`}
              isCurrentLetter={mappedLetter.index === currentLetterIndex}
              wasTyped={mappedLetter.index < currentLetterIndex}
              wasTypedWrong={errorsIndexes.includes(mappedLetter.index)}
            >
              {mappedLetter.letter}
            </Letter>
          ))}
        </Word>
      ))}
    </Text>
  );
}
