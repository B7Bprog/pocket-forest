import { StyleSheet, Button } from 'react-native';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps, RootStackParamList } from '../types';
import {StackNavigationProp} from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { setCurrentUser } from '../context/UserContext';
import {getCurrentUser} from '../context/UserContext'


type homeScreenProp = StackNavigationProp<RootStackParamList, 'Home'>;


export default function UserPage() {

  const usernames = getCurrentUser().map((user) => {
    return user.username;
  });

  const navigation = useNavigation<homeScreenProp>();


  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Profile</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <View>{usernames.map((username) => <Text>{username}</Text>)}</View>
      <Text>Please log in</Text>
      <Button title="Login" onPress={() => {
        navigation.navigate('Map')
        setCurrentUser([{ username: "Sofia" }])
      }} />
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
