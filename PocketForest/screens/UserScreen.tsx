import { StyleSheet, Button, Pressable } from 'react-native';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps, RootStackParamList } from '../types';
import {StackNavigationProp} from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { useState, useContext, useEffect } from 'react';
import { UserContext } from '../contexts/User';
import { getUsers } from '../utils/api'


type homeScreenProp = StackNavigationProp<RootStackParamList, 'Home'>;


export default function UserPage() {


  const usernames = [
    'one', 'two', 'three'
  ]

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
  }


  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Profile</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <View>
        {users.map((user) => (
          <Pressable key={user.username} style={styles.users} onPress={()=>  clickUser(user.username) }><Text>{user.username}</Text></Pressable>
        ))}
        </View>
        <Text>{loggedInUser}</Text>
        {console.log(users)}
        
        
        <Button onPress={userPress} title='go to map'></Button>
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
  users: {
    backgroundColor: 'green',
    padding: 20,
    margin: 10
  }
});
