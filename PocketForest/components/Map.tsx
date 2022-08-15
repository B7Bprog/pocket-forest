import React, { useEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { StyleSheet, Text, View, Dimensions, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function Map() {
  const image = {
    uri: "https://cdn-icons.flaticon.com/png/512/3704/premium/3704101.png?token=exp=1660229984~hmac=57e9dc9effe1a9c1bbae17c2de551045",
  };

  const [errorMsg, setErrorMsg] = useState(null);
  const [mapRegion, setMapRegion] = useState(null);
  const [treeDistance, setTreeDistance] = useState(0);
  const [closeEnough, setCloseEnough] = useState(false);
  const navigation = useNavigation();
  const [trees] = useState([
    {
      id: 1,
      title: "Unknown Tree",
      description: "try to add it to your Forest!",
      location: {
        latitude: 53.451657,
        longitude: -2.515016,
      },
      icon: "question",
    },
    {
      id: 2,
      title: "Unknown Tree",
      description: "try to add it to your Forest!",
      location: {
        latitude: 53.453316,
        longitude: -2.519637,
      },
      icon: "question",
    },
    {
      id: 3,
      title: "English Oak",
      description: "Added to your forest 09/08/22",
      location: {
        latitude: 53.450312,
        longitude: -2.530635,
      },
      icon: "tree",
    },
    {
      id: 4,
      title: "Tree in my garden",
      description: "Added to your forest 09/08/22",
      location: {
        latitude: 53.45394162343724,
        longitude: -2.5236933834300235,
      },
      icon: "tree",
    },
  ]);

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

  function handleOnPress() {
    const deltaLatitude = Math.pow(
      this.coordinate.latitude - mapRegion.latitude,
      2
    );
    const deltaLongitude = Math.pow(
      this.coordinate.longitude - mapRegion.longitude,
      2
    );
    const distance = Math.sqrt(deltaLatitude + deltaLongitude) * 111139;

    if (distance < 20) {
      console.log("close enough");
      setCloseEnough(true);
    } else {
      setTreeDistance(distance);
      console.log(
        `you are ${Math.round(distance)} meters away, please get closer`
      );
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
        {trees
          ? trees.map((tree) => (
              <Marker
                coordinate={tree.location}
                title={tree.title}
                description={tree.description}
                key={tree.id}
                onPress={handleOnPress}
              >
                <FontAwesome5
                  name={tree.icon}
                  size={26}
                  style={{ color: "#00ff6a" }}
                />
              </Marker>
            ))
          : null}
      </MapView>
      {!treeDistance && (
        <View style={styles.textbox}>
          <Text style={styles.textInsideTextbox}>
            Let's go find some trees!
          </Text>
          <View style={styles.animal}>
            <Image
              style={styles.animalImage}
              source={{
                uri: "https://cdn-icons.flaticon.com/png/512/3704/premium/3704101.png?token=exp=1660229984~hmac=57e9dc9effe1a9c1bbae17c2de551045",
              }}
            />
          </View>
        </View>
      )}
      {/* <View style={styles.textbox}>
        <Text>hello</Text>
       </View>
       <View style={styles.textbox}>
        {
          !treeDistance && <Text style={styles.textInsideTextbox}>Find some lovely trees near you!</Text>
        }
        {
          !closeEnough && <Text style={styles.textInsideTextbox}>You are {Math.round(treeDistance)}m away, keep going!</Text>
        }
        {
          closeEnough && <Button 
          title="Let's add this tree to our forest!"
          onPress={() => navigation.navigate("Camera")}
         />
        }
        </View> */}
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
    height: "12%",
    width: "100%",
    position: "absolute",
    bottom: 0,
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
