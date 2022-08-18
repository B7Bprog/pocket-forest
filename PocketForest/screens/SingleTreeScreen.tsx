import { useState, useContext, useEffect } from 'react';
import { StyleSheet, Text, ScrollView, View, Image, ImageBackground, Pressable } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { RootTabScreenProps, RootStackParamList } from '../types';
import { UserContext } from '../contexts/User';
import { FontAwesome5 } from "@expo/vector-icons";


type homeScreenProp = StackNavigationProp<RootStackParamList, "Camera">;

export default function SingleTreePage({ route }) {

    const _id = route.params.tree._id;
    const [tree, setTree] = useState({})
    const { loggedInUser } = useContext(UserContext);

    { require('../assets/images/loading.gif') }

    const loadingImage = require('../assets/images/loading.gif')

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
        if (_id) {
            fetch(`https://pocket-forest.herokuapp.com/api/trees/${_id}`)
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    setTree(data)
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    }, [_id])

    const picsArray = tree.users_image_url;
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
                                    source={loadingImage} />
                            }
                        </View>
                        <View style={styles.textWrapper}>
                            <View style={styles.singleTreeInfo}>
                                <Text style={[styles.text, styles.familyText]}>{tree.family} family</Text>
                            </View>
                            <View style={styles.description}>
                                <Text style={styles.text}>{tree.description}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.bottomBoxButton}>
                        <Pressable style={styles.leftPressable} onPress={handleOnPressHome}>
                            <FontAwesome5
                                name="home"
                                size={26}
                                style={{ color: "#fff" }}
                            />
                            <Text style={styles.leftPressableText}>Home</Text>
                        </Pressable>
                        <Pressable style={styles.centrePressable} onPress={handleOnPressMap}>
                            <FontAwesome5
                                name="map"
                                size={26}
                                style={{ color: "#fff" }}
                            />
                            <Text style={styles.centrePressableText}>Map</Text>
                        </Pressable>
                        <Pressable style={styles.rightPressable} onPress={handleOnPressForest}>
                            <FontAwesome5
                                name="tree"
                                size={26}
                                style={{ color: "#fff" }}
                            />
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
        marginTop: 50,
        marginBottom: 130,
        width: '100%',
    },
    upperContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "80%",
        width: "90%",
        marginTop: "5%"
    },
    textWrapper: {
        width: '85%',
        backgroundColor: '#fff3b0',
        borderRadius: 20,
        padding: 20
    },
    titleText: {
        color: 'white',
        fontSize: 30,
    },
    familyText: {
        fontWeight: '500',
        fontSize: 18,
        paddingBottom: 10,
    },
    text: {
        color: 'black',
        zIndex: 1,
        fontSize: 16,
        paddingBottom: 2,
        lineHeight: 30
    },
    treeImageWrapper: {
        padding: 20,
        borderRadius: 20,
    },
    treeImage: {
        height: 450,
        width: 300,
        borderRadius: 20,
        resizeMode: 'cover'
    },
    bottomBoxButton: {
        backgroundColor: "transparent",
        height: "10%",
        width: "100%",
        display: 'flex',
        justifyContent: "space-around",
        alignItems: "center",
        flexDirection: "row",
    },
    leftPressable: {
        backgroundColor: "#69a297",
        borderRadius: 20,
        width: 100,
        padding: 15,
        paddingHorizontal: 18,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    leftPressableText: {
        fontSize: 20,
        fontWeight: "500",
        color: "white"
    },
    centrePressable: {
        backgroundColor: "#69a297",
        borderRadius: 20,
        width: 100,
        padding: 15,
        paddingHorizontal: 18,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    centrePressableText: {
        fontSize: 20,
        fontWeight: "500",
        color: "white"
    },
    rightPressable: {
        width: 100,
        borderRadius: 20,
        backgroundColor: "#69a297",
        padding: 15,
        paddingHorizontal: 18,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    rightPressableText: {
        fontSize: 20,
        fontWeight: "500",
        color: "white"
    },
})