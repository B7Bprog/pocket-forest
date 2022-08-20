import React, { useEffect, useState, useContext } from "react";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  Pressable,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { UserContext } from "../contexts/User";

export default function Map() {
  const [errorMsg, setErrorMsg] = useState(null);
  const [trees, setTrees] = useState(null);
  const [mapRegion, setMapRegion] = useState(null);
  const [treeDistance, setTreeDistance] = useState(0);
  const [closeEnough, setCloseEnough] = useState(false);
  const [selectedTree, setSelectedTree] = useState("");
  const [selectedTreeId, setSelectedTreeId] = useState("");

  const navigation = useNavigation();
  const { loggedInUser } = useContext(UserContext);

  let foxMessage;
  let alertIcon;

  if (closeEnough) {
    foxMessage = (
      <Pressable
        onPress={() => {
          navigation.navigate("Camera", {
            selectedTree: selectedTree,
            selectedTreeId: selectedTreeId,
          });
        }}
      >
        <Text style={styles.textInsideTextbox}>
          Let's <Text style={styles.click}>add this tree</Text> to our forest!
        </Text>
      </Pressable>
    );
    alertIcon = (
      <View style={[styles.alert, styles.primaryColour]}>
        <FontAwesome5
          name={"exclamation"}
          size={20}
          style={{ color: "white" }}
        />
      </View>
    );
  } else if (!closeEnough && treeDistance) {
    foxMessage = (
      <Text style={styles.textInsideTextbox}>
        You are {Math.round(treeDistance)}m away, keep going!
      </Text>
    );
    alertIcon = (
      <View style={[styles.alert, styles.secondaryColour]}>
        <FontAwesome5
          name={"exclamation"}
          size={20}
          style={{ color: "white" }}
        />
      </View>
    );
  } else {
    foxMessage = (
      <Text style={styles.textInsideTextbox}>
        Hi {loggedInUser}! Let's go find some trees!
      </Text>
    );
  }

  useEffect(() => {
    const apiURL = `https://pocket-forest.herokuapp.com/api/all-trees`;
    fetch(apiURL)
      .then((response) => response.json())
      .then((response) => {
        setTrees(response);
      })
      .catch((err) => {
        alert("fetch tree data");
        console.log(err, "error in newTreeImgUrls");
      });
  }, []);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setMapRegion({
        longitude: location.coords.longitude,
        latitude: location.coords.latitude,
        longitudeDelta: 0.0012,
        latitudeDelta: 0.0021,
      });
    })();
  }, []);

  function measure(lat1, lon1, lat2, lon2) {
    // generally used geo measurement function
    var R = 6378.137; // Radius of earth in KM
    var dLat = (lat2 * Math.PI) / 180 - (lat1 * Math.PI) / 180;
    var dLon = (lon2 * Math.PI) / 180 - (lon1 * Math.PI) / 180;
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d * 1000; // meters
  }

  function handleOnPress() {
    const radiusEarth = 6378137; // Radius of earth in KM
    const φ1 = (this.coordinate.latitude * Math.PI) / 180; // φ, λ in radians
    const φ2 = (mapRegion.latitude * Math.PI) / 180;
    const Δφ =
      ((mapRegion.latitude - this.coordinate.latitude) * Math.PI) / 180;
    const Δλ =
      ((mapRegion.longitude - this.coordinate.longitude) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = radiusEarth * c;

    if (distance < 30) {
      setCloseEnough(true);
      setSelectedTree(this.species);
      setSelectedTreeId(this.id);
    } else {
      setTreeDistance(distance);
      setCloseEnough(false);
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <MapView style={styles.map} initialRegion={mapRegion}>
        {mapRegion && (
          <Marker
            coordinate={mapRegion}
            title="Me"
            description="This is my current location"
          >
            <View style={styles.circle}>
              <View style={styles.stroke}>
                <View style={styles.core}></View>
              </View>
            </View>
          </Marker>
        )}

        {trees &&
          trees.map((tree) => (
            <Marker
              coordinate={{
                latitude: +tree.latitude,
                longitude: +tree.longitude,
              }}
              title={tree.name}
              description={tree.description}
              species={tree.species}
              id={tree._id}
              key={tree._id}
              onPress={handleOnPress}
            >
              <FontAwesome5
                name="tree"
                size={26}
                style={{ color: "#00ff6a" }}
              />
            </Marker>
          ))}
      </MapView>
      <View style={styles.textbox}>
        {alertIcon}
        {foxMessage}
        <View style={styles.animal}>
          <Image
            style={styles.animalImage}
            source={require("../assets/images/fox.png")}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  circle: {
    width: 26,
    height: 26,
    borderRadius: 50,
    shadowColor: "#555",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.9,
  },
  stroke: {
    width: 26,
    height: 26,
    borderRadius: 50,
    backgroundColor: "#fff",
    zIndex: 1,
  },
  core: {
    width: 24,
    height: 24,
    position: "absolute",
    left: 1,
    top: 1,
    right: 1,
    bottom: 1,
    backgroundColor: "red",
    zIndex: 2,
    borderRadius: 50,
  },
  textbox: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    height: "15%",
    width: "100%",
    position: "absolute",
    bottom: 0,
    flex: 1,

    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    paddingLeft: 20,
  },
  textInsideTextbox: {
    fontSize: 16,
    color: "black",
  },
  animal: {
    backgroundColor: "#69a297",
    borderRadius: 50,
    padding: 10,
    marginLeft: 20,
    borderColor: "#ff7733",
    borderWidth: 3,
    position: "absolute",
    right: 20,
  },
  animalImage: {
    height: 40,
    width: 40,
  },
  alert: {
    position: "absolute",
    right: 35,
    top: -25,
    backgroundColor: "#ff7733",
    width: 35,
    height: 35,
    borderRadius: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  primaryColour: {
    backgroundColor: "#ff7733",
  },
  secondaryColour: {
    backgroundColor: "#69a297",
  },
  click: {
    color: "#ff7733",
  },
});
