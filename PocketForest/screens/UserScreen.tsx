import { StyleSheet, Button, Pressable, Image, ImageBackground } from 'react-native';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps, RootStackParamList } from '../types';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { useState, useContext, useEffect } from 'react';
import { UserContext } from '../contexts/User';
import { getUsers } from '../utils/api'


type homeScreenProp = StackNavigationProp<RootStackParamList, 'Home'>;

export default function UserPage() {

  const [users, setUsers] = useState([])
  const { loggedInUser, setLoggedInUser } = useContext(UserContext)

  const navigation = useNavigation<homeScreenProp>();

  useEffect(() => {
    getUsers().then((users) => {
      setUsers(users)
    })
  }, [])

  const clickUser = (username) => {
    setLoggedInUser(username)
    navigation.navigate('Map')
  }

  const image = { uri: "https://img.freepik.com/free-vector/misty-landscape-with-fog-pine-forest-mountain-slopes-illustration-nature-scene_1150-37301.jpg?w=1800&t=st=1660227623~exp=1660228223~hmac=41f17c953452b51388c7841bc44922934313643e7b0d3ec95d1da77b06f1129f" };


  return (

    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <View style={styles.innerContainer}>
          <Text style={styles.title}>Select User Profile</Text>
          <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
          <View style={styles.users}>
            {users.map((user) => (
              <Pressable key={user.username} style={[styles.user, styles[user.username]]} onPress={() => clickUser(user.username)}><Text style={[styles.userTitle, styles[user.username]]}>{user.username}</Text>
                <View style={styles.animal}>
                  {
                    user.username === 'Mark'
                      ? <Image style={styles.animalImage} source={require('../assets/images/owl.png')} />
                      : <Image style={styles.animalImage} source={require('../assets/images/bear.png')} />
                  }
                </View>
              </Pressable>
            ))}
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
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white'
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  users: {
    backgroundColor: 'transparent'
  },
  image: {
    flex: 1,
    justifyContent: "center",
    alignItems: 'center',
    width: '100%',
  },
  userTitle: {
    fontSize: 20,
    color: 'white',
    fontWeight: '500'
  },
  innerContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0, 0.60)'
  },
  user: {
    backgroundColor: '#69a297',
    padding: 20,
    margin: 10,
    height: 75,
    display: 'flex',
    justifyContent: 'center',
    width: 250,
    borderRadius: 20
  },
  animal: {
    backgroundColor: '#fff3b0',
    borderRadius: 50,
    padding: 10,
    marginLeft: 20,
    borderColor: '#ff7733',
    borderWidth: 3,
    position: 'absolute',
    right: 20
  },
  animalImage: {
    height: 30,
    width: 30,
  },
});
