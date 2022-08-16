import { StyleSheet, Button, Pressable, Image } from 'react-native';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps, RootStackParamList } from '../types';
import {StackNavigationProp} from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { useState, useContext, useEffect } from 'react';
import { UserContext } from '../contexts/User';
import { getUsers } from '../utils/api'


type homeScreenProp = StackNavigationProp<RootStackParamList, 'Home'>;


export default function UserPage() {

  const [users, setUsers] = useState([])
  const {loggedInUser, setLoggedInUser} = useContext(UserContext)

  const navigation = useNavigation<homeScreenProp>();

  useEffect(() => {
    getUsers().then((users) => {
        setUsers(users)
    })
}, [])

  function userPress() {
    navigation.navigate('Map')
  }

  const clickUser = (username) => {
    setLoggedInUser(username)
    navigation.navigate('Map')
  }


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select User Profile</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <View style={styles.users}>
        {users.map((user) => (
            <Pressable key={user.username} style={styles.user} onPress={()=>  clickUser(user.username) }><Text style={styles.userTitle}>{user.username}</Text>
            <View style={styles.animal}>
              <Image style={styles.animalImage} source={require('../assets/images/fox.png')}/>
            </View></Pressable>
        ))}
        </View>
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
  userTitle: {
    fontSize: 18,
  },
  user: {
    backgroundColor: 'green',
    padding: 20,
    margin: 10,
    height: 75,
    display: 'flex',
    justifyContent: 'center',
    width: 250,
    borderRadius: 20
  },
  animal: {
    backgroundColor: '#69a297',
    borderRadius: '50%',
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
