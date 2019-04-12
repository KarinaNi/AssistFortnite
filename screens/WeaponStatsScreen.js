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
            var rarityStatObject = {rarity:rarity, stats:stats}
            processedWeapons[i].stats.push(rarityStatObject)
            break;
          }
        }
        if(!exists) {
          var newWeapon = {name:name, image:image, stats:[ {rarity:rarity, stats:stats} ]}
          processedWeapons.push(newWeapon);
        }
      })
      this.setState({ weapons: processedWeapons, loading: false }, ()=> console.log(this.state.weapons))
    })
  }

  capitalize(str){
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  rarityColor(rarity) {
    switch (rarity) {
      case 'common':
        return 'rgba(123, 123, 123, 0.5)';
        case 'uncommon':
        return 'rgba(58, 121, 19, 0.5)';
        case 'rare':
        return 'rgba(18, 88, 162, 0.5)';
        case 'epic':
        return 'rgba(189, 63, 250, 0.5)';
        case 'legendary':
        return 'rgba(255, 118, 5, 0.5)';
    }

    return 'rgba(58, 121, 19, 0.25)'
  }

  render() {
    return (
      <View style={styles.container}>
      <ImageBackground source={background} style={{ flex: 1 }}>
        {this.state && !this.state.loading ?
            <View style={{ flex: 1, margin: 10, padding:3, flexDirection: 'column', backgroundColor: 'rgba(43, 75, 149, 0.25)', borderRadius:5}}>
              
              <FlatList
                style={{flex:1}}
                data={this.state.weapons}
                keyExtractor={(item) => item.name}
                nestedScrollEnabled={true}
                renderItem={({ item }) =>
                  
                  <View style={{flex:1}}>
                    <View style={{borderBottomColor:'#ffffff', borderBottomWidth:3}}>
                      <Text style={[styles.sectionTitleTextStyle,{margin:3}]}>{item.name}</Text>
                    </View>
                    <View style={{flex:1, flexDirection:'row'}}>
                    <Image
                      style={{ width: 100, height: 100, margin:5 }}
                      source={{ uri: item.image }}
                    />
                    
                    <FlatList
                      style={{alignSelf:'center', flex:1}}
                      data={item.stats}
                      horizontal={true}
                      renderItem={({ item }) =>
                        <View style={{backgroundColor: this.rarityColor(item.rarity), margin:5, padding:3, borderRadius:5}}>
                          <View style={{borderBottomColor:'#ffffff', borderBottomWidth:2}}>
                            <Text style={styles.weaponStatTitle}>{this.capitalize(item.rarity)}</Text>
                          </View>
                          <Text style={styles.weaponStatTitle}>Damage:</Text>
                          <Text style={[styles.weaponStatTitle,{marginLeft:10}]}>Body: {item.stats.damage.body}</Text>
                          <Text style={[styles.weaponStatTitle,{marginLeft:10}]}>Head: {item.stats.damage.head}</Text>
                          <Text style={styles.weaponStatTitle}>DPS: {item.stats.dps}</Text>
                          <Text style={styles.weaponStatTitle}>Fire Rate: {item.stats.firerate}</Text>
                          <Text style={styles.weaponStatTitle}>Mag Size: {item.stats.magazine.size}</Text>
                          <Text style={styles.weaponStatTitle}>Reload Time: {item.stats.magazine.reload}</Text>
                        </View>
                      }
                      />
                      </View>
                  </View>
                }
              />
            </View>
          : <View style={styles.activityIndicatorStyle}>
            <ActivityIndicator size='large' color='#152D53' />
          </View>}
      </ImageBackground>
    </View>
    )
  }
}
