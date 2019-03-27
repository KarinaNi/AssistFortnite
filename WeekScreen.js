import React from 'react';
import { View, Text, TouchableOpacity, ImageBackground, ActivityIndicator, FlatList, Alert} from 'react-native';
import styles from '../styles';
import background from '../assets/images/background.jpg'

export default class WeekScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    let title = 'Week ' + navigation.getParam('week', '') + ' Challenges'
    return {
      title: title,
    };
  };
  constructor(props) {
    super(props);  
    this.state = {
      loading : true,
      week : '',
      challenges : '',
    };
  }
  componentDidMount() {
    let week = this.props.navigation.getParam('week', 'WeekScreen: No week prop');
    let allChallenges = this.props.navigation.getParam('challenges' , 'WeekScreen: No challenges prop')
    let weekChallenges = allChallenges.challenges['week' + week]
    
    this.setState({
      loading : false,
      week: week,
      challenges: weekChallenges
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground source={background} style={{flex:1}}>
          <FlatList
            data={this.state.challenges}
            renderItem={({item}) =><Text style={styles.challengeList}>{item.challenge}</Text>
          }
            keyExtractor={(item, index) => index.toString()}
          />
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
