import { StyleSheet, Text, ScrollView, View, Image, ImageBackground, Pressable } from 'react-native';
import { RootTabScreenProps, RootStackParamList } from '../types';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { useState, useContext, useEffect } from 'react';
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
                    <View style={styles.singleTreeInfo}>
                        <Text style={styles.text}>Belongs to {tree.family} family</Text>
                    </View>
                    <View style={styles.dateTime}>
                        <Text style={styles.text}>at {tree.latitude} and {tree.longitude}</Text>
                    </View>
                    <View style={styles.description}>
                        <Text style={styles.text}>{tree.description}</Text>
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
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        display: 'flex',
        marginTop: 50,
        marginBottom: 50,
        width: '100%'
    },
    titleText: {
        color: 'white',
        fontSize: 30
    },
    text: {
        color: 'white',
        zIndex: 1
    },
    treeImageWrapper: {
        padding: 20
    },
    treeImage: {
        height: 300,
        width: 300,
        borderRadius: 20
    }

})