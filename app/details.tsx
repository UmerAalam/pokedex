import { useLocalSearchParams } from "expo-router";
import { ScrollView, Text } from "react-native";

export default function Details() {
  const params = useLocalSearchParams();
  return (
    <ScrollView contentContainerStyle={{ gap: 16, padding: 16 }}>
      <Text>{params.name}</Text>
    </ScrollView>
  );
}
