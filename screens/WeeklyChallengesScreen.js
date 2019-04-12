import React from 'react';
import { View, Text, TouchableOpacity, ImageBackground, ActivityIndicator, ListView, Alert} from 'react-native';
import { getChallenges } from '../api';
import styles from '../styles';
import background from '../assets/images/background.jpg'

export default class WeeklyChallengesScreen extends React.Component {
  static navigationOptions = {
    title: 'Weekly Challenges',
  };

  constructor(props) {
    super(props);  
    let dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      weeks: dataSource.cloneWithRows([1,2,3,4,5,6,7,8,9,10]),
      challenges: [],
      loading:true
    };
    //get data using API
    let season = "current";
    getChallenges(season).then(challengesVal => {
      if(challengesVal === undefined) {
        Alert.alert('External Error',
          'Data could not be found',
          [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ],
          { cancelable: false })
        return;
      }      
      this.state.challenges = challengesVal;
      this.setState({loading: false});
    })
  }

  handleWeekButton(rowData){
    if(rowData > this.state.challenges.currentweek){
      Alert.alert("Week " + rowData + " has not happened yet.")
    }else{
      this.props.navigation.navigate("WeekScreen", {week:rowData, challenges:this.state.challenges});
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground source={background} style={{flex:1}}>
          <ListView
            dataSource={this.state.weeks}
            renderRow={(rowData) => <Text
              style={styles.weeksList}
              onPress={this.handleWeekButton.bind(this, rowData)}>{'Week ' + rowData}
              </Text>
            }
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
