import { StyleSheet, Button } from 'react-native';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps, RootStackParamList } from '../types';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';

type homeScreenProp = StackNavigationProp<RootStackParamList, 'Home'>;


export default function StylesPage() {


  const navigation = useNavigation<homeScreenProp>();


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Styles Page</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Text>On this page, we can include references to all the various styles, fonts, colours etc that we need for the project</Text>
      <Button title="Back to Home Page" onPress={() => navigation.navigate('Home')} />
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
