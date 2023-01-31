import styled from "@emotion/styled";
import { useEffect, useMemo, useState } from "react";
import Header from "./components/Header";
import Keyboard from "./components/Keyboard";
import Modal from "./components/Modal";
import Typing from "./components/Typing";
import useModal from "./hooks/useModal";
import useTimer from "./hooks/useTimer";

export const Root = styled.div`
  box-sizing: border-box;
  width: 100vw;
  height: 100vh;

  display: grid;
  grid-template-rows: 100px 1fr 1fr;

  align-items: center;
  justify-items: center;

  overflow: hidden;

  background-color: #f6f5f5;
`;

const TIME = 60;

function App() {
  const { timer, isFinish, handleStart } = useTimer(TIME); // Time in seconds
  const [totalLettersTyped, setTotalLettersTyped] = useState(0);
  const [totalLettersTypedWrong, setTotalLettersTypedWrong] = useState(0);

  const { close, modalOpen, open } = useModal();

  const wpm = useMemo(
    () => Math.round((totalLettersTyped / 5 / (60 - timer)) * 60),
    [totalLettersTyped, timer]
  );

  const accuracy = useMemo(
    () => Math.round((1 - totalLettersTypedWrong / totalLettersTyped) * 100),
    [totalLettersTypedWrong, totalLettersTyped]
  );

  useEffect(() => {
    if (isFinish) open();
  }, [isFinish]);

  return (
    <Root>
      <Header wpm={wpm || 0} timer={timer} accuracy={accuracy || 100} />
      <Typing
        isFinish={isFinish}
        handleStart={handleStart}
        setTotalLettersTyped={setTotalLettersTyped}
        setTotalLettersTypedWrong={setTotalLettersTypedWrong}
      />
      <Modal
        modalOpen={modalOpen}
        handleClose={close}
        wpm={wpm}
        accuracy={accuracy}
      />
      <Keyboard />
    </Root>
  );
}

export default App;
