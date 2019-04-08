import React from 'react';
import { Picker, TextInput, Text, TouchableOpacity, View, ImageBackground, ActivityIndicator, Alert, BackHandler } from 'react-native';
import { getUserID, getUserStats } from '../api';
import styles from '../styles';
import background from '../assets/images/background.jpg'
import { NetInfo } from 'react-native';

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

  componentDidMount() {
    NetInfo.getConnectionInfo().then((connectionInfo) => {
      if (connectionInfo.type === 'none') {
        Alert.alert('No Network Connection',
          'A network connection is necessary to use the Assistant for Fortnite!',
          [
            { text: 'Close Assistant for Fortnite', onPress: () => BackHandler.exitApp() },
          ],
          { cancelable: false })
      }
    });
  }

  handleTrackPress() {
    this.setState({ loading: true });
    getUserID(this.state.username).then(userVal => {
      if (userVal.username === undefined || !userVal.platforms.includes(this.state.pickerPlatform)) {
        Alert.alert('Invalid username/platform',
          'Please enter a valid username and platform combination.',
          [
            { text: 'OK', onPress: () => console.log('OK Pressed') },
          ],
          { cancelable: false })
        this.setState({ loading: false });
        return;
      }
      getUserStats(userVal.uid).then(statVal => {
        if (statVal.data[this.state.platformType] === undefined) {
          Alert.alert('No stats found',
            'No stats found for ' + userVal.username + ' on ' + this.state.platformName,
            [
              { text: 'OK', onPress: () => console.log('OK Pressed') },
            ],
            { cancelable: false })
          this.setState({ loading: false });
          return;
        }
        this.setState({ loading: false });
        this.props.navigation.navigate("StatTrackerScreen", { username: userVal.username, userStats: statVal.data[this.state.platformType], platformName: this.state.platformName })
      })
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
          platformType: 'gamepad',
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

  handleItemShopPress() {
    this.props.navigation.navigate("ItemShopScreen");
  }

  handlePatchNotesPress(){
    this.props.navigation.navigate("PatchNotesScreen");
  }

  handleUpcomingItemsPress(){
    this.props.navigation.navigate("UpcomingItemsScreen");
  }

  handleWeaponStatsPress(){
    this.props.navigation.navigate("WeaponStatsScreen");
  }

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground source={background} style={{ flex: 1 }}>
          <View style={styles.homeScreenStatTrackerView}>

            <Text style={styles.sectionTitleTextStyle}>Stat Tracker</Text>
            <View style={styles.homeScreenStatTrackerInputView}>

              <View style={styles.homeScreenStatTrackerTextInputView}>
                <View style={{ flex: 1 }}>
                  <TextInput
                    style={{ paddingLeft: 10, margin: 3, flex: 1, borderRadius: 5, borderWidth: 2, color: '#ffffff', borderColor: '#9d4dbb' }}
                    placeholder='Enter Username Here'
                    placeholderTextColor='#ffffff'
                    onChangeText={(text) => this.setState({ username: text })}
                    autoCapitalize='none'
                    autoCorrect={false}
                    autoComplete='off'
                  />
                </View>
                <View style={{ flex: 1, margin: 3, borderRadius: 5, borderWidth: 2, borderColor: '#9d4dbb' }}>
                  <Picker
                    prompt='Select a platform'
                    style={{ flex: 1 }}
                    selectedValue={this.state.pickerPlatform}
                    onValueChange={(itemValue, itemIndex) =>
                      this.setPlatform(itemValue)
                    }>
                    <Picker.Item label="PC" value="pc" color="black" />
                    <Picker.Item label="Xbox" value="xb1" color="black" />
                    <Picker.Item label="Playstation" value="ps4" color="black" />
                    <Picker.Item label="Nintendo" value="nintendo" color="black" />
                    <Picker.Item label="Mobile" value="touch" color="black" />
                  </Picker>
                </View>
              </View>

              <TouchableOpacity
                onPress={() => this.handleTrackPress()}
                style={{ flex: .25, margin: 10, borderRadius: 5, borderWidth: 2, borderColor: '#9d4dbb' }}>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={{ color: '#ffffff', fontSize: 15, fontWeight: "bold" }}>Track</Text>
                </View>
              </TouchableOpacity>
            </View>

          </View>

          <View style={{ flex: .3, flexDirection: 'row', justifyContent: 'space-evenly' }}>
            <TouchableOpacity
              onPress={() => this.handleWeeklyChallengesPress()}
              style={styles.homeScreenButtonStyle}>
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={styles.homeScreenButtonText}>Weekly Challenges</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => this.handleRandGenPress()}
              style={styles.homeScreenButtonStyle}>
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={styles.homeScreenButtonText}>Random Drop</Text>
              </View>
            </TouchableOpacity>
          </View>
          
          <View style={{ flex: .3, flexDirection: 'row', justifyContent: 'space-evenly' }}>
            <View style={{flex:1}}>
              <TouchableOpacity
                onPress={() => this.handleUpcomingItemsPress()}
                style={styles.homeScreenButtonStyle}>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={styles.homeScreenButtonText}>Upcoming Items</Text>
                </View>
              </TouchableOpacity>
            </View>

            <View style={{flex:1}}>
              <TouchableOpacity
                onPress={() => this.handleItemShopPress()}
                style={styles.homeScreenButtonStyle}>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={styles.homeScreenButtonText}>Item Shop</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ flex: .3, flexDirection: 'row', justifyContent: 'space-evenly' }}>
            <View style={{flex:1}}>
              <TouchableOpacity
                onPress={() => this.handlePatchNotesPress()}
                style={styles.homeScreenButtonStyle}>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={styles.homeScreenButtonText}>Patch Notes</Text>
                </View>
              </TouchableOpacity>
            </View>

            <View style={{flex:1}}>
              <TouchableOpacity
                onPress={() => this.handleWeaponStatsPress()}
                style={styles.homeScreenButtonStyle}>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={styles.homeScreenButtonText}>WeaponStats</Text>
                </View>
              </TouchableOpacity>
            </View>
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
