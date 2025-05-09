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
import IconButton from "../../components/IconButton";
import { router } from "expo-router";
import * as LocalAuthentication from "expo-local-authentication";

async function handleVote(url: string) {
  const result = await LocalAuthentication.authenticateAsync({
    promptMessage: "Please authenticate to vote",
  });
  if (result.success) {
    router.push(url);
  }
}

export default function ChooseCandidatePage() {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={styles.logoWrapper}>
          <Heading text="FVS" />
          <IconButton
            link="/"
            style={{
              position: "absolute",
              right: 0,
            }}
          />
        </View>
        <Typography>Select a candidate from below and tap vote!</Typography>
      </View>
      <ScrollView style={styles.main}>
        <Heading level={2} text="Candidate 1" />
        <Image
          style={styles.image}
          source={{ uri: "https://picsum.photos/320" }}
        />
        <View style={styles.btnContainer}>
          <Button
            label="Vote"
            textVariant="primaryText"
            viewVariant="primary"
            onPress={() =>
              handleVote("/vote/result?status=0&candidate=candidate 1")
            }
          />
        </View>
        <Heading level={2} text="Candidate 2" />
        <Image
          style={styles.image}
          source={{ uri: "https://picsum.photos/320" }}
        />
        <View style={styles.btnContainer}>
          <Button
            label="Vote"
            viewVariant="primary"
            textVariant="primaryText"
            onPress={() =>
              handleVote("/vote/result?status=0&candidate=candidate 2")
            }
          />
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
  logoWrapper: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
});
