import { StyleSheet, ImageBackground, Pressable, Image } from 'react-native';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps, RootStackParamList } from '../types';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';

type homeScreenProp = StackNavigationProp<RootStackParamList, 'Home'>;


export default function HomePage() {


  const navigation = useNavigation<homeScreenProp>();

  const image = { uri: "https://img.freepik.com/free-vector/misty-landscape-with-fog-pine-forest-mountain-slopes-illustration-nature-scene_1150-37301.jpg?w=1800&t=st=1660227623~exp=1660228223~hmac=41f17c953452b51388c7841bc44922934313643e7b0d3ec95d1da77b06f1129f" };


  return (
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <View style={styles.innerContainer}>
        <Text style={styles.title}>POCKET</Text>
        <Text style={styles.title}>FOREST</Text>
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
        <View>
        <Pressable style={styles.button} onPress={() => navigation.navigate('Map')}>
          <Text style={styles.buttonText}>LOGIN</Text>
        </Pressable>
        </View>
        <View style={styles.bottomButton}>
        <Pressable style={styles.button2} onPress={() => navigation.navigate('Camera')}>
          <Text style={styles.buttonText2}>Snap a pic!</Text>
        </Pressable>
        <Pressable style={styles.button2} onPress={() => navigation.navigate('Forest')}>
          <Text style={styles.buttonText2}>Go straight to forest</Text>
        </Pressable>
        </View>
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
    fontSize: 50,
    fontWeight: '800',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
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
  button: {
    backgroundColor: 'green',
    borderRadius: 5,
    color: 'white',
    padding: 15,
    paddingHorizontal: 30
    
  },
  buttonText: {
    fontSize: 20,
    fontWeight: '500'
  },
  button2: {
    borderRadius: 5,
    borderColor: 'white',
    padding: 15,
    paddingHorizontal: 30,
    color: 'white',
    borderWidth: 3
  },
  buttonText2: {
    fontSize: 20,
    fontWeight: '500',
  },
  bottomButton: {
    marginTop: 25,
    backgroundColor: 'transparent'
  }
});
