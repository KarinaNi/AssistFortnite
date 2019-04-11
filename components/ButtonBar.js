import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import styles from '../styles';


export default class ButtonBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedMode: 'solo',
      selectedTime: 'all'
    };
  }

  handleModeButtonPress(mode) {
    this.setState({ selectedMode: mode }, () => this.props.handleModeButtonPress(mode));
  }

  handleTimeButtonPress(time) {
    this.setState({ selectedTime: time }, () => this.props.handleTimeButtonPress(time));

  }

  getTimeButtonStyle(button) {
    if (this.state.selectedTime === button) {
      if(button === 'all') {
        return {
          flex: .5,
          backgroundColor: 'rgba(43, 75, 149, 0.25)',
          borderTopLeftRadius: 5,
        }
      } else {
        return {
          flex: .5,
          backgroundColor: 'rgba(43, 75, 149, 0.25)',
          borderTopRightRadius: 5,
        }
      }
    } else {
      return {
        flex: .5,
      }
    }
  }

  getModeButtonStyle(button) {
    if (button === 'duo') {
      if (this.state.selectedMode === button) {
        return {
          flex: 1,
          borderLeftWidth: 3,
          borderRightWidth: 3,
          borderColor: '#9d4dbb',
          backgroundColor: 'rgba(43, 75, 149, 0.25)'
        }
      } else {
        return {
          flex: 1,
          borderLeftWidth: 3,
          borderRightWidth: 3,
          borderColor: '#9d4dbb',
        }
      }
    }
    if (this.state.selectedMode === button) {
      if (button === 'solo') {
        return {
          flex: 1,
          backgroundColor: 'rgba(43, 75, 149, 0.25)',
          borderTopLeftRadius: 5,
          borderBottomLeftRadius: 5,
        }
      } else {
        return {
          flex: 1,
          backgroundColor: 'rgba(43, 75, 149, 0.25)',
          borderTopRightRadius: 5,
          borderBottomRightRadius: 5,
        }
      }
    } else {
      return {
        flex: 1,
      }
    }
  }

  render() {
    return (
      <View style={{ flex: .4, flexDirection: 'column',alignItems:'center', margin: 10, marginTop:20 }}>
        
        <View style={{ flex: .3, width:'80%',flexDirection: 'row', justifyContent: 'space-around', borderLeftWidth: 3, borderRightWidth:3, borderTopWidth:3, borderColor: '#9d4dbb', borderTopLeftRadius:10, borderTopRightRadius:10}}>
          <View style={[this.getTimeButtonStyle('all'), {borderColor:'#9d4dbb', borderRightWidth: 1.5}]}>
            <TouchableOpacity style={{ flex: 1 }} onPress={() => this.handleTimeButtonPress('all')}>
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Text style={styles.sectionTitleTextStyle}>All Time</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={[this.getTimeButtonStyle('curr'), {borderColor:'#9d4dbb', borderLeftWidth: 1.5}]}>
            <TouchableOpacity style={{ flex: 1 }} onPress={() => this.handleTimeButtonPress('curr')}>
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Text style={styles.sectionTitleTextStyle}>Curr. Season</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={{ flex: .3, flexDirection: 'row', justifyContent: 'space-between', borderWidth: 3, borderColor: '#9d4dbb', borderRadius: 10 }}>
          <View style={this.getModeButtonStyle('solo')}>
            <TouchableOpacity style={{ flex: 1 }} onPress={() => this.handleModeButtonPress('solo')}>
              <View style={{ flex: 1, margin: 15, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={styles.sectionTitleTextStyle}>Solo</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={this.getModeButtonStyle('duo')}>
            <TouchableOpacity style={{ flex: 1 }} onPress={() => this.handleModeButtonPress('duo')}>
              <View style={{ flex: 1, margin: 15, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={styles.sectionTitleTextStyle}>Duo</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={this.getModeButtonStyle('squad')}>
            <TouchableOpacity style={{ flex: 1 }} onPress={() => this.handleModeButtonPress('squad')}>
              <View style={{ flex: 1, margin: 15, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={styles.sectionTitleTextStyle}>Squad</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

      </View>
    );
  }
}