import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import { formatTime } from "../../utils/FormatTime";
import { FlexCenter, Font } from "../../utils/HelperStyles";

interface Props {
  isFinish: boolean;
  timer: number;
  wpm: number;
}

const Div = styled.div`
  width: 50vw;
  height: 20vh;
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const WPM = styled.div`
  ${Font}
  ${FlexCenter}
  font-size: 40px;
`;

const Stopwatch = styled.div`
  ${FlexCenter}
  flex-direction:column;
`;

const Clock = styled.div`
  ${Font}
  font-size: 30px;
`;

const Button = styled.button`
  ${Font}
  font-size: 15px;
  margin-top: 15px;
`;

export default function Header(props: Props) {
  const { isFinish, wpm, timer } = props;

  return (
    <Div>
      <WPM>WPM: {wpm}</WPM>
      <Stopwatch>
        <Clock>{formatTime(timer)}</Clock>
        {/* {!isFinish ? ( */}
        <Button
          onClick={() => {
            window.location.reload();
          }}
        >
          Let's go again
        </Button>
        {/* ) : ( */}
        {/* <></> */}
        {/* )} */}
      </Stopwatch>
    </Div>
  );
}
