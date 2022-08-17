import { StyleSheet, Button, Image, ImageBackground, Pressable, TouchableHighlight, ScrollView } from 'react-native';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps, RootStackParamList } from '../types';
import {StackNavigationProp} from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { useState, useContext, useEffect } from 'react';
import { UserContext } from '../contexts/User';

type homeScreenProp = StackNavigationProp<RootStackParamList, "Camera">;

export default function SingleTreePage(props) {

    const image = { uri: "https://img.freepik.com/free-vector/misty-landscape-with-fog-pine-forest-mountain-slopes-illustration-nature-scene_1150-37301.jpg?w=1800&t=st=1660227623~exp=1660228223~hmac=41f17c953452b51388c7841bc44922934313643e7b0d3ec95d1da77b06f1129f" };
    const navigation = useNavigation<homeScreenProp>();
    const treeInfo = props.route.params.result;
      const {loggedInUser} = useContext(UserContext);


    console.log(treeInfo[0].createdAt, "<<<treeInfo");

    const handleOnPressHome = () => {
        return navigation.navigate("Home")
    };

    const handleOnPressMap = () => {
        return navigation.navigate("Map");
    };

    const handleOnPressForest = () => {
        return navigation.navigate("Forest");
    };
    
    return (
        <ImageBackground source={image} resizeMode="cover" style={styles.backgroundImage}>
        <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
                        
            <View style={styles.treeImage}>
                            <Image style={styles.forestImage} 
                source={{
                  uri: treeInfo[0].users_image_url[0][loggedInUser]
                }} />
            </View>
            <View style={styles.cardSection}>
            <View style={styles.title}>
                            <Text style={styles.titleText}>{treeInfo[0].name}</Text>
            </View>
                        <View style={styles.singleTreeInfo}>
                            <Text style={styles.family}>Belongs to {treeInfo[0].family} family</Text>
                        </View>
                        <View style={styles.dateTime}>
                            <Text style={styles.dateText}>found on {treeInfo[0].createdAt.slice(0, 10).split("-").reverse().join("-")}</Text>
                            <Text style={styles.placeText}>at {treeInfo[0].latitude} and {treeInfo[0].longitude}</Text>
                        </View>
                         <View style={styles.description}>
                            <Text style={styles.descriptionText}>{treeInfo[0].description}</Text>
                </View>
                </View>
                        
                    <View style={styles.buttonBoxBottom}>
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

{/* <Text style={styles.title}>Information about {matchingDetails.common_names[0]}:</Text>
            <Image
            source={{
              uri: 'https://www.gardeningknowhow.com/wp-content/uploads/2021/11/rowan-berries.jpg',
            }}
            />
            <Text>It belongs to {matchingDetails.structured_name.species} family</Text>
            <Text>{matchingDetails.wiki_description.value}</Text> */}
            {/* <Pressable style={styles.forestPressable}onPress={() => navigation.navigate('Forest')}><Text style={styles.forestPressableText}>Forest</Text></Pressable> */}

const styles = StyleSheet.create({

    backgroundImage: {
        height: '100%',
    },
    scrollView: {
        height: '100%',
        backgroundColor: 'rgba(0,0,0, 0.60)',
    },
    container: {
        display:"flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'transparent',
        // height: '100%'
    },
    // innerContainer: {
    //     flex: 1,
    //     width: '100%',
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     backgroundColor: 'transparent',
    //     marginTop: 30,
    //     marginBottom: 50
    // },
    cardSection: {
        // display: 'flex',
        // justifyContent: 'flex-start',
        // alignContent: 'center',
        // flexDirection: 'row',
        // width: '90%',
        // backgroundColor: 'transparent',
        // margin: 20,
        // flexWrap: 'wrap'
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'transparent',
        margin: 10,
        padding: 10
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    buttonBoxBottom: {
        backgroundColor: "transparent",
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
    },
})