import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import styles from '../styles';


export default class ButtonBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 'solo'
    };
  }

  handleButtonPress(mode) {
    this.setState({selected:mode}, () =>  this.props.handleModeButtonPress(mode));
  }

  getButtonStyle(button) {
    if(button === 'duo') {
      if (this.state.selected === button) {
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
    if (this.state.selected === button) {
      if(button === 'solo') {
        return {
          flex: 1,
          backgroundColor: 'rgba(43, 75, 149, 0.25)',
          borderTopLeftRadius:5,
          borderBottomLeftRadius:5,
        }
      } else {
        return {
          flex: 1,
          backgroundColor: 'rgba(43, 75, 149, 0.25)',
          borderTopRightRadius:5,
          borderBottomRightRadius:5,
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
      <View style={{ flex: .15, flexDirection: 'row', justifyContent: 'space-between', borderWidth: 3, borderColor: '#9d4dbb', borderRadius: 10, margin:10}}>

        <View style={this.getButtonStyle('solo')}>
          <TouchableOpacity style={{ flex: 1 }} onPress={() => this.handleButtonPress('solo')}>
          <View style={{flex: 1, margin: 15, alignItems: 'center', justifyContent: 'center'}}>
              <Text style={styles.sectionTitleTextStyle}>Solo</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={this.getButtonStyle('duo')}>
          <TouchableOpacity style={{ flex: 1 }} onPress={() => this.handleButtonPress('duo')}>
          <View style={{flex: 1, margin: 15, alignItems: 'center', justifyContent: 'center'}}>
              <Text style={styles.sectionTitleTextStyle}>Duo</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={this.getButtonStyle('squad')}>
          <TouchableOpacity style={{ flex: 1 }} onPress={() => this.handleButtonPress('squad')}>
            <View style={{flex: 1, margin: 15, alignItems: 'center', justifyContent: 'center'}}>
              <Text style={styles.sectionTitleTextStyle}>Squad</Text>
            </View>
          </TouchableOpacity>
        </View>
        
      </View>
    );
  }
}