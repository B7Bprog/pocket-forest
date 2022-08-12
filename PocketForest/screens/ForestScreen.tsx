import { StyleSheet, Button, Image, ImageBackground } from 'react-native';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps, RootStackParamList } from '../types';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';

type homeScreenProp = StackNavigationProp<RootStackParamList, 'Home'>;


export default function ForestPage() {


  const image = { uri: "https://img.freepik.com/free-vector/misty-landscape-with-fog-pine-forest-mountain-slopes-illustration-nature-scene_1150-37301.jpg?w=1800&t=st=1660227623~exp=1660228223~hmac=41f17c953452b51388c7841bc44922934313643e7b0d3ec95d1da77b06f1129f" };

  const navigation = useNavigation<homeScreenProp>();

  return (
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <View style={styles.innerContainer}>
          <View style={styles.cardsSection}>
            <View style={styles.card}>
              <View style={styles.imageWrapper}>
                <Image style={styles.forestImage} source={require('../assets/images/tree.jpeg')}/>
              </View>
              <View style={styles.textWrapper}>
                <Text>Title</Text>
              </View>
            </View>
            <View style={styles.card}>
              <View style={styles.imageWrapper}>
                <Image style={styles.forestImage} source={require('../assets/images/tree.jpeg')}/>
              </View>
              <View style={styles.textWrapper}>
                <Text>Title</Text>
              </View>
            </View>
          </View>
          <Button title="Home" onPress={() => navigation.navigate('Home')} />
        </View>
        </ImageBackground>
        
        
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
    justifyContent: 'center',
    alignContent: 'center',
    flexDirection: 'row',
    width: '100%',
    backgroundColor: 'transparent'
  },
  card: {
    width: 100,
    height: 200,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 15,
    borderRadius: 20,
    backgroundColor: '#fff3B0',
  },
  imageWrapper: {
    height: 100,
    width: 100,
    borderRadius: 20,
  },
  forestImage: {
    maxWidth: '100%',
    maxHeight: '100%',
    borderRadius: 0,
  },
  textWrapper: {
    backgroundColor: 'transparent',
  },
  image: {
    flex: 1,
    justifyContent: "center",
    alignItems: 'center',
    width: '100%',
  },
  innerContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0, 0.60)'
  },
});
