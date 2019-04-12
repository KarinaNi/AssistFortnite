import React from 'react';
import { View, ImageBackground, Text, ActivityIndicator } from 'react-native';
import { getUserStats, getUserID } from '../api';
import ButtonBar from '../components/ButtonBar'
import styles from '../styles';
import background from '../assets/images/background.jpg'


export default class StatTrackerScreen extends React.Component {
  static navigationOptions = {
    title: 'Stat Tracker',
  };

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      platformName: '',
      stats: {},
      loading: true,
      mode: 'solo',
      time: 'all'
    };
  }

  componentDidMount() {
    let stats = this.props.navigation.getParam('userStats', 'StatTrackerScreen: No statVal prop');
    if(stats == 'StatTrackerScreen: No statVal prop') {
      Alert.alert('Stat Traker Error',
        'Stat traker error please retry.',
        [
          { text: 'OK', onPress: () =>  this.props.navigation.goBack() },
        ],
        { cancelable: false })
      this.setState({ loading: false });
      return;
    }
    this.setState({ stats: stats, loading: false});
  }

  getTotalGames() {
    if (this.state.mode === 'solo') {
      if(this.state.time === 'all') {
        if (this.state.stats.stats.p2 == undefined) {
          return 'No solo data';
        } else {
          return this.state.stats.stats.p2.matches.displayValue;
        }
      }
      else {
        if (this.state.stats.stats.curr_p2 == undefined) {
          return 'No solo data';
        } else {
          return this.state.stats.stats.curr_p2.matches.displayValue;
        }
      }
    } else if (this.state.mode === 'duo') {
      if(this.state.time === 'all') {
        if (this.state.stats.stats.p10 == undefined) {
          return 'No duo data';
        } else {
          return this.state.stats.stats.p10.matches.displayValue;
        }
      }
      else {
        if (this.state.stats.stats.curr_p10 == undefined) {
          return 'No duo data';
        } else {
          return this.state.stats.stats.curr_p10.matches.displayValue;
        }
      }
    } else {
      if(this.state.time === 'all') {
        if (this.state.stats.stats.p9 == undefined) {
          return 'No squad data';
        } else {
          return this.state.stats.stats.p9.matches.displayValue;
        }
      }
      else {
        if (this.state.stats.stats.curr_p9 == undefined) {
          return 'No squad data';
        } else {
          return this.state.stats.stats.curr_p9.matches.displayValue;
        }
      }
    }
  }

  getTotalKills() {
    if (this.state.mode === 'solo') {
      if(this.state.time === 'all') {
        if (this.state.stats.stats.p2 == undefined) {
          return 'No solo data';
        } else {
          return this.state.stats.stats.p2.kills.displayValue;
        }
      }
      else {
        if (this.state.stats.stats.curr_p2 == undefined) {
          return 'No solo data';
        } else {
          return this.state.stats.stats.curr_p2.kills.displayValue;
        }
      }
    } else if (this.state.mode === 'duo') {
      if(this.state.time === 'all') {
        if (this.state.stats.stats.p10 == undefined) {
          return 'No duo data';
        } else {
          return this.state.stats.stats.p10.kills.displayValue;
        }
      }
      else {
        if (this.state.stats.stats.curr_p10 == undefined) {
          return 'No duo data';
        } else {
          return this.state.stats.stats.curr_p10.kills.displayValue;
        }
      }
    } else {
      if(this.state.time === 'all') {
        if (this.state.stats.stats.p9 == undefined) {
          return 'No squad data';
        } else {
          return this.state.stats.stats.p9.kills.displayValue;
        }
      }
      else {
        if (this.state.stats.stats.curr_p9 == undefined) {
          return 'No squad data';
        } else {
          return this.state.stats.stats.curr_p9.kills.displayValue;
        }
      }
    }
  }

  getWinRate() {
    if (this.state.mode === 'solo') {
      if(this.state.time === 'all') {
        if (this.state.stats.stats.p2 == undefined) {
          return 'No solo data';
        } else {
          return this.state.stats.stats.p2.winRatio.displayValue + '%';
        }
      }
      else {
        if (this.state.stats.stats.curr_p2 == undefined) {
          return 'No solo data';
        } else {
          return this.state.stats.stats.curr_p2.winRatio.displayValue + '%';
        }
      }
    } else if (this.state.mode === 'duo') {
      if(this.state.time === 'all') {
        if (this.state.stats.stats.p10 == undefined) {
          return 'No duo data';
        } else {
          return this.state.stats.stats.p10.winRatio.displayValue + '%';
        }
      }
      else {
        if (this.state.stats.stats.curr_p10 == undefined) {
          return 'No duo data';
        } else {
          return this.state.stats.stats.curr_p10.winRatio.displayValue + '%';
        }
      }
    } else {
      if(this.state.time === 'all') {
        if (this.state.stats.stats.p9 == undefined) {
          return 'No squad data';
        } else {
          return this.state.stats.stats.p9.winRatio.displayValue + '%';
        }
      }
      else {
        if (this.state.stats.stats.curr_p9 == undefined) {
          return 'No squad data';
        } else {
          return this.state.stats.stats.curr_p9.winRatio.displayValue + '%';
        }
      }
    }
  }

  getKD() {
    if (this.state.mode === 'solo') {
      if(this.state.time === 'all') {
        if (this.state.stats.stats.p2 == undefined) {
          return 'No solo data';
        } else {
          return this.state.stats.stats.p2.kd.displayValue;
        }
      }
      else {
        if (this.state.stats.stats.curr_p2 == undefined) {
          return 'No solo data';
        } else {
          return this.state.stats.stats.curr_p2.kd.displayValue;
        }
      }
    } else if (this.state.mode === 'duo') {
      if(this.state.time === 'all') {
        if (this.state.stats.stats.p10 == undefined) {
          return 'No duo data';
        } else {
          return this.state.stats.stats.p10.kd.displayValue;
        }
      }
      else {
        if (this.state.stats.stats.curr_p10 == undefined) {
          return 'No duo data';
        } else {
          return this.state.stats.stats.curr_p10.kd.displayValue;
        }
      }
    } else {
      if(this.state.time === 'all') {
        if (this.state.stats.stats.p9 == undefined) {
          return 'No squad data';
        } else {
          return this.state.stats.stats.p9.kd.displayValue;
        }
      }
      else {
        if (this.state.stats.stats.curr_p9 == undefined) {
          return 'No squad data';
        } else {
          return this.state.stats.stats.curr_p9.kd.displayValue;
        }
      }
    }
  }

  handleModeButtonPress(mode) {
    this.setState({ mode: mode });
  }

  handleTimeButtonPress(time) {
    this.setState({ time: time });
  }

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground source={background} style={{ flex: 1 }}>
          {this.state && !this.state.loading ?
            <View style={{ flex: .95, flexDirection: 'column', borderRadius: 5, backgroundColor: 'rgba(43, 75, 149, 0.25)', margin: 15, padding:5, justifyContent: 'space-evenly'}}>

              <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <Text style={[styles.subTitleTextStyle, { borderBottomWidth: 2, borderColor: '#9d4dbb' }]}>{this.state.stats.epicUserHandle} on {this.state.stats.platformNameLong}</Text>
              </View>

              <ButtonBar handleTimeButtonPress={this.handleTimeButtonPress.bind(this)} handleModeButtonPress={this.handleModeButtonPress.bind(this)} />

              <View style={{ flex: .8, flexDirection: 'column', marginLeft: 10, justifyContent: 'space-evenly' }}>
                <Text style={styles.subTitleTextStyle}>Total Games Played:</Text>
                <Text style={[styles.subTitleTextStyle, { alignSelf: 'center' }]}>{this.getTotalGames()}</Text>
                <Text style={styles.subTitleTextStyle}>Total Kills:</Text>
                <Text style={[styles.subTitleTextStyle, { alignSelf: 'center' }]}>{this.getTotalKills()}</Text>
                <Text style={styles.subTitleTextStyle}>Win Rate:</Text>
                <Text style={[styles.subTitleTextStyle, { alignSelf: 'center' }]}>{this.getWinRate()}</Text>
                <Text style={styles.subTitleTextStyle}>Kill/Death Ratio:</Text>
                <Text style={[styles.subTitleTextStyle, { alignSelf: 'center' }]}>{this.getKD()}</Text>
              </View>

            </View>
            : <View style={styles.activityIndicatorStyle}>
              <ActivityIndicator size='large' color='#152D53' />
            </View>}
        </ImageBackground>
      </View>
    );
  }
}
