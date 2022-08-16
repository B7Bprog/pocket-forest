import { StyleSheet, Button, Image, ImageBackground, Pressable, TouchableHighlight, ScrollView } from 'react-native';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps, RootStackParamList } from '../types';
import {StackNavigationProp} from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

type homeScreenProp = StackNavigationProp<RootStackParamList, "Camera">;

export default function SingleTreePage(props) {
    const navigation = useNavigation<homeScreenProp>();
    const { setMatch, route } = props;
    const { matchingDetails } = route.params;

    console.log(matchingDetails, "<<<matching from single tree page");
    
    return (
        <View style={styles.centeredView}>
            <Text style={styles.title}>Information about {matchingDetails.common_names[0]}:</Text>
            <Image
            source={{
              uri: 'https://www.gardeningknowhow.com/wp-content/uploads/2021/11/rowan-berries.jpg',
            }}
            />
            <Text>It belongs to {matchingDetails.structured_name.species} family</Text>
            <Text>{matchingDetails.wiki_description.value}</Text>
            <View></View>
            <Pressable onPress={() => navigation.navigate('Forest')}><Text style={styles.homeButtonText}>Back to Forest</Text></Pressable>
        </View>
    )
}


const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        margin: 10,
        padding: 10
    },
     title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
})