import { StyleSheet, Button } from 'react-native';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps, RootStackParamList } from '../types';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import Map from '../components/Map';

type homeScreenProp = StackNavigationProp<RootStackParamList, 'Home'>;

export default function MapPage() {

  const navigation = useNavigation<homeScreenProp>();

  return (
    <View style={styles.container}>
      <Map />
      <View style={styles.bottomBar}>
        <Button title='forest' onPress={() => navigation.navigate('Forest')}/>
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
  bottomBar: {
    height: 100,
    backgroundColor: 'green',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  }
});
