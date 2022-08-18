import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Button,
  Image,
  Modal,
  Dimensions,
  Pressable,
  Route,
} from "react-native";

import { RootTabScreenProps, RootStackParamList } from "../types";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";

const dimensions = Dimensions.get("window");
const modalHeight = Math.round(dimensions.height * 0.6);
const modalWidth = dimensions.width * 0.93;

type homeScreenProp = StackNavigationProp<RootStackParamList, "Camera">;

export default function MatchModal(props) {
  const navigation = useNavigation<homeScreenProp>();

  const { matchingDetails, setMatch } = props;

  const handleOnPressMap = () => {
    setMatch(false);
    return navigation.navigate("Map");
  };

  const handleOnPressForest = () => {
    setMatch(false);
    return navigation.navigate("Forest");
  };

  return (
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <View style={styles.textboxTop}>
          <Text style={styles.textInsideTextbox}>Congratulations!</Text>
          <View style={styles.animal}>
            <Image
              style={styles.animalImage}
              source={require("../assets/images/fox.png")}
            />
          </View>
        </View>

        <View style={styles.textboxMid}>
          <Text style={styles.textInsideTextbox}>
            A {props.matchingDetails.common_names[0]} tree is being added to
            your forest!
          </Text>
        </View>

        <View style={styles.buttonBoxBottom}>
          <Pressable style={styles.leftPressable} onPress={handleOnPressMap}>
            <Text style={styles.leftPressableText}>Map</Text>
          </Pressable>
          <Pressable
            style={styles.rightPressable}
            onPress={handleOnPressForest}
          >
            <Text style={styles.rightPressableText}>Forest</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    height: modalHeight,
    width: modalWidth,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },

  textboxTop: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    height: "20%",
    width: "90%",
    position: "absolute",
    top: 70,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  textboxMid: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    height: "20%",
    width: "90%",
    position: "absolute",
    top: 180,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },

  textInsideTextbox: {
    fontSize: 18,
    color: "black",
  },
  animal: {
    backgroundColor: "#69a297",
    borderRadius: 50,
    padding: 10,
    marginLeft: 20,
    borderColor: "#ff7733",
    borderWidth: 3,
  },
  animalImage: {
    height: 40,
    width: 40,
  },
  buttonBoxBottom: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    height: "20%",
    width: "90%",
    position: "absolute",
    bottom: 70,
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  leftPressable: {
    backgroundColor: "#ff7733",
    borderRadius: 20,
    padding: 20,
    paddingHorizontal: 30,
  },
  leftPressableText: {
    fontSize: 20,
    fontWeight: "500",
    color: 'white'
  },
  rightPressable: {
    borderRadius: 20,
    backgroundColor: "#69a297",
    padding: 20,
    paddingHorizontal: 30,
  },
  rightPressableText: {
    fontSize: 20,
    fontWeight: "500",
    color: 'white'
  },
});
