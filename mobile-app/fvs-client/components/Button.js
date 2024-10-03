import { Link } from "expo-router";
import { Pressable, StyleSheet, Text } from "react-native";

export default function Button({ label, onPress, variant, link }) {
  console.log(styles);

  if (link !== null && link !== undefined && link !== "") {
    return (
      <Link href={link} asChild>
        <Pressable style={styles[variant]}>
          <Text style={styles[variant + "Text"]}>{label}</Text>
        </Pressable>
      </Link>
    );
  }

  return (
    <Pressable style={styles[variant]} onPress={onPress}>
      <Text style={styles[variant + "Text"]}>{label}</Text>
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
