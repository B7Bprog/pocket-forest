import React, {useEffect, useState} from 'react';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { StyleSheet, Text, View, Dimensions, Image, Pressable } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import {FontAwesome5} from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function Map() {

  const [errorMsg, setErrorMsg] = useState(null);
  const [mapRegion, setMapRegion] = useState(null);
  const [treeDistance, setTreeDistance] = useState(0);
  const [closeEnough, setCloseEnough] = useState(false);
  const navigation = useNavigation(); 

  let foxMessage;
  let alertIcon;

  if (closeEnough) {
    foxMessage = 
    <Pressable onPress={() => navigation.navigate("Camera")}>
      <Text style={styles.textInsideTextbox}>Let's <Text style={styles.click}>add this tree</Text> to our forest!</Text>
    </Pressable>
    alertIcon = 
      <View style={[styles.alert, styles.primaryColour]}><FontAwesome5 name={'exclamation'} size={20} style={ { color: 'white'}} /></View>
  } else if (!closeEnough && treeDistance) {
    foxMessage = <Text style={styles.textInsideTextbox}>You are {Math.round(treeDistance)}m away, keep going!</Text>
    alertIcon = <View style={[styles.alert, styles.secondaryColour]}><FontAwesome5 name={'exclamation'} size={20} style={ { color: 'white'}} /></View>
  } else {
    foxMessage = <Text style={styles.textInsideTextbox}>Hi! Let's go find some trees!</Text>
  }

  const [trees] = useState([
    {
      id: 1,
      title: 'Unknown Tree',
      description: 'try to add it to your Forest!',
      location: {
        latitude: 53.451657,
        longitude: -2.515016
      },
      icon: "question"
    },
    {
      id: 2,
      title: 'Unknown Tree',
      description: 'try to add it to your Forest!',
      location: {
        latitude: 53.453316,
        longitude: -2.519637
      },
      icon: "question"
    },
    {
      id: 3,
      title: 'English Oak',
      description: 'Added to your forest 09/08/22',
      location: {
        latitude: 53.450312,
        longitude: -2.530635
      },
      icon: "question"
    }, 
    {
      id: 4,
      title: 'Tree in my garden',
      description: 'Added to your forest 09/08/22',
      location: {
        latitude: 53.45394162343724,
        longitude: -2.5236933834300235
      },
      icon: "question"
    },
    {
      id: 5,
      title: 'Unknown Tree',
      description: 'try to add it to your Forest!',
      location: {
        latitude: 53.47209257474375,
        longitude: -2.238243474494392
      },
      icon: "question"
    },
    {
      id: 6,
      title: 'Unknown Tree',
      description: 'try to add it to your Forest!',
      location: {
        latitude: 53.47061682068318,
        longitude: -2.2381110286010633
      },
      icon: "question"
    },
    {
      id: 7,
      title: 'Unknown Tree',
      description: 'try to add it to your Forest!',
      location: {
        latitude: 53.4699969889311,
        longitude: -2.2386341689692553
      },
      icon: "question"
    },
    {
      id: 8,
      title: 'Unknown Tree',
      description: 'try to add it to your Forest!',
      location: {
        latitude: 53.47058623012321,
        longitude: -2.23926192489555
      },
      icon: "question"
    },
  ]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setMapRegion({
        longitude: location.coords.longitude,
        latitude: location.coords.latitude,
        longitudeDelta: 0.0012,
        latitudeDelta: 0.0021
      })
    })();
  }, []);

  function handleOnPress() {
    const deltaLatitude = Math.pow(this.coordinate.latitude - mapRegion.latitude, 2);
    const deltaLongitude = Math.pow(this.coordinate.longitude - mapRegion.longitude, 2);
    const distance = Math.sqrt(deltaLatitude + deltaLongitude) * 111139;

    if (distance < 20) {
      setCloseEnough(true);
    } else {
    setTreeDistance(distance);
      setCloseEnough(false);
    }
  }


  return (
    <View style={styles.container}>
      <StatusBar style="dark"/>
      <MapView
        style={styles.map}
        initialRegion={mapRegion}
        >
        { mapRegion &&
          <Marker coordinate={mapRegion} title="Me" description="This is my current location">
            <View style={styles.circle}>
              <View style={styles.stroke}>
                <View style={styles.core}></View>
              </View>
            </View>
          </Marker>
        }
          { trees ? trees.map(tree => (
            <Marker 
              coordinate={tree.location} 
              title={tree.title} 
              description={tree.description}
              key={tree.id}
              onPress={handleOnPress}
              >
                <FontAwesome5 
                  name={tree.icon}
                  size={26} 
                  style={ { color: '#00ff6a'}}
                />
            </Marker>
          )) : null }
       </MapView>
        <View style={styles.textbox}>
            {alertIcon}
            {foxMessage}
            <View style={styles.animal}>
              <Image style={styles.animalImage} source={require('../assets/images/fox.png')}/>
            </View>
        </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  circle: {
    width: 26,
    height:26,
    borderRadius: 50,
    shadowColor: '#555',
    shadowOffset: {
      width: 2,
      height: 2
    },
    shadowOpacity:0.9
  },
  stroke: {
    width: 26,
    height: 26,
    borderRadius: 50,
    backgroundColor: '#fff',
    zIndex: 1
  },
  core: {
    width: 24,
    height: 24,
    position: 'absolute',
    left: 1,
    top: 1,
    right: 1,
    bottom: 1,
    backgroundColor: 'red',
    zIndex: 2,
    borderRadius: 50
  },
  textbox: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    height: '12%',
    width: '100%',
    position: 'absolute',
    bottom: 0,
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 20
  },
  textInsideTextbox: {
    fontSize: 18,
    color: 'black'
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
    height: 40,
    width: 40,
  },
  alert: {
    position: 'absolute',
    right: 35,
    top: -25,
    backgroundColor: '#ff7733',
    width: 35,
    height: 35,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  primaryColour: {
    backgroundColor: '#ff7733',
  },
  secondaryColour: {
    backgroundColor: '#69a297',
  },
  click: {
    color: '#ff7733',
  }
});