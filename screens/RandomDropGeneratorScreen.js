import React from 'react';
import styles from '../styles';
import background from '../assets/images/background.jpg';
import { View, Button, Text, ImageBackground } from 'react-native';

export default class RandomDropGeneratorScreen extends React.Component {
  static navigationOptions = {
    title: 'Random Drop Generator',
  };

  constructor(){
  
      super();
  
      this.state={

        PlaceHolder : ''
  
      }
  }

  
  GenerateRandomLocation=()=>
  {

  var RandomPlace = [
    'Junk Junction',
    'Haunted Hills',
    'Sunny Steps',
    'Lazy Lagoon',
    'Shifty Shafts',
    'Salty Springs',
    'Salty Springs',
    'Dusty Divot',
    'Lonely Lodge',
    'Snobby Shores',
    'Polar Peak',
    'Pleasant Park',
    'Fatal Fields',
    'Retail Row',
    'Paradise Palms',
    'Frosty Flights',
    'Loot Lake',
    'Happy Hamlet',
    'Tilted Towers',
    'The Block'   
  ]

  var RandomPlace = RandomPlace[Math.floor(Math.random() * RandomPlace.length)]

  this.setState({
 
    PlaceHolder : RandomPlace
   
  })
  }

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground source={background} style={{ flex: 1 }}>
          <View style={styles.homeScreenStatTrackerView}>
            <Text style={{color:'#9d4dbb', fontSize: 25, fontWeight:"bold"}}>
              {'Drop Location'}
            </Text>
            <Text style={{color:'#9d4dbb', fontSize: 25, fontWeight:"bold", marginBottom: 5}}>
              {this.state.PlaceHolder}
            </Text>
          </View>
          <Button title="Drop" onPress={this.GenerateRandomLocation} />      
        </ImageBackground>
      </View>
    )
  }
}
