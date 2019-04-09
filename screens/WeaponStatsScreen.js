import React from 'react';
import { View, ImageBackground, ActivityIndicator, Text, FlatList, Image} from 'react-native';
import styles from '../styles';
import { getWeapons } from '../api';
import background from '../assets/images/background.jpg'
import { updateExpression } from '@babel/types';

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
      weapons: [],
    };
  }

  componentDidMount() {
    getWeapons().then(response => {
      var processedWeapons= [];
      response.weapons.forEach((weapon) => {
        var exists = false;
        //collect weapon info
        var name = weapon.name;
        var image = weapon.images.image;
        var rarity = weapon.rarity;
        var stats = weapon.stats;
        //if the general weapon already exists in list
        for(var i = 0; i < processedWeapons.length; i++) {
          if (processedWeapons[i].name == name) {
            //get existing weapon and add a new rarity/stat object
            exists = true;
            var rarityStatObject = {rarity:{rarity}, stats:{stats}}
            processedWeapons[i].stats.push(rarityStatObject)
            break;
          }
        }
        if(!exists) {
          var newWeapon = {name:name, image:image, stats:[ {rarity:{rarity}, stats:{stats}} ]}
          processedWeapons.push(newWeapon);
        }
      })
      this.setState({ weapons: processedWeapons, loading: false }, ()=> console.log(this.state.weapons))
    })
  }

  render() {
    return (
      <View style={styles.container}>
      <ImageBackground source={background} style={{ flex: 1 }}>
        {this.state && !this.state.loading ?
          <View style={{ flex: 1, margin: 10, backgroundColor: 'rgba(43, 75, 149, 0.25)', borderRadius:5,}}>
            <View style={{ flex: 1, margin: 10, flexDirection: 'column', alignItems:'flex-start'}}>
              <FlatList
                style={{alignSelf:'center', flex:1}}
                data={this.state.weapons}
                keyExtractor={(item) => item.name}
                renderItem={({ item }) =>
                  <View style={{flex:1}}>
                    <View style={{borderBottomColor:'#ffffff', borderBottomWidth:3}}>
                      <Text style={[styles.sectionTitleTextStyle,{margin:3}]}>{item.name}</Text>
                    </View>
                    <Image
                      style={{ width: 100, height: 100, margin:5 }}
                      source={{ uri: item.image }}
                    />
                  </View>
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
