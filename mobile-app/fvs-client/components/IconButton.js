import { MaterialIcons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { Pressable } from "react-native";

export default function IconButton({ link, style }) {
  return (
    <Link href={link} asChild style={style}>
      <Pressable>
        <MaterialIcons name="logout" size={38} color="#2D3648" />
      </Pressable>
    </Link>
  );
}
