import React from 'react';
import { View, Image, Text, TouchableOpacity, ImageBackground, ActivityIndicator, ListView, Alert, Picker} from 'react-native';
import { getChallenges } from '../api';
import styles from '../styles';
import background from '../assets/images/background.jpg'

export default class WeeklyChallengesScreen extends React.Component {
  static navigationOptions = {
    title: 'Controls',
  };

  constructor(props) {
    super(props);  
    this.state = {
        loading : true,
        console : 'xbox',
        scheme: 'standard',
        mode: 'combat'
      };
  }

  componentDidMount() {
    this.setState({
        loading : false,
        console : 'xbox',
        scheme: 'standard',
        mode: 'combat',


    });
  }

  renderImage() {
    let source = this.state.console + this.state.scheme + this.state.mode;

    switch(source){
      case 'xboxstandardcombat':
        return (<Image resizeMode='center' style={styles.controlImage} source={require('../assets/images/xbox_standard_combat.jpg')}/>);
      case 'xboxstandardbuild':
        return (<Image resizeMode='center' style={styles.controlImage} source={require('../assets/images/xbox_standard_build.jpg')}/>);
      case 'xboxcombatProcombat':
        return (<Image resizeMode='center' style={styles.controlImage} source={require('../assets/images/xbox_combatPro_combat.jpg')}/>);
      case 'xboxcombatProbuild':
        return (<Image resizeMode='center' style={styles.controlImage} source={require('../assets/images/xbox_combatPro_build.jpg')}/>);
      case 'xboxquickBuildercombat':
        return (<Image resizeMode='center' style={styles.controlImage} source={require('../assets/images/xbox_quickBuilder_combat.jpg')}/>); 
      case 'xboxquickBuilderbuild':
        return (<Image resizeMode='center' style={styles.controlImage} source={require('../assets/images/xbox_quickBuilder_build.jpg')}/>);
      case 'ps4standardcombat':
        return (<Image resizeMode='center' style={styles.controlImage} source={require('../assets/images/ps4_standard_combat.jpg')}/>);
      case 'ps4standardbuild':
        return (<Image resizeMode='center' style={styles.controlImage} source={require('../assets/images/ps4_standard_build.jpg')}/>);
      case 'ps4combatProcombat':
        return (<Image resizeMode='center' style={styles.controlImage} source={require('../assets/images/ps4_combatPro_combat.jpg')}/>);
      case 'ps4combatProbuild':
        return (<Image resizeMode='center' style={styles.controlImage} source={require('../assets/images/ps4_standard_build.jpg')}/>);
      case 'ps4quickBuildercombat':
        return (<Image resizeMode='center' style={styles.controlImage} source={require('../assets/images/ps4_standard_combat.jpg')}/>);
      case 'ps4quickBuilderbuild':
        return (<Image resizeMode='center' style={styles.controlImage} source={require('../assets/images/ps4_quickBuilder_build.jpg')}/>);
    }
  }


  render() {
    return (
      <View style={styles.container}>
        <ImageBackground source={background} style={{flex:1}}>
          <View style={styles.controlScreenInputView}>
            <View style={styles.controlScreenPickerBar}>
              <Picker
                    prompt='Select a Platform'
                    style={{ flex: 1, width: 200, height: 50}}
                    selectedValue={this.state.console}
                    onValueChange={(itemValue, itemIndex) =>
                      this.setState({
                        console: itemValue
                      })
                    }>
                    <Picker.Item label="Xbox" value="xbox" color="black" />
                    <Picker.Item label="Playstation" value="ps4" color="black" />
                  </Picker>
            </View>
            <View style={styles.controlScreenPickerBar}>
              <Picker
                prompt='Select a Control Scheme'
                style={{ flex: 1, width: 200, height: 50 }}
                selectedValue={this.state.scheme}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({
                    scheme: itemValue
                  })
                }>
                <Picker.Item label="Standard" value="standard" color="black" />
                <Picker.Item label="Combat Pro" value="combatPro" color="black" />
                <Picker.Item label="Quick Builder" value="quickBuilder" color="black" />
              </Picker>
            </View>
            <View style={styles.controlScreenPickerBar}> 
              <Picker
                prompt='Select a Mode'
                style={{ flex: 1, width: 200, height: 50 }}
                selectedValue={this.state.mode}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({
                    mode: itemValue
                  })
                }>
                <Picker.Item label="Combat Controls" value="combat" color="black" />
                <Picker.Item label="Building Controls" value="build" color="black" />
              </Picker>
            </View>
          </View>
          <View style={styles.controlScreenImageView}>
              {this.renderImage()}
          </View>
        </ImageBackground>
        {this.state.loading &&
          <View style={styles.activityIndicatorStyle}>
            <ActivityIndicator size='large' color='#152D53' />
          </View>
        }
      </View>
    )
  }
}
