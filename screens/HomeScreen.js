import React from 'react';
import {Picker, TextInput, Text, TouchableOpacity, View, ImageBackground, ActivityIndicator, Alert} from 'react-native';
import { getUserID } from '../api';
import styles from '../styles';
import background from '../assets/images/background.jpg'

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Assistant for Fortnite',
  };

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      pickerPlatform: 'pc',
      platformType: 'keyboardmouse',
      platformName: 'PC',
      loading: false,
    };
  }

  handleTrackPress() {
    this.setState({loading:true});
    getUserID(this.state.username).then(userVal => {
      if(userVal.username === undefined || !userVal.platforms.includes(this.state.pickerPlatform)) {
        Alert.alert('Invalid username/platform',
          'Please enter a valid username and platform combination.',
          [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ],
          { cancelable: false })
        this.setState({loading:false});
        return;
      }
      this.setState({loading:false});
      this.props.navigation.navigate("StatTrackerScreen", {username: userVal.username, uid: userVal.uid, platformType: this.state.platformType, platformName: this.state.platformName})
    })
  }

  setPlatform(platformValue) {
    switch (platformValue) {
      case 'pc':
        this.setState({
          pickerPlatform: 'pc',
          platformType: 'keyboardmouse',
          platformName: 'PC'
        });
        break;
      case 'xb1':
        this.setState({
          pickerPlatform: 'xb1',
          platformType: 'gamepad',
          platformName: 'Xbox'
        });
        break;
      case 'ps4':
        this.setState({
          pickerPlatform: 'ps4',
          platformType: 'gamepad',
          platformName: 'Playstation'
        });
        break;
      case 'nintendo':
        this.setState({
          pickerPlatform: 'nintendo',
          platformType: 'nintendo',
          platformName: 'Nintendo'
        });
        break;
      case 'touch':
        this.setState({
          pickerPlatform: 'touch',
          platformType: 'touch',
          platformName: 'Mobile'
        });
        break;
    }
  }

  handleWeeklyChallengesPress() {
    this.props.navigation.navigate("WeeklyChallengesScreen");
  }

  handleRandGenPress() {
    this.props.navigation.navigate("RandomDropGeneratorScreen");
  }

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground source={background} style={{flex:1}}>
        <View style={styles.homeScreenStatTrackerView}>
          
          <Text style={styles.sectionTitleTextStyle}>Stat Tracker</Text>
          <View style={styles.homeScreenStatTrackerInputView}>
            
            <View style={styles.homeScreenStatTrackerTextInputView}>
              <View style={{flex:1}}>
                <TextInput
                  style= {{paddingLeft:10, margin:3, flex:1, borderRadius:5, borderWidth:2, color:'#9d4dbb', borderColor:'#9d4dbb'}}
                  placeholder='username'
                  placeholderTextColor='#9d4dbb'
                  onChangeText={(text) => this.setState({username:text})}
                />
              </View>
                <View style= {{flex:1, margin: 3, borderRadius:5, borderWidth:2, borderColor:'#9d4dbb'}}>
                  <Picker
                    prompt='Select a platform'
                    style= {{flex:1}}
                    selectedValue={this.state.pickerPlatform}
                    onValueChange={(itemValue, itemIndex) =>
                      this.setPlatform(itemValue)
                    }>
                    <Picker.Item label="PC" value="pc" color="#9d4dbb"/>
                    <Picker.Item label="Xbox" value="xb1" color="#9d4dbb"/>
                    <Picker.Item label="Playstation" value="ps4" color="#9d4dbb"/>
                    <Picker.Item label="Nintendo" value="nintendo" color="#9d4dbb"/>
                    <Picker.Item label="Mobile" value="touch" color="#9d4dbb"/>
                  </Picker>
                </View>
            </View>

              <TouchableOpacity 
                onPress={() => this.handleTrackPress()}
                style={{flex:.25, margin:10, borderRadius:5, borderWidth:2, borderColor:'#9d4dbb'}}>
                <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
                  <Text style={{color:'#9d4dbb', fontSize: 15, fontWeight:"bold"}}>Track</Text>
                </View>
              </TouchableOpacity>
          </View>
          
        </View>

        <View style={{flex: 0.25, flexDirection: 'row', justifyContent: 'space-evenly'}}>
          <TouchableOpacity 
            onPress={() => this.handleWeeklyChallengesPress()}  
            style={styles.homeScreenButtonStyle}>
            <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
              <Text style={styles.homeScreenButtonText}>Weekly Challenges</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={() => this.handleRandGenPress()}  
            style={styles.homeScreenButtonStyle}>
            <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
              <Text style={styles.homeScreenButtonText}>Random Drop</Text>
            </View>
          </TouchableOpacity>
        </View>

        </ImageBackground>
        
        {this.state.loading &&
          <View style={styles.activityIndicatorStyle}>
            <ActivityIndicator size='large' color='#152D53' />
          </View>
        }
      </View>
      
    );
  }

}
