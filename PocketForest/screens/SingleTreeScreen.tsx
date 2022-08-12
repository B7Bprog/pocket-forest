import { Text, View } from "../components/Themed";
import { Platform, StyleSheet } from "react-native";

export default function SingleTreePage(props) {
  const { treeInfo } = props;
  console.log(props.route.params.treeInfo, "IN SINGLE TREE");
  console.log(props, "IN SINGLE TREE Props");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Single Tree View</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
});
