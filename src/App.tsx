import React, { useEffect, useState } from "react";
import "./App.css";
import Typing from "./components/Typing/Typing";
import styled from "@emotion/styled";
import { FlexCenter } from "./utils/HelperStyles";
import useTimer from "./hooks/useTimer";
import { formatTime } from "./utils/FormatTime";

export const Root = styled.div`
  box-sizing: border-box;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  ${FlexCenter};
  flex-direction: column;
`;

function App() {
  const { timer, isFinish, handleStart, handleFinish } = useTimer(10);
  const [wpm, setWPM] = useState(0);

  useEffect(() => {
    if (timer == 0) handleFinish();
  }, [timer]);

  return (
    <Root>
      <div>
        <h3>PPM: {wpm}</h3>
        <div>
          <p>{formatTime(timer)}</p>
          <div>
            {isFinish ? (
              <button
                onClick={() => {
                  window.location.reload();
                }}
              >
                Resetar
              </button>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </div>
      <Typing isFinish={isFinish} handleStart={handleStart} setWPM={setWPM} />
    </Root>
  );
}

export default App;
