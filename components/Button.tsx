import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  onPress: () => void;
};

export default function Button({ onPress }: Props) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.buttonContainer}>
        <View style={styles.background}>
          <View style={styles.innerContent}>
            <Ionicons name="image" size={20} />
            <Text style={styles.text}> Choose a photo</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    height: 68,
    borderColor: "yellow",
    borderWidth: 3.2,
    borderRadius: 15,
    padding: 5,
  },
  background: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 7,
  },
  innerContent: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
  },
});
