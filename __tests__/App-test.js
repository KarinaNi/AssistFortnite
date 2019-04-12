'use strict';

// Components used for testing

import React from 'react';
import { TouchableOpacity, TextInput, Alert } from 'react-native';
import renderer from 'react-test-renderer';

// Screens used for testing
import HomeScreen from '../screens/HomeScreen';
import StatTrackerScreen from '../screens/StatTrackerScreen';
import ItemShopScreen from '../screens/ItemShopScreen'
import RandomDropGeneratorScreen from '../screens/RandomDropGeneratorScreen';
import WeekScreen from '../screens/WeekScreen';
import WeeklyChallengesScreen from '../screens/WeeklyChallengesScreen';

// Used for mocking API calls
import * as api from '../api'
import * as mockCalls from '../assets/__mockAPI';

// Enzyme used for addshallow rendering
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });  

// describe('check API calls', () => {
//   const apis = [api.getDailyStore, api.getUserStats, api.getChallenges, api.getChallenges, api.getUpcomingItems, api.getWeapons, api.getServerStatus]
//   apis.forEach((api) => {
//     it(api.name, async () => {
//       const result = api()
//       expect(result).toBeTruthy()
//     })
//   })
// })
// Setup Mock Calls
api.getUserStats = jest.fn().mockReturnValue(new Promise((resolve, reject) => {
  resolve( mockCalls.userStats )
}));

api.getServerStatus = jest.fn().mockReturnValue(new Promise((resolve, reject) => {
  resolve( mockCalls.status )
}));

// Homescreen.js __Tests__
describe('homescreen tests', () => {
  it ('renders correctly', () => {
    const tree = renderer.create(<HomeScreen />).toJSON();
    expect(tree).toMatchSnapshot()
  });

  const navigation = {
    navigate: jest.fn()
  }

  const wrapper = shallow(<HomeScreen navigation={navigation}/>)
  const instance = wrapper.instance()
  it ('platform picker works as expected', () => {
    var platforms = ["pc", "xbox", "ps4"]
    platforms.forEach((platform) => {
      instance.setPlatform(platform)
      expect(wrapper.state('pickerPlatform')).toBeTruthy()
    })
    
  })
  it ('testing username is correct', () => { 
    wrapper.find(TextInput).props().onChangeText('Ahmad');
    expect(wrapper.state('username')).toBe('Ahmad')
  })

  it ("testing buttons fire callbacks" , async () => {
    wrapper.find(TouchableOpacity).forEach((button, index) => { 
      button.props().onPress()
      expect(navigation.navigate).toBeCalledTimes(index)
    })
  })

})

// StatsTrackerScreen.js __Tests__
describe ('stats screen tests', () => {
  // Mocking navigation prop
  const navigation = { 
    getParam: (key) => {
      if(key == 'userStats') return mockCalls.userStats
    } 
  }
  it ('renders correctly', () => {
    const tree = renderer.create(<StatTrackerScreen navigation={navigation}/>).toJSON();
    expect(tree).toMatchSnapshot();
  });
  const modes = ["solo", "duo", "all"]
  const time = ["curr", "all"]
  describe ('stats are correct', () => {
    const wrapper = shallow(<StatTrackerScreen navigation={navigation}/>)
    const instance = wrapper.instance()
    modes.forEach((mode) => {
      time.forEach((time) => {
        it ("for " + mode + " and " + time + " season", () => {
          instance.handleModeButtonPress(mode)
          instance.handleTimeButtonPress(time)
          expect(wrapper.state('mode')).toBe(mode)
          expect(wrapper.state('time')).toBe(time)
        })
      })
    })
  })
})

// ItemShop.js __Tests__
describe('itemshop screen tests', () => {
  it('renders correctly', async () => {
    // Mocking getDailyStore API call
    api.getDailyStore = jest.fn().mockReturnValue(new Promise((resolve, reject) => {
      resolve(mockCalls.dailyStore)
    }))
    const tree = renderer.create(<ItemShopScreen />).toJSON()
    expect(tree).toMatchSnapshot()
  });
})

// RandomDropperGeneratorScreen.js __Tests__
describe('random dropper screen tests', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<RandomDropGeneratorScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  })
  
  it('generates drop & strats correctly', () => {
    const wrapper = shallow(<RandomDropGeneratorScreen />) 
    wrapper.find(TouchableOpacity).props().onPress();
    expect(wrapper.state('PlaceHolder')).toBeTruthy()
    expect(wrapper.state('StratHolder')).toBeTruthy()
  })
})

// WeekScreen.js __Tests__
describe('weekly screen tests', () => {
  // Mocking getChallenges API call
  api.getChallenges = jest.fn().mockReturnValue(new Promise((resolve, reject) => {
    resolve( mockCalls.challegesVal )
  }))
  it('all weeks render correctly', async () => {
    const tree = renderer.create(<WeeklyChallengesScreen />).toJSON()
    expect(tree).toMatchSnapshot()
  });

  const navigation = {
    navigate: jest.fn()
  } 
  const wrapper = shallow(<WeeklyChallengesScreen navigation={navigation}/>)
  const instance = wrapper.instance()
  it ('pressing each week navigates to WeekScreen', () => {
    instance.handleWeekButton(1) 
    expect(navigation.navigate).toBeCalledTimes(1)
  });

  it ('pressing week not reached sends alert', () => {
    Alert.alert = jest.fn()
    instance.handleWeekButton(13) 
    expect(Alert.alert).toBeCalledTimes(1)
  });

  it('each week screen renders correctly', () => {
    // Mocking navigation prop
    const navigation = { 
      getParam: (key) => {
        if(key == 'week') return mockCalls.challegesVal.currentweek
        if(key == 'challenges') return mockCalls.challegesVal
      } 
    }
    const tree = renderer.create(<WeekScreen navigation={navigation}/>).toJSON()
    expect(tree).toMatchSnapshot()
  });
})



