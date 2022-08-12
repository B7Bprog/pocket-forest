import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Button,
  Image,
} from "react-native";
import { useCallback, useEffect, useRef, useState } from "react";
import { Camera } from "expo-camera";
import { shareAsync } from "expo-sharing";
import * as MediaLibrary from "expo-media-library";

export default function CameraPage() {
  let cameraRef = useRef();
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
  const [photo, setPhoto] = useState();
  const [plantData, setPlantData] = useState();

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const mediaLibraryPermission =
        await MediaLibrary.requestPermissionsAsync();
      setHasCameraPermission(cameraPermission.status === "granted");
      setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted");
    })();
  }, []);

  if (hasCameraPermission === undefined) {
    return <Text>Requesting permissions...</Text>;
  } else if (!hasCameraPermission) {
    return (
      <Text>
        Permission for camera not granted. Please change this in settings.
      </Text>
    );
  }

  let takePic = async () => {
    let options = {
      quality: 1,
      base64: true,
      exif: false,
    };

    let newPhoto = await cameraRef.current.takePictureAsync(options);
    setPhoto(newPhoto);
  };

  if (photo) {
    const uploadPic = () => {
      Promise.resolve(photo.base64).then((base64files) => {
        //console.log(base64files);
        const data = {
          api_key: "dOlliWXgIAihBnx1uDmtApkDXNQQes0kBqjtZ1ggaZOZVh2gSD",
          images: [`image/jpeg;base64,${base64files}`],
          // modifiers docs: https://github.com/flowerchecker/Plant-id-API/wiki/Modifiers
          modifiers: ["crops_fast", "similar_images"],
          plant_language: "en",
          // plant details docs: https://github.com/flowerchecker/Plant-id-API/wiki/Plant-details
          plant_details: [
            "common_names",
            "url",
            "name_authority",
            "wiki_description",
            "taxonomy",
            "synonyms",
          ],
        };
        fetch("https://api.plant.id/v2/identify", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
          .then((response) => {
            // console.log(response, "<<< response");
            return response.json();
          })
          .then((data) => {
            setPlantData(data);
            console.log("Success:", data);
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      });
    };

    const sharePic = () => {
      shareAsync(photo.uri).then(() => {
        setPhoto(undefined);
      });
    };

    const savePhoto = () => {
      MediaLibrary.saveToLibraryAsync(photo.uri).then(() => {
        setPhoto(undefined);
      });
    };

    return (
      <SafeAreaView style={styles.container}>
        <Image
          style={styles.preview}
          source={{ uri: "data:image/jpg;base64," + photo.base64 }}
        />
        <Button title="upload" onPress={uploadPic} />

        <Button title="Share" onPress={sharePic} />
        {hasMediaLibraryPermission ? (
          <Button title="Save" onPress={savePhoto} />
        ) : undefined}
        <Button title="Discard" onPress={() => setPhoto(undefined)} />
      </SafeAreaView>
    );
  }

  return (
    <Camera style={styles.container} ref={cameraRef}>
      <View style={styles.buttonContainer}>
        <Button title="" onPress={takePic} />
      </View>
      <StatusBar style="auto" />
    </Camera>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:"row",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  buttonContainer: {
    backgroundColor: "#00b894",
    justifyContent: "center",
    alignItems: "flex-end",
    height: 100,
    width: 100,
    borderRadius: 50,
    marginBottom: 50,
  },
  preview: {
    alignSelf: "stretch",
    flex: 1,
  },
});
