import { View, StyleSheet, Pressable, Text } from "react-native";
import ImageViewer from "@/components/ImageViewer";
import Button from "@/components/Button";
import * as ImagePicker from "expo-image-picker";
import { useRef, useState } from "react";
import { type ImageSource } from "expo-image";
import CircleButton from "@/components/CircleButton";
import IconButton from "@/components/IconButton";
import EmojiPicker from "@/components/EmojiPicker";
import EmojiList from "@/components/EmojiList";
import EmojiSticker from "@/components/EmojiSticker";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as MediaLibrary from "expo-media-library";
import { captureRef } from "react-native-view-shot";

export default function Index() {
  const ImagePlaceholder = require("@/assets/images/background-image.png");
  const [selectedImage, setSelectedImage] = useState<string | ImageSource>(
    ImagePlaceholder
  );
  const [showAppOptions, setShowAppOptions] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [pickedEmoji, setPickedEmoji] = useState<ImageSource | undefined>(
    undefined
  );
  const imageRef = useRef<View>(null);
  const [status, requestPermission] = MediaLibrary.usePermissions();

  if (status === null) {
    requestPermission();
  }

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      handleSelectedImage(result.assets[0].uri);
      setShowAppOptions(true);
    } else {
      alert("You did not select any image.");
    }
  };

  const handleSelectedImage = (result: string) => {
    setSelectedImage(result);
  };

  const onReset = () => {
    setShowAppOptions(false);
  };

  const onAddSticker = () => {
    setIsModalVisible(true);
  };

  const onModalClose = () => {
    setIsModalVisible(false);
  };

  const onSaveImageAsync = async () => {
    try {
      const localUri = await captureRef(imageRef, {
        height: 440,
        quality: 1,
      });

      await MediaLibrary.saveToLibraryAsync(localUri);
      if (localUri) {
        alert("Saved!");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <View ref={imageRef} style={styles.imageContainer} collapsable={false}>
        <ImageViewer imgSource={selectedImage} />
        {pickedEmoji && (
          <EmojiSticker imageSize={40} stickerSource={pickedEmoji} />
        )}
      </View>
      <View style={{ height: 40 }} />
      <View style={{ flex: 1 / 3 }}>
        {showAppOptions ? (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <IconButton text="Reset" onPress={onReset} icon="refresh" />
            <CircleButton onPress={onAddSticker} />
            <IconButton
              text="Save"
              onPress={onSaveImageAsync}
              icon="save-alt"
            />
          </View>
        ) : (
          <View>
            <Button onPress={pickImage} />
            <Pressable
              style={{
                justifyContent: "center",
                flexDirection: "row",
                paddingVertical: 10,
              }}
              onPress={() => setShowAppOptions(true)}
            >
              <Text style={{ color: "white", fontWeight: "500", fontSize: 13 }}>
                Use this photo
              </Text>
            </Pressable>
          </View>
        )}
      </View>
      <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
        <EmojiList onSelect={setPickedEmoji} onCloseModal={onModalClose} />
      </EmojiPicker>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#25292e",
    flex: 1,
    alignItems: "stretch",
    paddingHorizontal: 20,
  },
  imageContainer: {
    flex: 1,
  },
});
