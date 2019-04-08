import React from 'react';
import { View, ImageBackground, ActivityIndicator, FlatList, Image } from 'react-native';
import styles from '../styles';
import background from '../assets/images/background.jpg'
import { getUpcomingItems } from '../api';

export default class UpcomingItemsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    let title = 'Upcoming Items';
    return {
      title: title,
    };
  };
  constructor(props) {
    super(props);  
    this.state = {
      items: [],
      loading : true,
    };
  }

  componentDidMount() {
    getUpcomingItems().then(response => {
      response.items.forEach((item) => {
        this.setState({
          items: [...this.state.items, item]
        })
      })
      this.setState({ loading: false })
    })  }

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground source={background} style={{flex:1}}>
        {this.state && !this.state.loading ?
          <View style={{ flex: 1, margin: 10, backgroundColor: 'rgba(43, 75, 149, 0.25)', borderRadius:5,}}>
            <View style={{ flex: 1, margin: 10, flexDirection: 'column', alignItems:'flex-start'}}>
              <FlatList
                style={{alignSelf:'center'}}
                data={this.state.items}
                keyExtractor={(item) => item.itemid}
                numColumns={3}
                renderItem={({ item }) =>
                  <Image
                    style={{ width: 100, height: 100, margin:5 }}
                    source={{ uri: item.item.images.information }}
                  />
                }
              />
            </View>
          </View>
          : <View style={styles.activityIndicatorStyle}>
            <ActivityIndicator size='large' color='#152D53' />
          </View>}
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
