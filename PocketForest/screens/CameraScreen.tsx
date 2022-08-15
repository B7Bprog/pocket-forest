import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Button,
  Image,
  Modal,
  Pressable,
} from "react-native";
import { useCallback, useEffect, useRef, useState } from "react";
import { Camera } from "expo-camera";
import { shareAsync } from "expo-sharing";
import * as MediaLibrary from "expo-media-library";
import { useNavigation } from "@react-navigation/native";
import { RootTabScreenProps, RootStackParamList } from "../types";
import { StackNavigationProp } from "@react-navigation/stack";
import MatchModal from "../components/MatchModal";
import NotMatchModal from "../components/NotMatchModal";

type cameraScreenProp = StackNavigationProp<RootStackParamList, "Camera">;

export default function CameraPage() {
  const navigation = useNavigation<cameraScreenProp>();

  const dummyTree = {
    coords: { latitude: 53.179332013090665, longitude: -2.883641382896462 },
    species: "Sorbus aucuparia",
  };

  let cameraRef = useRef();
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
  const [photo, setPhoto] = useState();
  const [plantData, setPlantData] = useState();
  const [match, setMatch] = useState(false);
  const [notMatch, setNotMatch] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (plantData) {
      if (
        plantData.suggestions[0].plant_details.scientific_name ===
        dummyTree.species
      ) {
        console.log("matching!");
        console.log(
          plantData.suggestions[0].plant_details,
          "plantData.suggestions[0].plant_details"
        );
        setMatch(true);
        setIsLoading(false);
      } else {
        setNotMatch(true);
        setIsLoading(false);
      }
    }
  }, [plantData]);
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
      setIsLoading(true);
      Promise.resolve(photo.base64).then((base64files) => {
        //console.log(base64files);
        const data = {
          api_key: "0QaJnCInVbv2wysEGzT5uZkAXFniTTNlMjVbR2qZqsAebjfKdP",
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

            // console.log("Success:", data);
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      });
    };

    useEffect(() => {
      if (match) {

        Promise.resolve(photo.base64).then((base64files) => {

          const options = { quality: 0.7, base64: true };
        
            let base64Img = `data:image/jpg;base64,${base64files}`;
            let apiUrl =
              'https://api.cloudinary.com/v1_1/pocketforest/image/upload';
            let data = {
              file: base64Img,
              upload_preset: 'treeUpload'
            };
      
            fetch(apiUrl, {
              body: JSON.stringify(data),
              headers: {
                'content-type': 'application/json'
              },
              method: 'POST'
            })
              .then(async response => {
                console.log('we did the thing')
                let data = await response.json();
                if (data.secure_url) {
                  console.log('we did it')
                  alert('Upload successful');
                }
              })
              .catch(err => {
                alert('Cannot upload');
              });

        })
            
      }
    }, [match])

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
      <View style={styles.container}>
        <Modal animationType="slide" transparent={true} visible={match}>
          <MatchModal
            setMatch={setMatch}
            matchingDetails={
              plantData && plantData.suggestions[0].plant_details
            }
          />
        </Modal>
        <Modal animationType="slide" transparent={true} visible={notMatch}>
          <NotMatchModal setNotMatch={setNotMatch} />
        </Modal>

        {isLoading && (
          <View style={styles.loadingMsgBox}>
            <Text style={styles.loadingMsgTxt}>Checking Tree Species...</Text>
            <View style={styles.animal}>
              <Image
                style={styles.animalImage}
                source={require("../assets/images/fox.png")}
              />
            </View>
          </View>
        )}

        <Image
          style={styles.preview}
          source={{ uri: "data:image/jpg;base64," + photo.base64 }}
        />
        {!match && !notMatch && !isLoading && (
          <View>
            <Button title="upload" onPress={uploadPic} />

            <Button title="Share" onPress={sharePic} />
            {hasMediaLibraryPermission ? (
              <Button title="Save" onPress={savePhoto} />
            ) : undefined}
            <Button title="Discard" onPress={() => setPhoto(undefined)} />
          </View>
        )}
      </View>
    );
  }

  return (
    <Camera style={styles.container} ref={cameraRef}>
      <View>
        <Pressable style={styles.button} onPress={takePic} />
      </View>
      <StatusBar style="auto" />
    </Camera>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    backgroundColor: "#fff",
    alignSelf: "flex-end",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  loadingMsgBox: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    height: "20%",
    width: "90%",
    position: "absolute",
    top: 300,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    zIndex: 100,
    borderRadius: 20,
    padding: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  loadingMsgTxt: {
    fontSize: 18,
    fontWeight: "500",
  },

  button: {
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

  animal: {
    backgroundColor: "#69a297",
    borderRadius: "50%",
    padding: 10,
    marginLeft: 20,
    borderColor: "#ff7733",
    borderWidth: 3,
  },
  animalImage: {
    height: 40,
    width: 40,
  },
});
