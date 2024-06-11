import React from "react";
import Svg, { Path, Mask, G } from "react-native-svg";
import { SvgProps } from "react-native-svg";

const ArrowCircleIcon: React.FC<SvgProps> = (props) => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
    <Mask
      id="mask0_287_2421"
      //   style={{ maskType: "luminance" }}
      maskUnits="userSpaceOnUse"
      x="1"
      y="1"
      width="22"
      height="22"
    >
      <Path
        d="M12 22C17.523 22 22 17.523 22 12C22 6.477 17.523 2 12 2C6.477 2 2 6.477 2 12C2 17.523 6.477 22 12 22Z"
        fill="white"
        stroke="white"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <Path
        d="M10.5 16.5L15 12L10.5 7.5"
        stroke="black"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Mask>
    <G mask="url(#mask0_287_2421)">
      <Path d="M0 0H24V24H0V0Z" fill="white" />
    </G>
  </Svg>
);

export default ArrowCircleIcon;
