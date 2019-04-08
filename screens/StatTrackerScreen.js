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
      mode: 'solo'
    };
  }

  componentDidMount() {
    let username = this.props.navigation.getParam('username', 'StatTrackerScreen: No username prop');
    let platformName = this.props.navigation.getParam('platformName', 'StatTrackerScreen: No platformName prop');
    let userStats= this.props.navigation.getParam('userStats', 'StatTrackerScreen: No userStats prop');
    this.setState({ stats: userStats, platformName: platformName, username: username, loading: false});
  }

  getTotalGames() {
    if (this.state.mode === 'solo') {
        if (this.state.stats.defaultsolo == undefined) {
          return 'No solo data';
        } else {
          return this.state.stats.defaultsolo.default.matchesplayed;
        }
    } else if (this.state.mode === 'duo') {
      if (this.state.stats.defaultduo == undefined) {
        return 'No duo data';
      } else {
        return this.state.stats.defaultduo.default.matchesplayed;
      }
    } else {
      if (this.state.stats.defaultsquad == undefined) {
        return 'No squad data';
      } else {
        return this.state.stats.defaultsquad.default.matchesplayed;
      }
    }
  }

  getWinRate() {
    var total = this.getTotalGames();
    var ratio;
    if (this.state.mode === 'solo') {
      if (this.state.stats.defaultsolo == undefined) {
        return 'No solo data';
      } else {
        if (this.state.stats.defaultsolo.default.placetop1 == undefined) {
          return '0 %';
        } else {
          ratio = this.state.stats.defaultsolo.default.placetop1 / total;
        }
      }
    } else if (this.state.mode === 'duo') {
      if (this.state.stats.defaultduo == undefined) {
        return 'No duo data';
      } else {
        if (this.state.stats.defaultduo.default.placetop1 == undefined) {
          return '0 %';
        } else {
          ratio = this.state.stats.defaultduo.default.placetop1 / total;
        }
      }
    } else {
      if (this.state.stats.defaultsquad == undefined) {
        return 'No squad data';
      } else {
        if (this.state.stats.defaultsquad.default.placetop1 == undefined) {
          return '0 %';
        } else {
          ratio = this.state.stats.defaultsquad.default.placetop1 / total;
        }
      }
    }
    ratio = ratio * 100;
    return ratio.toFixed(3) + ' %';
  }

  getKD() {
    var total = this.getTotalGames();
    var KD;
    if (this.state.mode === 'solo') {
      if (this.state.stats.defaultsolo == undefined) {
        return 'No solo data';
      } else {
        KD = this.state.stats.defaultsolo.default.kills / total;
      }
    } else if (this.state.mode === 'duo') {
      if (this.state.stats.defaultduo == undefined) {
        return 'No duo data';
      } else {
        KD = this.state.stats.defaultduo.default.kills / total;
      }
    } else {
      if (this.state.stats.defaultsquad == undefined) {
        return 'No squad data';
      } else {
        KD = this.state.stats.defaultsquad.default.kills / total;
      }
    }
    return KD.toFixed(3);
  }

  handleModeButtonPress(mode) {
    this.setState({ mode: mode });
  }

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground source={background} style={{ flex: 1 }}>
          {this.state && !this.state.loading ?
            <View style={{ flex: .95, borderRadius: 5, backgroundColor: 'rgba(43, 75, 149, 0.25)', margin: 15, justifyContent: 'space-evenly' }}>
              <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <Text style={[styles.subTitleTextStyle, { borderBottomWidth: 2, borderColor: '#9d4dbb' }]}>{this.state.username} on {this.state.platformName}</Text>
              </View>

              <ButtonBar handleModeButtonPress={this.handleModeButtonPress.bind(this)} />

              <View style={{ flex: .75, flexDirection: 'column', marginLeft: 10, marginTop: 25, justifyContent: 'space-evenly' }}>
                <Text style={styles.subTitleTextStyle}>Total Games Played:</Text>
                <Text style={[styles.subTitleTextStyle, { alignSelf: 'center' }]}>{this.getTotalGames()}</Text>
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
