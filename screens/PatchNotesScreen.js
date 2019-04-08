import React from 'react';
import { View, ImageBackground, ActivityIndicator } from 'react-native';
import styles from '../styles';
import background from '../assets/images/background.jpg'

export default class PatchNotesScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    let title = 'Patch Notes';
    return {
      title: title,
    };
  };
  constructor(props) {
    super(props);  
    this.state = {
      loading : true,
 
    };
  }

  componentDidMount() {
    this.setState({ loading: false });
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
