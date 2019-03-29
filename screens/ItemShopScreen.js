import React from 'react';
import { SectionList, Image, Text, FlatList, View, ImageBackground, ActivityIndicator, Alert, BackHandler } from 'react-native';
import styles from '../styles';
import { getDailyStore } from '../api';
import background from '../assets/images/background.jpg'


export default class ItemShopScreen extends React.Component {

  static navigationOptions = {
    title: 'Item Shop',
  };

  constructor() {
    super();
    this.state = {
      dailyItems: [],
      featuredItems: [],
      loading: 'true'
    }
  }

  componentDidMount() {
    getDailyStore().then(response => {
      response.items.forEach((item) => {
        if (item.featured == 1) {
          this.setState({
            featuredItems: [...this.state.featuredItems, item]
          })
        } else {
          this.setState({
            dailyItems: [...this.state.dailyItems, item]
          })
        }
      })
      this.setState({ loading: false })
    })
  }

  getDailyTimeRemaining() {
    let d = new Date();
    let hours = d.getUTCHours();
    return 23 - hours;
  }


  render() {
    return (
      <View style={styles.container}>
        <ImageBackground source={background} style={{ flex: 1 }}>
          {this.state && !this.state.loading ?

            <View style={{ flex: 1, margin: 10, backgroundColor: 'rgba(43, 75, 149, 0.25)', borderRadius:5,}}>
              <View style={{ flex: .6, margin: 10, flexDirection: 'column', alignItems:'flex-start'}}>
                <Text style={[styles.subTitleTextStyle,{marginLeft:10}]}>Daily Items</Text>
                <Text style={[styles.sectionTitleTextStyle,{marginLeft:10}]}>Time Remaining: {this.getDailyTimeRemaining()} hours</Text>
                <FlatList
                  style={{alignSelf:'center'}}
                  data={this.state.dailyItems}
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

              <View style={{ flex: .6, margin: 10 }}>
                <Text style={[styles.subTitleTextStyle,{marginLeft:10}]}>Featured Items</Text>
                <FlatList
                  style={{alignSelf:'center'}}
                  data={this.state.featuredItems}
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
      </View>
    )
  }
}
