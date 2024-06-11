import React from "react";
import Svg, { Path } from "react-native-svg";
import { SvgProps } from "react-native-svg";

const SearchIcon: React.FC<SvgProps> = (props) => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      d="M11 18C14.866 18 18 14.866 18 11C18 7.13401 14.866 4 11 4C7.13401 4 4 7.13401 4 11C4 14.866 7.13401 18 11 18Z"
      stroke="white"
      stroke-width="2"
    />
    <Path
      d="M20 20L17 17"
      stroke="white"
      stroke-width="2"
      stroke-linecap="round"
    />
  </Svg>
);

export default SearchIcon;
