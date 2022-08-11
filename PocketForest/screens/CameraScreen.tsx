import { StyleSheet, Button } from 'react-native';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps, RootStackParamList } from '../types';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';

type homeScreenProp = StackNavigationProp<RootStackParamList, 'Home'>;


export default function CameraPage() {


  const navigation = useNavigation<homeScreenProp>();


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Camera Page will go here</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Button title="Forest" onPress={() => navigation.navigate('Forest')} />
      <Text>When we take the picture, we will navigate to the Forest</Text>
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
