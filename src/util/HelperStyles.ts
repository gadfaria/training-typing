import { css } from "@emotion/core";
import styled from "@emotion/styled";

export const FlexCenter = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Root = styled.div`
  box-sizing: border-box;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  ${FlexCenter};
  flex-direction: column;
`;

export const Font = css`
 font-family: 'Roboto Mono', monospace;
`;
