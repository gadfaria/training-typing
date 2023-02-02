import styled from "@emotion/styled";
import { useEffect, useMemo, useState } from "react";
import Header from "./components/Header";
import Keyboard from "./components/Keyboard";
import Modal from "./components/Modal";
import Typing from "./components/Typing";
import useMediaQuery from "./hooks/useMediaQuery";
import useModal from "./hooks/useModal";
import useTimer from "./hooks/useTimer";

const Root = styled.div`
  display: grid;
  grid-template-rows: 100px 1fr 1fr;
  align-items: center;
  justify-items: center;

  box-sizing: border-box;
  width: 100vw;
  height: 100vh;
  background-color: #f6f5f5;

  overflow: hidden;
`;

const Mobile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100vw;
  height: 100vh;
  background-color: #f6f5f5;

  > h1 {
    font-size: 1.5rem;
    text-align: center;
  }
`;

const TIME = 60;

function App() {
  const { timer, isFinish, handleStart } = useTimer(TIME); // Time in seconds
  const hasLessThan1200px = useMediaQuery("(max-width: 1200px)");
  const [totalLettersTyped, setTotalLettersTyped] = useState(0);
  const [totalLettersTypedWrong, setTotalLettersTypedWrong] = useState(0);

  const { close, modalOpen, open } = useModal();

  const wpm = useMemo(
    () => Math.round((totalLettersTyped / 5 / ((60 - timer) | 1)) * 60),
    [totalLettersTyped, timer]
  );

  const accuracy = useMemo(
    () => Math.round((1 - totalLettersTypedWrong / totalLettersTyped) * 100),
    [totalLettersTypedWrong, totalLettersTyped]
  );

  useEffect(() => {
    if (isFinish) open();
  }, [isFinish]);

  if (hasLessThan1200px) {
    return (
      <Mobile>
        <h1>Sorry, this app is not supported on mobile devices.</h1>
      </Mobile>
    );
  }

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
