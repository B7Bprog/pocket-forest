import { StyleSheet, Button, Image, ImageBackground, Pressable, TouchableHighlight, ScrollView } from 'react-native';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps, RootStackParamList } from '../types';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';

type homeScreenProp = StackNavigationProp<RootStackParamList, 'Home'>;

const exampleTrees = [
  {
    id: 1,
    name: 'Example Tree 1',
    img: '../assets/images/tree.jpeg',
  },
  {
    id: 2,
    name: 'Example Tree 2',
    img: '../assets/images/tree.jpeg',
  },
  {
    id: 3,
    name: 'Example Tree 3',
    img: '../assets/images/tree.jpeg',
  },
  {
    id: 4,
    name: 'Example Tree 4',
    img: '../assets/images/tree.jpeg',
  },
  {
    id: 5,
    name: 'Example Tree 5',
    img: '../assets/images/tree.jpeg',
  },
  {
    id: 6,
    name: 'Example Tree 6',
    img: '../assets/images/tree.jpeg',
  },
  {
    id: 7,
    name: 'Example Tree 7',
    img: '../assets/images/tree.jpeg',
  },
  {
    id: 8,
    name: 'Example Tree 8',
    img: '../assets/images/tree.jpeg',
  },
  {
    id: 9,
    name: 'Example Tree 9',
    img: '../assets/images/tree.jpeg',
  },
  {
    id: 10,
    name: 'Example Tree 10',
    img: '../assets/images/tree.jpeg',
  },
  {
    id: 11,
    name: 'Example Tree 11',
    img: '../assets/images/tree.jpeg',
  },
  {
    id: 12,
    name: 'Example Tree 12',
    img: '../assets/images/tree.jpeg',
  },
  {
    id: 13,
    name: 'Example Tree 13',
    img: '../assets/images/tree.jpeg',
  },
  {
    id: 14,
    name: 'Example Tree 14',
    img: '../assets/images/tree.jpeg',
  },

]


export default function ForestPage() {


  const image = { uri: "https://img.freepik.com/free-vector/misty-landscape-with-fog-pine-forest-mountain-slopes-illustration-nature-scene_1150-37301.jpg?w=1800&t=st=1660227623~exp=1660228223~hmac=41f17c953452b51388c7841bc44922934313643e7b0d3ec95d1da77b06f1129f" };

  const navigation = useNavigation<homeScreenProp>();

  return (
    <ImageBackground source={image} resizeMode="cover" style={styles.backgroundImage}>
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
      
        <View style={styles.innerContainer}>
          <View style={styles.cardsSection}>

          {exampleTrees.map((tree) => (
            <TouchableHighlight style={styles.cardTouchable} onPress={() => navigation.navigate('Home')}>
            <View style={styles.card}>
              <View style={styles.imageWrapper}>
                <Image style={styles.forestImage} source={require('{../assets/images/tree.jpeg}')}/>
              </View>
              <View style={styles.textWrapper}>
                <Text style={styles.cardTitle}>{tree.name}</Text>
              </View>
            </View>
          </TouchableHighlight>
          )) }
          </View>
          <Pressable onPress={() => navigation.navigate('Home')} >
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
    height: '100%',
    backgroundColor: 'rgba(0,0,0, 0.60)',
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  backgroundImage: {
    height: '100%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  cardsSection: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignContent: 'center',
    flexDirection: 'row',
    width: '90%',
    backgroundColor: 'transparent',
    margin: 20,
    flexWrap: 'wrap'
  },
  cardTouchable: {
    height: 200,
    display: 'flex',
    width: '44%',
    margin: 10,
    borderRadius: 20,
  },
  card: {
    borderRadius: 20,
    backgroundColor: '#fff',
    alignSelf: 'stretch',
    shadowColor: 'black',
    shadowOffset: {
      width: 2,
      height: 2
    },
    shadowOpacity:0.9
  },
  cardTitle: {
    fontSize: 18,
    color: 'black',
    textAlign: 'center',
  },
  imageWrapper: {
    height: 110,
    width: '100%',
    overflow: 'hidden',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  forestImage: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover'
  },
  textWrapper: {
    backgroundColor: 'transparent',
    padding: 20,
    textAlign: 'center',
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
    height: '45%'
  },
  innerContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    marginTop: 30,
    marginBottom: 50
  },
  homeButton: {
    color: 'white',
  },
  homeButtonText: {
    fontSize: 20
  }
});
