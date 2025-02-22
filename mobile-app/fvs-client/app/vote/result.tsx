import { Image, StyleSheet, View } from "react-native";
import Heading from "../../components/Heading";
import Typography from "../../components/Typography";
import { useLocalSearchParams } from "expo-router";
import Button from "../../components/Button";

export default function ResultPage() {
  const params = useLocalSearchParams();
  const status = Number(params.status);
  const statusMsg = status === 0 ? "Failed" : "Successful";

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Heading text="FVS" />
      </View>
      <View style={styles.main}>
        <Image
          style={styles.img}
          source={{ uri: "https://picsum.photos/320" }}
        />
      </View>
      <View style={{ flex: 1 }}>
        <Typography>
          Your vote for {params.candidate[0]} {status === 0 ? "has" : "was"}
        </Typography>
        <Heading text={statusMsg + "!"} />
        <View style={styles.btnContainer}>
          <Button
            viewVariant="primary"
            textVariant="primaryText"
            label="Exit"
            link="/vote/choose"
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  img: {
    width: 320,
    height: 320,
  },
  main: {
    flex: 2,
    alignItems: "center",
  },
  header: {
    flex: 1,
    justifyContent: "center",
  },
  btnContainer: {
    marginTop: 48,
    width: "100%",
    alignItems: "center",
  },
});
