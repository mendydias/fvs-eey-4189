import { VoterStoreProvider } from "@/models/voter";
import { Slot } from "expo-router";

export default function _layout() {
  return (
    <>
      <VoterStoreProvider>
        <Slot />
      </VoterStoreProvider>
    </>
  );
}
