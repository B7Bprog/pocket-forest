import { StyleSheet, Button, Image, ImageBackground, Pressable, TouchableHighlight, ScrollView } from 'react-native';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps, RootStackParamList } from '../types';
import {StackNavigationProp} from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

export default function SingleTreePage(props) {
    const { setMatch } = props;
    console.log(props, "<<<props from single tree page");
    
  console.log(setMatch, "<<< props from single tree page");
    return (
        <View>
            <Text>Hello from Single Tree Page</Text>
            <Image
            source={{
              uri: 'https://www.gardeningknowhow.com/wp-content/uploads/2021/11/rowan-berries.jpg',
            }}
            />
            <Text>Sorbus aucuparia, commonly called rowan and mountain-ash, is a species of deciduous tree or shrub in the rose family. It is a highly variable species, and botanists have used different definitions of the species to include or exclude trees native to certain areas; a recent definition includes trees native to most of Europe and parts of Asia, as well as northern Africa. The range extends from Madeira, the British Isles and Iceland to Russia and northern China. Unlike many plants with similar distributions, it is not native to Japan.</Text>
            <View></View>
            {/* <Pressable onPress={() => navigation.navigate('ForestPage')}><Text style={styles.homeButtonText}>Back to Forest</Text></Pressable> */}
        </View>
    )
}