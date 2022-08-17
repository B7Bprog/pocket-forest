import { StyleSheet, Button, Pressable } from 'react-native';
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
        <Pressable style={styles.bottomButton} onPress={() => navigation.navigate('Forest')}>
        <Text style={styles.bottomButtonText}>Forest</Text>
        </Pressable>
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
  },
  bottomButton: {
    borderRadius: 5,
    borderColor: 'white',
    padding: 15,
    paddingHorizontal: 30,
    color: 'white',
    borderWidth: 3,
  },
  bottomButtonText: {
    fontSize: 20,
    fontWeight: '500',
  }
});
