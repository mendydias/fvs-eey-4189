import { Link } from "expo-router";
import {
  GestureResponderEvent,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
} from "react-native";

type ButtonProps = {
  link?: string;
  style?: StyleProp<TextStyle>;
  viewVariant: "primary" | "secondary";
  textVariant: "primaryText" | "secondaryText";
  label: string;
  onPress?: (event: GestureResponderEvent) => void;
};

export default function Button(props: ButtonProps) {
  if (props.link !== null && props.link !== undefined && props.link !== "") {
    return (
      <Link href={props.link} asChild style={props.style}>
        <Pressable style={styles[props.viewVariant]}>
          <Text style={styles[props.textVariant]}>{props.label}</Text>
        </Pressable>
      </Link>
    );
  }

  return (
    <Pressable
      style={[styles[props.viewVariant], props.style]}
      onPress={props.onPress}
      role="button"
    >
      <Text style={styles[props.textVariant]}>{props.label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  primary: {
    width: 105,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2D3648",
    borderRadius: 4,
  },
  primaryText: {
    color: "#fff",
  },
  secondary: {
    width: 105,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderRadius: 4,
    borderColor: "#2D3648",
  },
  secondaryText: {
    color: "#2D3648",
  },
});
