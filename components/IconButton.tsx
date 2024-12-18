import { MaterialIcons } from "@expo/vector-icons";
import { View, StyleSheet, Text, Pressable } from "react-native";

type Props = {
  icon: keyof typeof MaterialIcons.glyphMap;
  text: string;
  onPress: () => void;
};

export default function IconButton({ icon, text, onPress }: Props) {
  return (
    <Pressable onPress={onPress}>
      <View style={styles.coloumn}>
        <MaterialIcons name={icon} size={24} color="#fff" />
        <Text style={styles.text}>{text}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  coloumn: {
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#fff",
    marginTop: 12,
  },
});
