import { useState, useContext, useEffect } from 'react';
import { StyleSheet, Text, ScrollView, View, Image, ImageBackground, Pressable } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { RootTabScreenProps, RootStackParamList } from '../types';
import { UserContext } from '../contexts/User';

type homeScreenProp = StackNavigationProp<RootStackParamList, "Camera">;

export default function SingleTreePage({ route }) {

    const { treeId, result } = route.params;
    const [tree, setTree] = useState({})
    const { loggedInUser } = useContext(UserContext);

    const exampleImage = { img: { uri: "https://www.homestratosphere.com/wp-content/uploads/2019/07/Red-maple.jpg" } }

    const image = { uri: "https://img.freepik.com/free-vector/misty-landscape-with-fog-pine-forest-mountain-slopes-illustration-nature-scene_1150-37301.jpg?w=1800&t=st=1660227623~exp=1660228223~hmac=41f17c953452b51388c7841bc44922934313643e7b0d3ec95d1da77b06f1129f" };

    const navigation = useNavigation<homeScreenProp>();

    const handleOnPressHome = () => {
        return navigation.navigate("Home")
    };

    const handleOnPressMap = () => {
        return navigation.navigate("Map");
    };

    const handleOnPressForest = () => {
        return navigation.navigate("Forest");
    };

    useEffect(() => {
        fetch(`https://pocket-forest.herokuapp.com/api/trees/${treeId}`)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setTree(data)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [treeId])


    const picsArray = tree.users_image_url;

    console.log(picsArray);


    let treePic = undefined;


    if (picsArray) {
        const filteredArray = picsArray.filter((item) => {
            return item[loggedInUser]
        })

        treePic = filteredArray[0][loggedInUser]
    }

    return (
        <ImageBackground source={image} resizeMode="cover" style={styles.backgroundImage}>
            <ScrollView style={styles.scrollView}>
                <View style={styles.pageWrapper}>
                    <View style={styles.upperContainer}>
                        <View style={styles.title}>
                            <Text style={styles.titleText}>{tree.name}</Text>
                        </View>
                        <View style={styles.treeImageWrapper}>
                            {treePic ? <Image style={styles.treeImage}
                                source={{
                                    uri: treePic
                                }} />
                                : <Image style={styles.treeImage}
                                    source={exampleImage.img} />
                            }
                        </View>
                        <View style={styles.dateTime}>
                            <Text style={styles.text}>You found that tree at {tree.latitude} and {tree.longitude} on {tree.createdAt.slice(0, 10).split("-").reverse().join("-")}</Text>
                        </View>
                        <View style={styles.singleTreeInfo}>
                            <Text style={styles.text}>It belongs to the {tree.family} family.</Text>
                        </View>
                        <View style={styles.description}>
                            <Text style={styles.text}>{tree.description}</Text>
                        </View>
                    </View>
                    <View style={styles.bottomBoxButton}>
                        <Pressable style={styles.leftPressable} onPress={handleOnPressHome}>
                            <Text style={styles.leftPressableText}>Home</Text>
                        </Pressable>
                        <Pressable style={styles.centrePressable} onPress={handleOnPressMap}>
                            <Text style={styles.centrePressableText}>Map</Text>
                        </Pressable>
                        <Pressable style={styles.rightPressable} onPress={handleOnPressForest}>
                            <Text style={styles.rightPressableText}>Forest</Text>
                        </Pressable>
                    </View>
                </View>
            </ScrollView>
        </ImageBackground>
    )
}


const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: 'rgba(0,0,0, 0.60)',
    },
    backgroundImage: {
        height: '100%',
    },
    pageWrapper: {
        alignItems: 'center',
        height: '100%',
        display: 'flex',
        marginTop: 100,
        marginBottom: 130,
        width: '100%',
        position: "relative"
    },
    upperContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "80%",
        width: "90%",
        marginTop: "5%"
    },
    titleText: {
        color: 'white',
        fontSize: 30,
    },
    text: {
        color: 'white',
        zIndex: 1,
        fontSize: 20,
        paddingBottom: 2,
        lineHeight: 40
    },
    treeImageWrapper: {
        padding: 20
    },
    treeImage: {
        height: 300,
        width: 300,
        borderRadius: 20
    },
    bottomBoxButton: {
        backgroundColor: "transparent",
        height: "10%",
        width: "90%",
        position: "absolute",
        marginBottom: "20%",
        bottom: 1,
        flex: 1,
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
    },
    leftPressable: {
        backgroundColor: "green",
        borderColor: "green",
        borderRadius: 5,
        padding: 15,
        paddingHorizontal: 18,
        borderWidth: 3,
    },
    leftPressableText: {
        fontSize: 20,
        fontWeight: "500",
        color: "white"
    },
    centrePressable: {
        backgroundColor: "green",
        borderColor: "green",
        borderRadius: 5,
        padding: 15,
        paddingHorizontal: 18,
        borderWidth: 3,
    },
    centrePressableText: {
        fontSize: 20,
        fontWeight: "500",
        color: "white"
    },
    rightPressable: {
        borderRadius: 5,
        backgroundColor: "green",
        borderColor: "green",
        padding: 15,
        paddingHorizontal: 18,
        color: "green",
        borderWidth: 3,
    },
    rightPressableText: {
        fontSize: 20,
        fontWeight: "500",
        color: "white"
    },
})