import React from 'react';
import { View, Text, TouchableOpacity, ImageBackground, ActivityIndicator, ListView, Alert} from 'react-native';
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
      };
  }

  componentDidMount() {
    this.setState({
        loading : false,
    });

    }

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground source={background} style={{flex:1}}>

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
