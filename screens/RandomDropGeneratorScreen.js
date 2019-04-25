import React from 'react';
import styles from '../styles';
import background from '../assets/images/background.jpg';
import { View, Text, ImageBackground, TouchableOpacity } from 'react-native';

export default class RandomDropGeneratorScreen extends React.Component {
  static navigationOptions = {
    title: 'Random Drop Generator',
  };

  constructor(){
      super();
      this.state={
        PlaceHolder : ' ',
        StratHolder : ' '
      }
  }
  
  GenerateRandom = () => {

    var RandomPlace = [
      'Junk Junction',
      'Haunted Hills',
      'Sunny Steps',
      'Lazy Lagoon',
      'Shifty Shafts',
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
    var RandomStrat = [
      'Pistols Only',
      'No Shield',
      'No Builds',
      'Couch Walk',
      'One Gun',
      'No Heals'  
    ]

    var RandomPlace = RandomPlace[Math.floor(Math.random() * RandomPlace.length)]
    var RandomStrat = RandomStrat[Math.floor(Math.random() * RandomStrat.length)]
    
    this.setState({
      PlaceHolder : RandomPlace,
      StratHolder : RandomStrat
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground source={background} style={{ flex: 1 }}>

        <View style={{flex:1, flexDirection:'column', justifyContent:'space-evenly'}}>

          <View style={styles.homeScreenStatTrackerView}>
            <Text style={{color:'#ffffff', fontSize: 25, fontWeight:"bold"}}>
              {'Drop Location'}
            </Text>
            <Text style={{color:'#ffffff', fontSize: 40, fontWeight:"bold", marginBottom: 5}}>
              {this.state.PlaceHolder}
            </Text>
          </View>

          <View style={styles.homeScreenStatTrackerView}>
            <Text style={{color:'#ffffff', fontSize: 25, fontWeight:"bold"}}>
              {'Strategy'}
            </Text>
            <Text style={{color:'#ffffff', fontSize: 40, fontWeight:"bold", marginBottom: 5}}>
              {this.state.StratHolder}
            </Text>
          </View>
    
          <TouchableOpacity 
            onPress={() => this.GenerateRandom()} 
            style={styles.dropButtonStyle}>
            <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
              <Text style={styles.homeScreenButtonText}>Drop</Text>
            </View>
          </TouchableOpacity>

          </View>

        </ImageBackground>
      </View>
    )
  }
}
