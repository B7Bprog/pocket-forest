import { StyleSheet, Text, ScrollView, View, Image, ImageBackground} from 'react-native';
import { useState, useContext, useEffect } from 'react';
import { UserContext } from '../contexts/User';
import axios from 'axios';


export default function SingleTreePage({route}) {

    const { treeId, result } = route.params;

    const [tree, setTree] = useState({})

    // result = ALL trees collected by USER

    const exampleImage = { img: {uri: "https://www.homestratosphere.com/wp-content/uploads/2019/07/Red-maple.jpg"}}
    const {loggedInUser} = useContext(UserContext);

    const image = { uri: "https://img.freepik.com/free-vector/misty-landscape-with-fog-pine-forest-mountain-slopes-illustration-nature-scene_1150-37301.jpg?w=1800&t=st=1660227623~exp=1660228223~hmac=41f17c953452b51388c7841bc44922934313643e7b0d3ec95d1da77b06f1129f" };


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




  


    return (
        <ImageBackground source={image} resizeMode="cover" style={styles.backgroundImage}>
        <ScrollView style={styles.scrollView}>
            <View style={styles.pageWrapper}>
            <View style={styles.title}>
                <Text style={styles.titleText}>{tree.name}</Text>
            </View>
            {/* <View style={styles.treeImageWrapper}>
                <Image style={styles.treeImage} 
                    source={{
                        uri: treeImg[loggedInUser]
                    }} />
            </View> */}
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