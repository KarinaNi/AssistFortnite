import React from 'react';
import { View, ImageBackground, ActivityIndicator, TouchableOpacity, FlatList, Image} from 'react-native';
import styles from '../styles';
import { getWeapons } from '../api';
import background from '../assets/images/background.jpg'

export default class WeaponStatsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    let title = 'Weapon Stats'
    return {
      title: title,
    };
  };
  constructor(props) {
    super(props);  
    this.state = {
      loading : true,
      weapons: []
    };
  }

  componentDidMount() {
    getWeapons().then(response => {
      this.setState({ weapons: [...this.state.weapons,...response.weapons], loading: false })
    })
  }

  render() {
    console.log(this.state.weapons)
    return (
      <View style={styles.container}>
      <ImageBackground source={background} style={{ flex: 1 }}>
        {this.state && !this.state.loading ?

          <View style={{ flex: 1, margin: 10, backgroundColor: 'rgba(43, 75, 149, 0.25)', borderRadius:5,}}>
            <View style={{ flex: 1, margin: 10, flexDirection: 'column', alignItems:'flex-start'}}>
              <FlatList
                style={{alignSelf:'center'}}
                data={this.state.weapons}
                keyExtractor={(item) => item.itemid}
                numColumns={3}
                renderItem={({ item }) =>
                  <TouchableOpacity>
                    <Image
                      style={{ width: 100, height: 100, margin:5 }}
                      source={{ uri: item.images.image }}
                    />
                  </TouchableOpacity>
                }
              />
            </View>
          </View>
          : <View style={styles.activityIndicatorStyle}>
            <ActivityIndicator size='large' color='#152D53' />
          </View>}
      </ImageBackground>
    </View>
    )
  }
}
