import { Text, TextProps } from "./themed";

export function UrbanistText(props: TextProps) {
  return (
    <Text {...props} style={[props.style, { fontFamily: "UrbanistItalic" }]} />
  );
  // return <Text {...props} style={[props.style, { fontFamily: "SpaceMono" }]} />;
}
