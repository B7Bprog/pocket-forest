import { StyleSheet, Button } from 'react-native';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps, RootStackParamList } from '../types';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import { getTrees } from '../utils/api'
import { useState, useContext, useEffect } from 'react';
import { UserContext } from '../contexts/User';

type homeScreenProp = StackNavigationProp<RootStackParamList, 'Home'>;


export default function ForestPage() {


  const [trees, setTrees] = useState([])
  const navigation = useNavigation<homeScreenProp>();

  const {loggedInUser, setLoggedInUser, isLoggedIn} = useContext(UserContext);

  useEffect(() => {
    getTrees().then((trees) => {
      setTrees(trees)
    })
}, [])

function userPress() {
  navigation.navigate('Forest')
}

console.log(trees.length)


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forest</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Text style={styles.title}>This page will be for the Forest</Text>
      <Button title="User" onPress={() => navigation.navigate('User')} />
      <View>
        {trees.map((tree) => (
          <Text key={tree._id}>{tree.name} -- {tree.username}</Text>
        ))}
        </View>
        <Text>{loggedInUser}</Text>
        {/* {console.log(users)} */}
        
        
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
});
