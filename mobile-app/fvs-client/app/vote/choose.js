import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import Heading from "../../components/Heading";
import Typography from "../../components/Typography";
import Button from "../../components/Button";

export default function ChooseCandidatePage() {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Heading text="FVS" />
        <Typography>Select a candidate from below and tap vote!</Typography>
      </View>
      <ScrollView style={styles.main}>
        <Heading level={2} text="Candidate 1" />
        <Image
          style={styles.image}
          source={{ uri: "https://picsum.photos/320" }}
        />
        <View style={styles.btnContainer}>
          <Button label="Vote" variant="primary" />
        </View>
        <Heading level={2} text="Candidate 2" />
        <Image
          style={styles.image}
          source={{ uri: "https://picsum.photos/320" }}
        />
        <View style={styles.btnContainer}>
          <Button label="Vote" variant="primary" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  image: {
    marginTop: 19,
    width: 320,
    height: 175,
  },
  main: {
    marginTop: 12,
  },
  btnContainer: {
    marginTop: 11,
    width: "100%",
    alignItems: "center",
    marginBottom: 18,
  },
});
