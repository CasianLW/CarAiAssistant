import React from "react";
import Svg, { Path, ClipPath, Rect, G, Defs } from "react-native-svg";
import { SvgProps } from "react-native-svg";

const GoogleIcon: React.FC<SvgProps> = (props) => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
    <G clipPath="url(#clip0)">
      <Path
        d="M8.36104 0.788944C5.96307 1.62082 3.89506 3.19976 2.46078 5.29382C1.02649 7.38789 0.301526 9.88671 0.392371 12.4233C0.483217 14.9598 1.38508 17.4004 2.9655 19.3864C4.54591 21.3725 6.72158 22.7995 9.17292 23.4577C11.1603 23.9705 13.2424 23.993 15.2404 23.5233C17.0504 23.1168 18.7238 22.2471 20.0967 20.9996C21.5256 19.6615 22.5627 17.9592 23.0967 16.0758C23.677 14.0277 23.7803 11.8738 23.3985 9.77957H12.2385V14.4089H18.7017C18.5725 15.1473 18.2957 15.852 17.8878 16.4809C17.48 17.1098 16.9494 17.6499 16.3279 18.0689C15.5387 18.591 14.649 18.9423 13.716 19.1002C12.7803 19.2742 11.8205 19.2742 10.8848 19.1002C9.9364 18.9041 9.03923 18.5127 8.25042 17.9508C6.9832 17.0538 6.03168 15.7794 5.53167 14.3096C5.02319 12.8122 5.02319 11.1888 5.53167 9.69144C5.88759 8.64185 6.47598 7.6862 7.25292 6.89582C8.14203 5.97472 9.26766 5.31631 10.5063 4.99284C11.745 4.66936 13.0488 4.69331 14.2748 5.06207C15.2325 5.35605 16.1083 5.8697 16.8323 6.56207C17.561 5.83707 18.2885 5.11019 19.0148 4.38144C19.3898 3.98957 19.7985 3.61644 20.1679 3.21519C19.0627 2.18671 17.7654 1.38643 16.3504 0.860194C13.7736 -0.0754498 10.9541 -0.100594 8.36104 0.788944Z"
        fill="white"
      />
      <Path
        d="M8.3607 0.789855C10.9536 -0.100288 13.7731 -0.0758051 16.3501 0.85923C17.7654 1.38904 19.062 2.19318 20.1657 3.22548C19.7907 3.62673 19.3951 4.00173 19.0126 4.39173C18.2851 5.11798 17.5582 5.84173 16.832 6.56298C16.1079 5.87061 15.2321 5.35696 14.2745 5.06298C13.0489 4.69293 11.7451 4.6676 10.5061 4.98975C9.26712 5.3119 8.14079 5.9691 7.2507 6.88923C6.47377 7.67961 5.88538 8.63526 5.52945 9.68486L1.64258 6.67548C3.03384 3.91653 5.44273 1.80615 8.3607 0.789855Z"
        fill="#E33629"
      />
      <Path
        d="M0.611401 9.65605C0.820316 8.62067 1.16716 7.61798 1.64265 6.6748L5.52953 9.69168C5.02105 11.1891 5.02105 12.8124 5.52953 14.3098C4.23453 15.3098 2.9389 16.3148 1.64265 17.3248C0.452308 14.9554 0.0892746 12.2557 0.611401 9.65605Z"
        fill="#F8BD00"
      />
      <Path
        d="M12.2381 9.77832H23.3981C23.7799 11.8726 23.6766 14.0264 23.0963 16.0746C22.5623 17.958 21.5252 19.6602 20.0963 20.9983C18.8419 20.0196 17.5819 19.0483 16.3275 18.0696C16.9494 17.6501 17.4802 17.1094 17.8881 16.4798C18.296 15.8503 18.5726 15.1448 18.7013 14.4058H12.2381C12.2363 12.8646 12.2381 11.3214 12.2381 9.77832Z"
        fill="#587DBD"
      />
      <Path
        d="M1.64062 17.3246C2.93688 16.3246 4.2325 15.3196 5.5275 14.3096C6.02851 15.7799 6.98138 17.0544 8.25 17.9508C9.04126 18.5101 9.94037 18.8983 10.89 19.0908C11.8257 19.2648 12.7855 19.2648 13.7213 19.0908C14.6542 18.9329 15.5439 18.5816 16.3331 18.0596C17.5875 19.0383 18.8475 20.0096 20.1019 20.9883C18.7292 22.2366 17.0558 23.1068 15.2456 23.5139C13.2476 23.9836 11.1655 23.9611 9.17813 23.4483C7.60632 23.0286 6.13814 22.2888 4.86563 21.2752C3.51874 20.2059 2.41867 18.8583 1.64062 17.3246Z"
        fill="#319F43"
      />
    </G>
    <Defs>
      <ClipPath id="clip0">
        <Rect width="24" height="24" fill="white" />
      </ClipPath>
    </Defs>
  </Svg>
);

export default GoogleIcon;