import { StyleSheet, Button, Image, ImageBackground, Pressable, TouchableHighlight, ScrollView } from 'react-native';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps, RootStackParamList } from '../types';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';

type homeScreenProp = StackNavigationProp<RootStackParamList, 'Home'>;

const exampleTrees = [
  {
    id: 1,
    name: 'Apple Tree',
    img: { 
      uri: "https://www.homestratosphere.com/wp-content/uploads/2019/07/apple-tree-11032021.jpg" 
    }
  },
  {
    id: 2,
    name: 'Pear Tree',
    img: { 
      uri: "https://www.homestratosphere.com/wp-content/uploads/2019/07/pear-tree-11032021.jpg" 
    }
  },
  {
    id: 3,
    name: 'Black Ash',
    img: { 
      uri: "https://www.homestratosphere.com/wp-content/uploads/2019/07/black-ash-tree-dec11.jpg" 
    }
  },
  {
    id: 4,
    name: 'Mahogany',
    img: { 
      uri: "https://www.homestratosphere.com/wp-content/uploads/2019/07/Mahogany-tree.jpg" 
    }
  },
  {
    id: 5,
    name: 'Peach Tree',
    img: { 
      uri: "https://www.homestratosphere.com/wp-content/uploads/2019/07/peach-tree-11032021.jpg" 
    }
  },
  {
    id: 6,
    name: 'Common Fig',
    img: { 
      uri: "https://www.homestratosphere.com/wp-content/uploads/2019/07/common-fig-tree-10032021.jpg" 
    }
  },
  {
    id: 7,
    name: 'European Beech',
    img: { 
      uri: "https://www.homestratosphere.com/wp-content/uploads/2019/07/european-beech-tree-09032021.jpg" 
    }
  },
  {
    id: 8,
    name: 'Black Birch',
    img: { 
      uri: "https://www.homestratosphere.com/wp-content/uploads/2019/07/Black-birch.jpg" 
    }
  },
  {
    id: 9,
    name: 'Sweet Cherry',
    img: { 
      uri: "https://www.homestratosphere.com/wp-content/uploads/2019/07/sweet-cherry-trees-09032021.jpg" 
    }
  },
  {
    id: 10,
    name: 'American Elm',
    img: { 
      uri: "https://www.homestratosphere.com/wp-content/uploads/2019/07/American-elm.jpg" 
    }
  },
  {
    id: 11,
    name: 'Pignut Hickory',
    img: { 
      uri: "https://www.homestratosphere.com/wp-content/uploads/2019/07/Pignut-hickory.jpg" 
    }
  },
  {
    id: 12,
    name: 'European Larch',
    img: { 
      uri: "https://www.homestratosphere.com/wp-content/uploads/2019/07/European-larch.jpg" 
    }
  },
  {
    id: 13,
    name: 'Red Maple',
    img: { 
      uri: "https://www.homestratosphere.com/wp-content/uploads/2019/07/Red-maple.jpg" 
    }
  },
  {
    id: 14,
    name: 'Black Oak',
    img: { 
      uri: "https://www.homestratosphere.com/wp-content/uploads/2019/07/Black-oak.jpg" 
    }
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
            <TouchableHighlight key={tree.id} style={styles.cardTouchable} onPress={() => navigation.navigate('Home')}>
            <View style={styles.card}>
              <View style={styles.imageWrapper}>
                <Image style={styles.forestImage} source={tree.img}/>
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
