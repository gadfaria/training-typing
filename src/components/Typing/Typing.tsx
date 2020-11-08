import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import { Font } from "../../utils/HelperStyles";

const Input = styled.input`
  margin-top: 15px;
  width: 50vw;
  ${Font};
  font-weight: 400;
  font-size: 20px;
`;

const Text = styled.div`
  overflow-y: scroll;
  width: 50vw;
  height: 50vh;
  ${Font};
  font-weight: 300;
  font-size: 25px;
`;

interface Props {
  isFinish: boolean;
  setWPM: Function;
  handleStart: Function;
}

export default function Typing(props: Props) {
  const { isFinish, setWPM, handleStart } = props;
  let [typing, setTyping] = useState("");

  let [text, setText] = useState("Muss");
  let [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const response = await fetch(
        "https://baconipsum.com/api/?type=meat-and-filler"
      );
      let responseArray = await response.json();
      responseArray = responseArray.join("").split(". ").join(".");

      setText(responseArray);
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    if (typing.length === 1) handleStart();
    setWPM(typing.split(" ").length - 1);
  }, [typing]);

  return loading ? (
    <div>CARREGANDO CARAI</div>
  ) : (
    <>
      <Text>
        <mark>{typing}</mark>
        {text.substring(typing.length, text.length)}
      </Text>
      <Input
        disabled={isFinish}
        value={typing}
        onChange={(evt: any) => {
          if (
            evt.target.value.charAt(evt.target.value.length - 1) ==
              text[typing.length] ||
            evt.target.value.length < typing.length
          )
            setTyping(evt.target.value);
        }}
      />
    </>
  );
}
