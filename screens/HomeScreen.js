import React from 'react';
import { Picker, TextInput, Text, TouchableOpacity, View, ImageBackground, ActivityIndicator, NetInfo, Alert, BackHandler, StatusBar } from 'react-native';
import firebase from '../fire'
import { getUserStats, getServerStatus } from '../api';
import styles from '../styles';
import background from '../assets/images/background.jpg'
import { Permissions, Notifications } from 'expo';


export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      pickerPlatform: 'pc',
      loading: false,
      serverColor: 'black'
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
    getServerStatus().then(statusVal => {
      if (statusVal.status == 'UP') {
        this.setState({ serverColor: "lawngreen" })
      } else {
        this.setState({ serverColor: "red" })
      }
    })
    // Sign in anonymously for UID
    firebase.auth().signInAnonymously()
    .catch((error) => console.log(error.message))

    firebase.auth().onAuthStateChanged((user) => {
      if (user) 
        this.registerForPushNotificationsAsync(user.uid)
    });
  }

  registerForPushNotificationsAsync = async (uid) => {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      // Notification permission for iOS
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      return;
    }

    let token = await Notifications.getExpoPushTokenAsync();
    // POST the token to your backend server from where you can retrieve it to send push notifications.
    var docRef = firebase.firestore().collection("fortnite").doc("users");
    docRef.update({
        [uid] : token
    })
    .then(() => console.log("Document updated!"))
    .catch((error) => {
      console.warn(error)
    })
  }

  handleUsernameTextChange(text) {
    this.setState({ username: text })
  }

  handleTrackPress() {
    this.setState({ loading: true });
    if (this.state.username == '') {
      Alert.alert('Please Enter Username',
        'Please enter a valid username and platform combination.',
        [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ],
        { cancelable: false })
      this.setState({ loading: false });
      return;
    }
    getUserStats(this.state.pickerPlatform, this.state.username).then(statVal => {
      if (statVal.error == 'Player Not Found') {
        Alert.alert('Player Not Found',
          'Please enter a valid username and platform combination.',
          [
            { text: 'OK', onPress: () => console.log('OK Pressed') },
          ],
          { cancelable: false })
        this.setState({ loading: false });
        return;
      }
      this.setState({ loading: false });
      this.props.navigation.navigate("StatTrackerScreen", { userStats: statVal })
    }
    )
  }

  setPlatform(platformValue) {
    switch (platformValue) {
      case 'pc':
        this.setState({
          pickerPlatform: 'pc',
        });
        break;
      case 'xbox':
        this.setState({
          pickerPlatform: 'xbox',
        });
        break;
      case 'ps4':
        this.setState({
          pickerPlatform: 'ps4',
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

  handlePatchNotesPress() {
    this.props.navigation.navigate("PatchNotesScreen");
  }

  handleUpcomingItemsPress() {
    this.props.navigation.navigate("UpcomingItemsScreen");
  }

  handleWeaponStatsPress() {
    this.props.navigation.navigate("WeaponStatsScreen");
  }
  handleChallengeGuidesPress() {
    this.props.navigation.navigate("ChallengeGuideScreen");
  }
  handleControlsPress() {
    this.props.navigation.navigate("ControlsScreen");
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{ flexDirection: 'row', backgroundColor: '#152D53', justifyContent: 'space-between' }}>
          <Text style={{ color: '#ffffff', fontSize: 20, fontWeight: 'bold', margin: 18, marginTop: StatusBar.currentHeight + 18 }}>Assistant for Fortnite</Text>
          <View style={{ flexDirection: 'row', alignSelf: 'flex-end', padding: 3 }}>
            <Text style={{ color: '#ffffff', fontSize: 15, margin: 3 }}>Server Status: </Text>
            <View style={{ backgroundColor: this.state.serverColor, width: 12, height: 12, borderRadius: 12, marginTop: 3, marginRight: 3, alignSelf: 'center' }} />
          </View>
        </View>
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
                    onChangeText={(text) => this.handleUsernameTextChange(text)}
                    autoCapitalize='none'
                    autoCorrect={false}
                    autoComplete='off'
                  />
                </View>

                <View style={{ flex: 1, margin: 3, borderRadius: 5, borderWidth: 2, borderColor: '#9d4dbb' }}>
                  <Picker
                    prompt='Select a platform'
                    style={{ flex: 1, width: 200, height: 50 , borderRadius: 5, borderWidth: 2, borderColor: '#9d4dbb' ,}}
                    selectedValue={this.state.pickerPlatform}
                    onValueChange={(itemValue, itemIndex) =>
                      this.setPlatform(itemValue)
                    }>
                    <Picker.Item label="PC" value="pc" color="black" />
                    <Picker.Item label="Xbox" value="xbox" color="black" />
                    <Picker.Item label="Playstation" value="ps4" color="black" />
                  </Picker>
                </View>
              </View>

              <TouchableOpacity
                onPress={() => this.handleTrackPress()}
                style={{ flex: .25, margin: 10, borderRadius: 5, borderWidth: 2, borderColor: '#9d4dbb' }}
                testID="track">
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={{ color: '#ffffff', fontSize: 15, fontWeight: "bold" }}>Track</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>



          <View style={{ flex: .3, flexDirection: 'row', justifyContent: 'space-evenly' }}>
            <View style={{ flex: 1 }}>
              <TouchableOpacity
                onPress={() => this.handleWeeklyChallengesPress()}
                style={styles.homeScreenButtonStyle}>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={styles.homeScreenButtonText}>Weekly Challenges</Text>
                </View>
              </TouchableOpacity>
            </View>

            <View style={{ flex: 1 }}>
              <TouchableOpacity
                onPress={() => this.handleChallengeGuidesPress()}
                style={styles.homeScreenButtonStyle}>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={styles.homeScreenButtonText}>Challenge Guides</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>


          <View style={{ flex: .3, flexDirection: 'row', justifyContent: 'space-evenly' }}>
            <View style={{ flex: 1 }}>
              <TouchableOpacity
                onPress={() => this.handleWeaponStatsPress()}
                style={styles.homeScreenButtonStyle}>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={styles.homeScreenButtonText}>Weapons Stats</Text>
                </View>
              </TouchableOpacity>
            </View>


            <View style={{ flex: 1 }}>
              <TouchableOpacity
                onPress={() => this.handleRandGenPress()}
                style={styles.homeScreenButtonStyle}>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={styles.homeScreenButtonText}>Random Drop</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>


          <View style={{ flex: .3, flexDirection: 'row', justifyContent: 'space-evenly' }}>
            <View style={{ flex: 1 }}>
              <TouchableOpacity
                onPress={() => this.handleUpcomingItemsPress()}
                style={styles.homeScreenButtonStyle}>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={styles.homeScreenButtonText}>Upcoming Items</Text>
                </View>
              </TouchableOpacity>
            </View>

            <View style={{ flex: 1 }}>
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
            <View style={{ flex: 1 }}>
              <TouchableOpacity
                onPress={() => this.handlePatchNotesPress()}
                style={styles.homeScreenButtonStyle}>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={styles.homeScreenButtonText}>Patch Notes</Text>
                </View>
              </TouchableOpacity>
            </View>


            <View style={{ flex: 1 }}>
              <TouchableOpacity
                onPress={() => this.handleControlsPress()}
                style={styles.homeScreenButtonStyle}>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={styles.homeScreenButtonText}>Controls</Text>
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
