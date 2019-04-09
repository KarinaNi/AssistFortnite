import React from 'react';
import { View, ImageBackground, ActivityIndicator, WebView } from 'react-native';
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
        <WebView
          source={{uri: 'https://www.epicgames.com/fortnite/en-US/news/category/patch%20notes'}}
        />
        {this.state.loading &&
          <View style={styles.activityIndicatorStyle}>
            <ActivityIndicator size='large' color='#152D53' />
          </View>
        }
      </View>
    )
  }
}
