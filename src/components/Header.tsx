import styled from "@emotion/styled";
import { formatTime } from "../utils/FormatTime";

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;

  > span {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 400px;

    font-size: 40px;
  }
`;

interface Props {
  timer: number;
  wpm: number;
  accuracy: number;
}

export default function Header(props: Props) {
  const { wpm, timer, accuracy } = props;

  return (
    <Container>
      <span>WPM: {wpm}</span>
      <span>Accuracy: {accuracy}%</span>
      <span>{formatTime(timer)}</span>
    </Container>
  );
}
