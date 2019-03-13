import React from 'react';
import {getDailyStore, getUserID} from '../api';
import {
  Image,
  Picker,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from '../styles';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Assistant for Fortnite',
  };

  constructor(props) {
    super(props);
    this.state = { username: '' };
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.statTrackerInputView}>
          <View style={styles.textInputView}>
            <TextInput
              style= {{padding:5}}
              placeholder={'username'}
              onChangeText={(text) => this.setState({username:text})}
            />
            <Picker />
          </View>
        </View>
        
      </View>
    );
  }

}
