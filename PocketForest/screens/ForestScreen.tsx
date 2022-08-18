import {
  StyleSheet,
  Button,
  Image,
  ImageBackground,
  Pressable,
  TouchableHighlight,
  ScrollView,
} from "react-native";
import { Text, View } from "../components/Themed";
import { RootTabScreenProps, RootStackParamList } from "../types";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { getTrees } from "../utils/api";
import { useState, useContext, useEffect } from "react";
import { UserContext } from "../contexts/User";
import { FontAwesome5 } from "@expo/vector-icons";

type homeScreenProp = StackNavigationProp<RootStackParamList, "Home">;

const exampleImage = {
  img: {
    uri: "https://www.homestratosphere.com/wp-content/uploads/2019/07/Red-maple.jpg",
  },
};

export default function ForestPage() {
  const image = {
    uri: "https://img.freepik.com/free-vector/misty-landscape-with-fog-pine-forest-mountain-slopes-illustration-nature-scene_1150-37301.jpg?w=1800&t=st=1660227623~exp=1660228223~hmac=41f17c953452b51388c7841bc44922934313643e7b0d3ec95d1da77b06f1129f",
  };

  const navigation = useNavigation<homeScreenProp>();

  const [trees, setTrees] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const { loggedInUser } = useContext(UserContext);

  useEffect(() => {

    getTrees().then((trees) => {
      setTrees(trees);
    });
  }, []);

  const userTrees = trees.filter((tree) => {
    tree.username.includes(loggedInUser);
  });

  const filterByTags = [loggedInUser];

  const filterByTagSet = new Set(filterByTags);

  const result = trees.filter((o) =>
    o.username.some((username) => filterByTagSet.has(username))
  );

  function arrayHasKey(arr, key) {
    type ObjectKey = keyof typeof obj;

    const myVar = key as ObjectKey;

    for (const obj of arr) {
      if (key in obj) {
        return obj[myVar];
      }
    }
    return false;
  }

  return (
    <ImageBackground
      source={image}
      resizeMode="cover"
      style={styles.backgroundImage}
    >
      <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
          <View style={styles.innerContainer}>
            <View style={styles.cardsSection}>
              {result.map((tree) => (
                <TouchableHighlight
                  key={tree._id}
                  style={styles.cardTouchable}
                  onPress={() =>
                    navigation.navigate("SingleTreePage", { tree })
                  }
                >
                  <View style={styles.card}>
                    <View style={styles.imageWrapper}>
                      {tree.users_image_url.length > 0 ? (
                        <Image
                          style={styles.forestImage}
                          source={{
                            url: arrayHasKey(
                              tree.users_image_url,
                              loggedInUser
                            ),
                          }}
                        />
                      ) : (
                        <Image
                          style={styles.forestImage}
                          source={exampleImage.img}
                        />
                      )}

                    </View>
                    <View style={styles.textWrapper}>
                      <Text style={styles.cardTitle}>{tree.name}</Text>
                    </View>
                  </View>
                </TouchableHighlight>
              ))}
            </View>

            <Pressable style={styles.homeButton} onPress={() => navigation.navigate('Home')} >
              <FontAwesome5
                name="home"
                size={26}
                style={{ color: "#fff" }}
              />
              <Text style={styles.homeButtonText}>Home</Text>
            </Pressable>
          </View>

        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    height: "100%",
    backgroundColor: "rgba(0,0,0, 0.60)",
  },
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  backgroundImage: {
    height: "100%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  cardsSection: {
    display: "flex",
    justifyContent: "flex-start",
    alignContent: "center",
    flexDirection: "row",
    width: "90%",
    backgroundColor: "transparent",
    margin: 20,
    flexWrap: "wrap",
  },
  cardTouchable: {
    height: 200,
    display: "flex",
    width: "44%",
    margin: 10,
    borderRadius: 20,
  },
  card: {
    borderRadius: 20,
    backgroundColor: '#fff3b0',
    alignSelf: 'stretch',
    shadowColor: 'black',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.9
  },
  cardTitle: {
    fontSize: 18,
    color: 'black',
    textAlign: 'center',
    fontWeight: '500'
  },
  imageWrapper: {
    height: 110,
    width: "100%",
    overflow: "hidden",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  forestImage: {
    height: "100%",
    width: "100%",
    resizeMode: "cover",
  },
  textWrapper: {
    backgroundColor: "transparent",
    padding: 20,
    textAlign: "center",
    display: "flex",
    alignContent: "center",
    justifyContent: "center",
    height: "45%",
  },
  innerContainer: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    marginTop: 30,
    marginBottom: 50,
  },
  homeButton: {
    borderRadius: 20,
    backgroundColor: '#69a297',
    padding: 15,
    paddingHorizontal: 30,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    height: 80
  },
  homeButtonText: {
    fontSize: 20,
    fontWeight: "500",
    color: 'white',
    marginLeft: 15
  }
});
