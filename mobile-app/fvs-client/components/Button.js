import { Link } from "expo-router";
import { Pressable, StyleSheet, Text } from "react-native";

export default function Button(props) {
  console.log(styles);
  if (props.link !== null && props.link !== undefined && props.link !== "") {
    return (
      <Link href={props.link} asChild style={props.style}>
        <Pressable style={styles[props.variant]}>
          <Text style={styles[props.variant + "Text"]}>{props.label}</Text>
        </Pressable>
      </Link>
    );
  }

  return (
    <Pressable
      style={[styles[props.variant], props.style]}
      onPress={props.onPress}
    >
      <Text style={styles[props.variant + "Text"]}>{props.label}</Text>
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
