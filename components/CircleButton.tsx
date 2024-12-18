import { View, StyleSheet, Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

type Props = {
  onPress: () => void;
};

export default function CircleButton({ onPress }: Props) {
  return (
    <Pressable onPress={onPress}>
      <View style={styles.outerContainer}>
        <View style={styles.innterContainer}>
          <MaterialIcons
            style={styles.icon}
            name="add"
            size={38}
            color={"#25292e"}
          />
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    height: 84,
    width: 84,
    borderRadius: 100,
    borderWidth: 4,
    borderColor: "#ffd33d",
    padding: 5,
  },
  innterContainer: {
    backgroundColor: "white",
    flex: 1,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {},
});
