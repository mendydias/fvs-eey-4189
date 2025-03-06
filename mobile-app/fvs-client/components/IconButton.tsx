import { MaterialIcons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { Pressable, StyleProp, TextStyle } from "react-native";

type IconButtonProps = {
  link: string;
  style: StyleProp<TextStyle>;
};

export default function IconButton({ link, style }: IconButtonProps) {
  return (
    <Link href={link} asChild style={style}>
      <Pressable>
        <MaterialIcons name="logout" size={38} color="#2D3648" />
      </Pressable>
    </Link>
  );
}
