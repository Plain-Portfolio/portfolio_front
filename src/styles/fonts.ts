import { css } from "styled-components";

import Black from "../fonts/Pretendard-Black.subset.woff2";
import Bold from "../fonts/Pretendard-Bold.subset.woff2";
import ExtraBold from "../fonts/Pretendard-ExtraBold.subset.woff2";
import ExtraLight from "../fonts/Pretendard-ExtraLight.subset.woff2";
import Light from "../fonts/Pretendard-Light.subset.woff2";
import Medium from "../fonts/Pretendard-Medium.subset.woff2";
import Regular from "../fonts/Pretendard-Regular.subset.woff2";
import SemiBold from "../fonts/Pretendard-SemiBold.subset.woff2";
import Thin from "../fonts/Pretendard-Thin.subset.woff2";

export const fonts = css`
  @font-face {
    font-family: "Pretendard";
    font-weight: 900;
    font-display: swap;
    src: url(${Black}) format("woff2");
  }
  @font-face {
    font-family: "Pretendard";
    font-weight: 800;
    font-display: swap;
    src: url(${ExtraBold}) format("woff2");
  }
  @font-face {
    font-family: "Pretendard";
    font-weight: 700;
    font-display: swap;
    src: url(${Bold}) format("woff2");
  }

  @font-face {
    font-family: "Pretendard";
    font-weight: 600;
    font-display: swap;
    src: url(${SemiBold}) format("woff2");
  }
  @font-face {
    font-family: "Pretendard";
    font-weight: 500;
    font-display: swap;
    src: url(${Medium}) format("woff2");
  }
  @font-face {
    font-family: "Pretendard";
    font-weight: 400;
    font-display: swap;
    src: url(${Regular}) format("woff2");
  }
  @font-face {
    font-family: "Pretendard";
    font-weight: 300;
    font-display: swap;
    src: url(${Light}) format("woff2");
  }
  @font-face {
    font-family: "Pretendard";
    font-weight: 200;
    font-display: swap;
    src: url(${ExtraLight}) format("woff2");
  }
  @font-face {
    font-family: "Pretendard";
    font-weight: 100;
    font-display: swap;
    src: url(${Thin}) format("woff2");
  }
`;
