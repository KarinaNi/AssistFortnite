import React from 'react';
import styles from '../styles';
import background from '../assets/images/background.jpg';
import { View, Text, Image, ImageBackground, TouchableOpacity } from 'react-native';

import block from '../assets/images/Block.jpg'
import castle from '../assets/images/Castle.jpg'
import disco from '../assets/images/Disco.jpg'
import dusty from '../assets/images/Dusty.jpg'
import fatal from '../assets/images/Fatal.jpg'
import frosty from '../assets/images/Frosty.jpg'
import happy from '../assets/images/Happy.jpg'
import haunted from '../assets/images/Haunted.jpg'
import junk from '../assets/images/Junk.jpg'
import lazy from '../assets/images/Lazy.jpg'
import lonely from '../assets/images/Lonely.jpg'
import loot from '../assets/images/Loot.jpg'
import lucky from '../assets/images/Lucky.jpg'
import mansion from '../assets/images/Mansion.jpg'
import paradise from '../assets/images/Paradise.jpg'
import polar from '../assets/images/Polar.jpg'
import retail from '../assets/images/Retail.jpg'
import rv from '../assets/images/RV.jpg'
import salty from '../assets/images/Salty.jpg'
import shifty from '../assets/images/Shifty.jpg'
import snobby from '../assets/images/Snobby.jpg'
import soccer from '../assets/images/Soccer.jpg'
import spot from '../assets/images/Spot.jpg'
import sunny from '../assets/images/Sunny.jpg'
import tilted from '../assets/images/Tilted.jpg'
import volcano from '../assets/images/Volcano.jpg'



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
      block, 
      castle,
      disco,
      dusty,
      fatal,
      frosty, 
      happy,
      haunted,
      junk,
      lazy,
      lonely,
      loot,
      lucky,
      mansion,
      paradise,
      polar,
      retail,
      rv,
      salty,
      shifty,
      snobby,
      soccer,
      spot,
      sunny,
      tilted,
      volcano,
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

        <View style={{flex:1, flexDirection:'column', justifyContent:'space-evenly', alignItems: 'center'}}>
          
          <View style={{flex:.4}}>
            <Image source={this.state.StratHolder} style={{width: 375, height: 375}}/>
          </View>

        <View style={{flex:.4, margin:10, flexDirection:'column', borderRadius:5, backgroundColor: 'rgba(43, 75, 149, 0.25)', justifyContent:'space-evenly', alignItems: 'center'}}>
            <Text style={{color:'#ffffff', fontSize: 25, fontWeight:"bold"}}>
              {'Drop Location'}
            </Text>
            <Text style={{color:'#ffffff', fontSize: 40, fontWeight:"bold", marginBottom: 5}}>
              {this.state.PlaceHolder}
            </Text>
          </View>

          <View style={{flex:.4, margin:10, flexDirection:'column', borderRadius:5, backgroundColor: 'rgba(43, 75, 149, 0.25)', justifyContent:'space-evenly', alignItems: 'center'}}>
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