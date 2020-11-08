import React, { useEffect, useState } from "react";
import "./App.css";
import Typing from "./components/Typing/Typing";
import Header from "./components/Header/Header";
import styled from "@emotion/styled";
import { FlexCenter } from "./utils/HelperStyles";
import useTimer from "./hooks/useTimer";

export const Root = styled.div`
  box-sizing: border-box;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  ${FlexCenter};
  flex-direction: column;
`;

function App() {
  const { timer, isFinish, handleStart, handleFinish } = useTimer(60); // Time in seconds
  const [wpm, setWPM] = useState(0);

  useEffect(() => {
    if (timer == 0) handleFinish();
  }, [timer]);

  return (
    <Root>
      <Header isFinish={isFinish} wpm={wpm} timer={timer} />
      <Typing isFinish={isFinish} handleStart={handleStart} setWPM={setWPM} />
    </Root>
  );
}

export default App;
