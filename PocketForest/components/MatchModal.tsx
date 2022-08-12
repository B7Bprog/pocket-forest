import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Button,
  Image,
  Modal,
  Dimensions,
} from "react-native";

const dimensions = Dimensions.get("window");
const modalHeight = Math.round(dimensions.height * 0.6);
const modalWidth = dimensions.width * 0.93;

export default function MatchModal(props) {
  console.log(props, "in MatchModal");

  return (
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <View style={styles.textbox}>
          <Text style={styles.textInsideTextbox}>Congratulations!</Text>
          <View style={styles.animal}>
            <Image
              style={styles.animalImage}
              source={require("../assets/images/fox.png")}
            />
          </View>
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
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
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

  textbox: {
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
  textInsideTextbox: {
    fontSize: 18,
    color: "black",
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
