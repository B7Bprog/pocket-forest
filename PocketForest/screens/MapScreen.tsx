import { StyleSheet, Button, Pressable } from 'react-native';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps, RootStackParamList } from '../types';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import Map from '../components/Map';
import { FontAwesome5 } from "@expo/vector-icons";


type homeScreenProp = StackNavigationProp<RootStackParamList, 'Home'>;

export default function MapPage() {

  const navigation = useNavigation<homeScreenProp>();

  return (
    <View style={styles.container}>
      <Map />
      <View style={styles.bottomBar}>
        <Pressable style={styles.bottomButton} onPress={() => navigation.navigate('Home')}>
          <FontAwesome5
            name="home"
            size={26}
            style={{ color: "#fff" }}
          />
          <Text style={styles.bottomButtonText}>Home</Text>
        </Pressable>
        <Pressable style={styles.bottomButton} onPress={() => navigation.navigate('Forest')}>
          <FontAwesome5
            name="tree"
            size={26}
            style={{ color: "#fff" }}
          />
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
    backgroundColor: '#202020',
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row'
  },
  bottomButton: {
    borderRadius: 20,
    padding: 15,
    paddingHorizontal: 30,
    color: 'white',
    backgroundColor: '#69a297',
    display: 'flex',
    flexDirection: 'row',

  },
  bottomButtonText: {
    fontSize: 20,
    fontWeight: '500',
    color: 'white',
    marginLeft: 15
  }
});
